"use client";
import { memo, useEffect, useRef } from "react";
import type { Landmark } from "../hooks/useMediaPipePose";

interface HandOverlayProps {
  hands: Landmark[][];
  width: number;
  height: number;
  mirrored?: boolean;
}

const HAND_CONNECTIONS: [number, number][] = [
  [0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],
  [9,13],[13,14],[14,15],[15,16],[13,17],[17,18],[18,19],[19,20],[0,17]
];
const FINGER_TIPS = [4, 8, 12, 16, 20];

export const HandOverlay = memo(function HandOverlay({ hands, width, height, mirrored = true }: HandOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    if (!hands.length) return;

    const toCanvasCoords = (landmark: Landmark): [number, number] => {
      return [mirrored ? width - landmark.x * width : landmark.x * width, landmark.y * height];
    };

    hands.forEach((hand) => {
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#fef08a";
      ctx.shadowColor = "#facc15";
      ctx.shadowBlur = 12;

      HAND_CONNECTIONS.forEach(([start, end]) => {
        const startPoint = hand[start];
        const endPoint = hand[end];
        if (!startPoint || !endPoint) return;
        const [x1, y1] = toCanvasCoords(startPoint);
        const [x2, y2] = toCanvasCoords(endPoint);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });

      ctx.shadowBlur = 0;
      hand.forEach((point, index) => {
        const [x, y] = toCanvasCoords(point);
        const isTip = FINGER_TIPS.includes(index);
        ctx.fillStyle = isTip ? "#fde047" : "#38bdf8";
        ctx.strokeStyle = "#082f49";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, isTip ? 7 : 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });
    });
  }, [hands, height, mirrored, width]);

  return <canvas ref={canvasRef} width={width} height={height} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", mixBlendMode: "screen", zIndex: 4 }} />;
});
