"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Camera, ChevronLeft, Orbit, RefreshCw, RotateCcw, Sparkles, Timer, Trophy, Zap
} from "lucide-react";
import { HandOverlay } from "./components/HandOverlay";
import { PowerAuraOverlay } from "./components/PowerAuraOverlay";
import { SkeletonOverlay } from "./components/SkeletonOverlay";
import { useMediaPipeHands } from "./hooks/useMediaPipeHands";
import { useMediaPipePose } from "./hooks/useMediaPipePose";
import "./game.css";

const LEFT_ELBOW = 13;
const RIGHT_ELBOW = 14;
const LEFT_WRIST = 15;
const RIGHT_WRIST = 16;
const TIME_LIMIT = 25;
const EXP_PER_REP = 67;
const STORAGE_KEY = "exp67.totalExp";
const COMBO_THRESHOLD = 5;
const COMBO_WINDOW_MS = 1500;
const OK_START_HOLD_MS = 360;
const ARM_SWITCH_MARGIN = 0.035;
const MIN_LANDMARK_VISIBILITY = 0.35;

type GameState = "setup" | "playing" | "gameover";
type ArmState = "LEFT_HIGH" | "RIGHT_HIGH" | null;

const developerRanks = [
  { title: "AI Developer Rookie", minExp: 0 },
  { title: "Prompt Engineer", minExp: 670 },
  { title: "Junior AI Developer", minExp: 2010 },
  { title: "Model Tuner", minExp: 4020 },
  { title: "Agent Builder", minExp: 6700 },
  { title: "Neural Systems Engineer", minExp: 10050 },
  { title: "AI Architect", minExp: 14740 },
  { title: "Cosmic AGI Researcher", minExp: 20100 }
];

