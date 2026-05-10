import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import type { Landmark } from "./useMediaPipePose";

interface UseMediaPipeHandsOptions {
  enabled?: boolean;
}

interface GestureRecognizerResult {
  landmarks?: Landmark[][];
}

interface GestureRecognizer {
  recognizeForVideo: (video: HTMLVideoElement, timestamp: number) => GestureRecognizerResult;
  close: () => void;
}

interface FilesetResolverModule {
  FilesetResolver: {
    forVisionTasks: (wasmRoot: string) => Promise<unknown>;
  };
  GestureRecognizer: {
    createFromOptions: (
      vision: unknown,
      options: {
        baseOptions: {
          modelAssetPath: string;
          delegate?: "CPU" | "GPU";
        };
        runningMode: "VIDEO";
        numHands: number;
        minHandDetectionConfidence: number;
        minHandPresenceConfidence: number;
        minTrackingConfidence: number;
      }
    ) => Promise<GestureRecognizer>;
  };
}

const TASKS_VERSION = "0.10.3";
const TASKS_BUNDLE_URL = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${TASKS_VERSION}/vision_bundle.mjs`;
const TASKS_WASM_ROOT = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${TASKS_VERSION}/wasm`;
const GESTURE_MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task";
const FINGER_TIPS = [8, 12, 16, 20];

let recognizerPromise: Promise<GestureRecognizer> | null = null;

async function createGestureRecognizer() {
  if (!recognizerPromise) {
    recognizerPromise = (async () => {
      const visionTasks: FilesetResolverModule = await import(
        /* webpackIgnore: true */ TASKS_BUNDLE_URL
      );
      const vision = await visionTasks.FilesetResolver.forVisionTasks(TASKS_WASM_ROOT);
      return visionTasks.GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: GESTURE_MODEL_URL,
          delegate: "GPU"
        },
        runningMode: "VIDEO",
        numHands: 2,
        minHandDetectionConfidence: 0.5,
        minHandPresenceConfidence: 0.5,
        minTrackingConfidence: 0.5
      });
    })();
  }

  return recognizerPromise;
}

function distance(a: Landmark, b: Landmark) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = (a.z ?? 0) - (b.z ?? 0);
  return Math.hypot(dx, dy, dz * 0.35);
}

function isOkGesture(hand: Landmark[]) {
  const thumbTip = hand[4];
  const wrist = hand[0];
  const indexMcp = hand[5];
  const pinkyMcp = hand[17];
  const middleMcp = hand[9];

  if (!thumbTip || !wrist || !indexMcp || !pinkyMcp || !middleMcp) return false;

  const palmWidth = distance(indexMcp, pinkyMcp);
  const palmLength = distance(wrist, middleMcp);
  const handScale = Math.max(palmWidth, palmLength, 0.055);
  const touchThreshold = handScale * 0.42;

  return FINGER_TIPS.some((tipIndex) => {
    const fingerTip = hand[tipIndex];
    return Boolean(fingerTip) && distance(thumbTip, fingerTip) <= touchThreshold;
  });
}

export function useMediaPipeHands(
  videoRef: RefObject<HTMLVideoElement | null>,
  options: UseMediaPipeHandsOptions = {}
) {
  const { enabled = true } = options;
  const recognizerRef = useRef<GestureRecognizer | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastVideoTimeRef = useRef(-1);
  const [handLandmarks, setHandLandmarks] = useState<Landmark[][]>([]);
  const [isOkDetected, setIsOkDetected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFrame = useCallback(() => {
    const recognizer = recognizerRef.current;
    const video = videoRef.current;

    if (recognizer && video && video.readyState >= 2 && video.currentTime !== lastVideoTimeRef.current) {
      lastVideoTimeRef.current = video.currentTime;
      const result = recognizer.recognizeForVideo(video, performance.now());
      const hands = result.landmarks ?? [];
      setHandLandmarks(hands);
      setIsOkDetected(hands.some(isOkGesture));
    }

    animationFrameRef.current = window.requestAnimationFrame(processFrame);
  }, [videoRef]);

  useEffect(() => {
    if (!enabled || !videoRef.current) {
      setHandLandmarks([]);
      setIsOkDetected(false);
      setIsLoading(false);
      setError(null);
      return;
    }

    let isMounted = true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let startupTimeout: any = null;

    const initHands = async () => {
      try {
        setIsLoading(true);
        setError(null);
        startupTimeout = window.setTimeout(() => {
          if (isMounted) {
            setError("โหลด AI ตรวจจับมือช้าเกินไป กรุณารีเฟรชหน้าแล้วลองอีกครั้ง");
            setIsLoading(false);
          }
        }, 15000);

        const recognizer = await createGestureRecognizer();
        if (!isMounted) return;

        recognizerRef.current = recognizer;
        if (startupTimeout) {
          window.clearTimeout(startupTimeout);
          startupTimeout = null;
        }
        setIsLoading(false);
        processFrame();
      } catch (err) {
        console.error("MediaPipe Gesture Recognizer initialization error:", err);
        if (isMounted) {
          setError("ไม่สามารถโหลด AI ตรวจจับมือได้");
          setIsLoading(false);
        }
      }
    };

    initHands();

    return () => {
      isMounted = false;
      if (startupTimeout) window.clearTimeout(startupTimeout);
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      recognizerRef.current = null;
      lastVideoTimeRef.current = -1;
      setHandLandmarks([]);
      setIsOkDetected(false);
    };
  }, [enabled, processFrame, videoRef]);

  return { handLandmarks, isOkDetected, isLoading, error };
}
