import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

export interface Landmark {
  x: number;
  y: number;
  z: number;
  visibility?: number;
}

export interface OpticalFlowPoint {
  id: number;
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  color: string;
}

export const OPTICAL_FLOW_LANDMARKS = [0, 11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28];

export const LANDMARK_COLORS: Record<number, string> = {
  0: "#7dd3fc",
  11: "#22d3ee",
  12: "#22d3ee",
  13: "#60a5fa",
  14: "#60a5fa",
  15: "#38bdf8",
  16: "#38bdf8",
  23: "#a5b4fc",
  24: "#a5b4fc",
  25: "#67e8f9",
  26: "#67e8f9",
  27: "#93c5fd",
  28: "#93c5fd"
};

interface PoseResults {
  poseLandmarks?: Landmark[];
  image: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement;
}

interface UseMediaPipePoseOptions {
  onResults?: (results: PoseResults) => void;
  enabled?: boolean;
}

interface PoseLandmarkerResult {
  landmarks?: Landmark[][];
}

interface PoseLandmarker {
  detectForVideo: (video: HTMLVideoElement, timestamp: number) => PoseLandmarkerResult;
}

interface FilesetResolverModule {
  FilesetResolver: {
    forVisionTasks: (wasmRoot: string) => Promise<unknown>;
  };
  PoseLandmarker: {
    createFromOptions: (
      vision: unknown,
      options: {
        baseOptions: {
          modelAssetPath: string;
          delegate?: "CPU" | "GPU";
        };
        runningMode: "VIDEO";
        numPoses: number;
        minPoseDetectionConfidence: number;
        minPosePresenceConfidence: number;
        minTrackingConfidence: number;
      }
    ) => Promise<PoseLandmarker>;
  };
}

const TASKS_VERSION = "0.10.3";
const TASKS_BUNDLE_URL = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${TASKS_VERSION}/vision_bundle.mjs`;
const TASKS_WASM_ROOT = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${TASKS_VERSION}/wasm`;
const POSE_MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task";

let poseLandmarkerPromise: Promise<PoseLandmarker> | null = null;

async function createPoseLandmarker() {
  if (!poseLandmarkerPromise) {
    poseLandmarkerPromise = (async () => {
      const visionTasks: FilesetResolverModule = await import(
        /* webpackIgnore: true */ TASKS_BUNDLE_URL
      );
      const vision = await visionTasks.FilesetResolver.forVisionTasks(TASKS_WASM_ROOT);
      return visionTasks.PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: POSE_MODEL_URL,
          delegate: "GPU"
        },
        runningMode: "VIDEO",
        numPoses: 1,
        minPoseDetectionConfidence: 0.5,
        minPosePresenceConfidence: 0.5,
        minTrackingConfidence: 0.5
      });
    })();
  }

  return poseLandmarkerPromise;
}

export function useMediaPipePose(
  videoRef: RefObject<HTMLVideoElement | null>,
  options: UseMediaPipePoseOptions = {}
) {
  const { onResults, enabled = true } = options;
  const poseRef = useRef<PoseLandmarker | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastVideoTimeRef = useRef(-1);
  const [landmarks, setLandmarks] = useState<Landmark[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const flowHistoryRef = useRef<Map<number, { x: number; y: number }[]>>(new Map());
  const [opticalFlowPoints, setOpticalFlowPoints] = useState<OpticalFlowPoint[]>([]);
  const maxFlowHistory = 15;

  const handlePoseLandmarks = useCallback(
    (poseLandmarks: Landmark[]) => {
      setLandmarks(poseLandmarks);

      const newFlowPoints: OpticalFlowPoint[] = [];
      OPTICAL_FLOW_LANDMARKS.forEach((idx) => {
        const landmark = poseLandmarks[idx];
        if (!landmark || (landmark.visibility ?? 1) <= 0.5) return;

        const history = flowHistoryRef.current.get(idx) || [];
        const currentPos = { x: landmark.x, y: landmark.y };
        history.push(currentPos);
        while (history.length > maxFlowHistory) history.shift();
        flowHistoryRef.current.set(idx, history);

        if (history.length >= 2) {
          const prevPos = history[history.length - 2];
          newFlowPoints.push({
            id: idx,
            x: currentPos.x,
            y: currentPos.y,
            prevX: prevPos.x,
            prevY: prevPos.y,
            color: LANDMARK_COLORS[idx] || "#ffffff"
          });
        }
      });

      setOpticalFlowPoints(newFlowPoints);
      if (videoRef.current) {
        onResults?.({ poseLandmarks, image: videoRef.current });
      }
    },
    [onResults, videoRef]
  );

  const processFrame = useCallback(() => {
    const pose = poseRef.current;
    const video = videoRef.current;

    if (pose && video && video.readyState >= 2 && video.currentTime !== lastVideoTimeRef.current) {
      lastVideoTimeRef.current = video.currentTime;
      const result = pose.detectForVideo(video, performance.now());
      const nextLandmarks = result.landmarks?.[0] ?? [];
      handlePoseLandmarks(nextLandmarks);
    }

    animationFrameRef.current = window.requestAnimationFrame(processFrame);
  }, [handlePoseLandmarks, videoRef]);

  useEffect(() => {
    if (!enabled || !videoRef.current) {
      setLandmarks([]);
      setOpticalFlowPoints([]);
      setIsLoading(false);
      setError(null);
      flowHistoryRef.current.clear();
      return;
    }

    let isMounted = true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let startupTimeout: any = null;

    const initPose = async () => {
      try {
        setIsLoading(true);
        setError(null);
        startupTimeout = window.setTimeout(() => {
          if (isMounted) {
            setError("โหลด AI ตรวจจับท่าทางช้าเกินไป กรุณารีเฟรชหน้าแล้วลองอีกครั้ง");
            setIsLoading(false);
          }
        }, 15000);

        const pose = await createPoseLandmarker();
        if (!isMounted) return;

        poseRef.current = pose;
        if (startupTimeout) {
          window.clearTimeout(startupTimeout);
          startupTimeout = null;
        }
        setIsLoading(false);
        processFrame();
      } catch (err) {
        console.error("MediaPipe Pose Landmarker initialization error:", err);
        if (isMounted) {
          setError("ไม่สามารถโหลด AI ตรวจจับท่าทางได้");
          setIsLoading(false);
        }
      }
    };

    initPose();

    return () => {
      isMounted = false;
      if (startupTimeout) window.clearTimeout(startupTimeout);
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      poseRef.current = null;
      lastVideoTimeRef.current = -1;
      flowHistoryRef.current.clear();
    };
  }, [enabled, processFrame, videoRef]);

  const getFlowHistory = useCallback((landmarkIdx: number) => {
    return flowHistoryRef.current.get(landmarkIdx) || [];
  }, []);

  return { landmarks, opticalFlowPoints, getFlowHistory, isLoading, error };
}