function getStoredExp() {
  if (typeof window === "undefined") return 0;
  const value = window.localStorage.getItem(STORAGE_KEY);
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function getRank(totalExp: number) {
  let index = 0;
  for (let i = 0; i < developerRanks.length; i += 1) {
    if (totalExp >= developerRanks[i].minExp) index = i;
  }
  const current = developerRanks[index];
  const next = developerRanks[index + 1];
  const progress = next ? ((totalExp - current.minExp) / (next.minExp - current.minExp)) * 100 : 100;
  return { current, next, progress: Math.max(0, Math.min(progress, 100)) };
}

function getPerformanceMessage(score: number) {
  if (score >= 120) return "สมองกลทะยานเร็วระดับยานวาร์ป";
  if (score >= 90) return "จังหวะแขนเหมือนเทรนโมเดลบนคลัสเตอร์ใหญ่";
  if (score >= 60) return "คุณกำลังขึ้นเป็นสาย Agent Builder แล้ว";
  if (score >= 30) return "ระบบเริ่มติดไฟแล้ว เก็บ EXP ต่ออีกนิด";
  return "วอร์มเครื่องสำเร็จ รอบหน้าค่อยเร่งบูสต์ EXP";
}

function isLandmarkVisible(landmark?: { visibility?: number }) {
  return Boolean(landmark) && (landmark!.visibility ?? 1) >= MIN_LANDMARK_VISIBILITY;
}

export default function GamePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevArmState = useRef<ArmState>(null);
  const comboCountRef = useRef(0);
  const lastRepAtRef = useRef(0);
  const okGestureStartedAtRef = useRef<number | null>(null);
  const comboResetTimeoutRef = useRef<any>(null);
  const okStartTimeoutRef = useRef<any>(null);
  const [gameState, setGameState] = useState<GameState>("setup");
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [score, setScore] = useState(0);
  const [comboCount, setComboCount] = useState(0);
  const [auraActive, setAuraActive] = useState(false);
  const [sessionExp, setSessionExp] = useState(0);
  const [totalExp, setTotalExp] = useState(0);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [cameraError, setCameraError] = useState("");

  useEffect(() => { setTotalExp(getStoredExp()); }, []);

  const poseEnabled = cameraEnabled;
  const { landmarks, opticalFlowPoints, getFlowHistory, isLoading, error } = useMediaPipePose(videoRef, { enabled: poseEnabled });
  const { handLandmarks, isOkDetected, isLoading: isHandsLoading, error: handsError } = useMediaPipeHands(videoRef, { enabled: cameraEnabled && gameState === "setup" && !cameraError });

  const rank = useMemo(() => getRank(totalExp), [totalExp]);
  const poseLoading = poseEnabled && isLoading;
  const poseError = poseEnabled ? error : null;
  const setupError = gameState === "setup" ? handsError : null;
  const setupLoading = gameState === "setup" && isHandsLoading;

  const addExp = useCallback(() => {
    setSessionExp((c) => c + EXP_PER_REP);
    setTotalExp((c) => { const next = c + EXP_PER_REP; window.localStorage.setItem(STORAGE_KEY, String(next)); return next; });
  }, []);

  const resetCombo = useCallback(() => {
    comboCountRef.current = 0; lastRepAtRef.current = 0; setComboCount(0); setAuraActive(false);
    if (comboResetTimeoutRef.current) { window.clearTimeout(comboResetTimeoutRef.current); comboResetTimeoutRef.current = null; }
  }, []);

  const registerSuccessfulRep = useCallback(() => {
    const now = performance.now();
    const isContinuous = now - lastRepAtRef.current <= COMBO_WINDOW_MS;
    const nextCombo = isContinuous ? comboCountRef.current + 1 : 1;
    lastRepAtRef.current = now; comboCountRef.current = nextCombo;
    setComboCount(nextCombo); setAuraActive(nextCombo >= COMBO_THRESHOLD);
    setScore((c) => c + 1); addExp();
    if (comboResetTimeoutRef.current) window.clearTimeout(comboResetTimeoutRef.current);
    comboResetTimeoutRef.current = window.setTimeout(resetCombo, COMBO_WINDOW_MS);
  }, [addExp, resetCombo]);

  const startGame = useCallback(() => {
    setGameState("playing"); setTimeLeft(TIME_LIMIT); setScore(0); resetCombo(); setSessionExp(0); prevArmState.current = null;
  }, [resetCombo]);

  useEffect(() => {
    let stream: MediaStream | null = null;
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: { ideal: 960 }, height: { ideal: 720 } } });
        if (videoRef.current) { videoRef.current.srcObject = stream; setCameraEnabled(true); }
      } catch { setCameraError("เปิดกล้องไม่ได้ กรุณาอนุญาตสิทธิ์กล้อง"); }
    };
    startCamera();
    return () => { stream?.getTracks().forEach((t) => t.stop()); };
  }, []);

  useEffect(() => { return () => { if (comboResetTimeoutRef.current) window.clearTimeout(comboResetTimeoutRef.current); if (okStartTimeoutRef.current) window.clearTimeout(okStartTimeoutRef.current); }; }, []);

  useEffect(() => {
    if (gameState !== "setup" || !cameraEnabled || setupLoading || cameraError || setupError) { okGestureStartedAtRef.current = null; if (okStartTimeoutRef.current) { window.clearTimeout(okStartTimeoutRef.current); okStartTimeoutRef.current = null; } return; }
    if (!isOkDetected) { okGestureStartedAtRef.current = null; if (okStartTimeoutRef.current) { window.clearTimeout(okStartTimeoutRef.current); okStartTimeoutRef.current = null; } return; }
    if (!okGestureStartedAtRef.current) okGestureStartedAtRef.current = performance.now();
    if (!okStartTimeoutRef.current) { okStartTimeoutRef.current = window.setTimeout(() => { okStartTimeoutRef.current = null; okGestureStartedAtRef.current = null; startGame(); }, OK_START_HOLD_MS); }
  }, [cameraEnabled, cameraError, gameState, isOkDetected, setupError, setupLoading, startGame]);

  useEffect(() => {
    if (!landmarks.length) return;
    const leftElbow = landmarks[LEFT_ELBOW]; const rightElbow = landmarks[RIGHT_ELBOW];
    const leftWrist = landmarks[LEFT_WRIST]; const rightWrist = landmarks[RIGHT_WRIST];
    const bodyVisible = isLandmarkVisible(leftElbow) && isLandmarkVisible(rightElbow) && isLandmarkVisible(leftWrist) && isLandmarkVisible(rightWrist);
    if (gameState !== "playing") return;
    if (!bodyVisible) { prevArmState.current = null; resetCombo(); return; }
    const leftHigh = leftWrist.y < leftElbow.y - ARM_SWITCH_MARGIN;
    const leftLow = leftWrist.y > leftElbow.y + ARM_SWITCH_MARGIN;
    const rightHigh = rightWrist.y < rightElbow.y - ARM_SWITCH_MARGIN;
    const rightLow = rightWrist.y > rightElbow.y + ARM_SWITCH_MARGIN;
    let currentArmState: ArmState = null;
    if (leftHigh && rightLow) currentArmState = "LEFT_HIGH";
    else if (rightHigh && leftLow) currentArmState = "RIGHT_HIGH";
    if (currentArmState && prevArmState.current !== currentArmState) { if (prevArmState.current !== null) registerSuccessfulRep(); prevArmState.current = currentArmState; }
  }, [gameState, landmarks, registerSuccessfulRep, resetCombo]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (gameState === "playing" && timeLeft > 0) {
      timer = setInterval(() => { setTimeLeft((c) => { if (c <= 1) { setGameState("gameover"); return 0; } return c - 1; }); }, 1000);
    }
    return () => { if (timer) clearInterval(timer); };
  }, [gameState, timeLeft]);

  const resetExp = () => { window.localStorage.setItem(STORAGE_KEY, "0"); setTotalExp(0); setSessionExp(0); };

  return (
    <main className="exp67-shell">
      <video ref={videoRef} autoPlay playsInline muted className="camera-feed" />
      {cameraEnabled && gameState === "setup" && !setupLoading && !setupError && (
        <HandOverlay hands={handLandmarks} width={960} height={720} />
      )}
      {cameraEnabled && poseEnabled && !isLoading && (
        <>
          <PowerAuraOverlay active={auraActive} landmarks={landmarks} width={960} height={720} />
          <SkeletonOverlay landmarks={landmarks} opticalFlowPoints={opticalFlowPoints} getFlowHistory={getFlowHistory} width={960} height={720} />
        </>
      )}

      <header className="top-hud">
        <a href="/" className="icon-button" aria-label="กลับ"><ChevronLeft size={26} /></a>
        <div className="brand-lockup"><Orbit size={24} /><div><p>EXP67</p><span>AI Developer Training</span></div></div>
        <button className="icon-button" type="button" onClick={resetExp} aria-label="รีเซ็ต EXP"><RotateCcw size={22} /></button>
      </header>

      <section className="exp-panel" aria-label="EXP progress">
        <div className="rank-row">
          <div><span className="eyebrow">AI Developer Rank</span><h1>{rank.current.title}</h1></div>
          <div className="total-exp"><Zap size={19} />{totalExp.toLocaleString()} EXP</div>
        </div>
        <div className="exp-bar"><div className="exp-fill" style={{ width: `${rank.progress}%` }} /></div>
        <div className="rank-footer"><span>+{sessionExp.toLocaleString()} EXP รอบนี้</span><span>{rank.next ? `ต่อไป: ${rank.next.title}` : "ขั้นสูงสุดแล้ว"}</span></div>
      </section>

      {gameState === "playing" && (
        <section className="play-hud">
          <div className="score-orb"><span>สลับแขน</span><strong>{score}</strong><small>ครั้ง</small></div>
          {comboCount >= COMBO_THRESHOLD && (<div className="combo-burst"><Sparkles size={20} /><strong>{comboCount} Combo</strong></div>)}
          <div className={timeLeft <= 5 ? "timer-pill danger" : "timer-pill"}><Timer size={22} /><strong>{timeLeft}s</strong></div>
        </section>
      )}

      {(!cameraEnabled || poseLoading || setupLoading || cameraError || poseError || setupError) && (
        <div className="center-overlay blocking-overlay">
          <div className="status-module">
            {cameraError || poseError || setupError ? (<><Camera size={44} /><p>{cameraError || poseError || setupError}</p></>) : (<><RefreshCw size={44} className="spin" /><p>{cameraEnabled ? "กำลังโหลด AI..." : "กำลังเปิดกล้อง..."}</p></>)}
          </div>
        </div>
      )}

      {gameState === "setup" && cameraEnabled && !setupLoading && !cameraError && !setupError && (
        <div className="camera-controls-overlay">
          <div className={isOkDetected ? "launch-module ok-detected" : "launch-module"}>
            <div className="ready-pill"><Sparkles size={21} />{isOkDetected ? "OK detected" : "ทำสัญลักษณ์ OK เพื่อเริ่ม"}</div>
            <p>แตะนิ้วโป้งกับปลายนิ้วใดก็ได้ แล้วเตรียมสลับแขนซ้าย-ขวา</p>
          </div>
        </div>
      )}

      {gameState === "gameover" && (
        <div className="center-overlay result-overlay">
          <div className="result-module">
            <Trophy size={82} /><span className="eyebrow">Mission Complete</span><h2>หมดเวลา!</h2>
            <p className="result-score">ทำได้ <strong>{score}</strong> ครั้ง และเก็บ <strong>{sessionExp.toLocaleString()}</strong> EXP</p>
            <p className="result-rank">ตอนนี้คุณคือ <strong>{rank.current.title}</strong></p>
            <p className="result-message">{getPerformanceMessage(score)}</p>
            <div className="result-actions">
              <button type="button" className="ghost-button" onClick={() => setGameState("setup")}>กลับไปตั้งท่า</button>
              <button type="button" className="primary-button" onClick={startGame}>เล่นอีกครั้ง</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
