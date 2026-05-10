"use client";
import { memo, useEffect, useRef } from "react";
import { LANDMARK_COLORS, OPTICAL_FLOW_LANDMARKS, type Landmark, type OpticalFlowPoint } from "../hooks/useMediaPipePose";

interface SkeletonOverlayProps {
  landmarks: Landmark[];
  opticalFlowPoints: OpticalFlowPoint[];
  getFlowHistory: (idx: number) => { x: number; y: number }[];
  width: number;
  height: number;
  mirrored?: boolean;
}

const ARM_CONNECTIONS: [number, number][] = [[11,13],[13,15],[12,14],[14,16],[11,12]];
const ARM_LANDMARKS = [11, 12, 13, 14, 15, 16];
const isVisible = (landmark: Landmark) => (landmark.visibility ?? 1) >= 0.35;

export const SkeletonOverlay = memo(function SkeletonOverlay({
  landmarks, getFlowHistory, width, height, mirrored = true
}: SkeletonOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    if (!landmarks.length) return;

    const toCanvasCoords = (x: number, y: number): [number, number] => {
      return [mirrored ? width - x * width : x * width, y * height];
    };

    OPTICAL_FLOW_LANDMARKS.forEach((idx) => {
      const history = getFlowHistory(idx);
      if (history.length < 2) return;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (let i = 1; i < history.length; i += 1) {
        const opacity = i / history.length;
        const [x1, y1] = toCanvasCoords(history[i - 1].x, history[i - 1].y);
        const [x2, y2] = toCanvasCoords(history[i].x, history[i].y);
        ctx.globalAlpha = opacity * 0.85;
        ctx.strokeStyle = LANDMARK_COLORS[idx] || "#7dd3fc";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    });

    ctx.globalAlpha = 1;
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.shadowColor = "#0ea5e9";
    ctx.shadowBlur = 18;

    ARM_CONNECTIONS.forEach(([start, end]) => {
      const startLm = landmarks[start];
      const endLm = landmarks[end];
      if (!startLm || !endLm || !isVisible(startLm) || !isVisible(endLm)) return;
      const [x1, y1] = toCanvasCoords(startLm.x, startLm.y);
      const [x2, y2] = toCanvasCoords(endLm.x, endLm.y);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    });

    ctx.shadowBlur = 0;
    ARM_LANDMARKS.forEach((idx) => {
      const landmark = landmarks[idx];
      if (!landmark || !isVisible(landmark)) return;
      const [x, y] = toCanvasCoords(landmark.x, landmark.y);
      const color = LANDMARK_COLORS[idx] || "#38bdf8";
      ctx.fillStyle = `${color}55`;
      ctx.beginPath();
      ctx.arc(x, y, 13, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#dbeafe";
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }, [landmarks, getFlowHistory, width, height, mirrored]);

  return <canvas ref={canvasRef} width={width} height={height} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", mixBlendMode: "screen", opacity: 0.7, zIndex: 4 }} />;
});
