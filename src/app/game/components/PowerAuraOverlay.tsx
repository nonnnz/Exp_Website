"use client";
import { memo, useEffect, useRef } from "react";
import type { Landmark } from "../hooks/useMediaPipePose";

interface PowerAuraOverlayProps {
  active: boolean;
  landmarks: Landmark[];
  width: number;
  height: number;
  mirrored?: boolean;
}

const TRACKED_BODY_POINTS = [11, 12, 13, 14, 15, 16, 23, 24];

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}

function seededNoise(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

export const PowerAuraOverlay = memo(function PowerAuraOverlay({
  active, landmarks, width, height, mirrored = true
}: PowerAuraOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const landmarksRef = useRef(landmarks);

  useEffect(() => { landmarksRef.current = landmarks; }, [landmarks]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;
    const toCanvasCoords = (x: number, y: number): [number, number] => {
      return [mirrored ? width - x * width : x * width, y * height];
    };

    const getAuraFrame = () => {
      const points = TRACKED_BODY_POINTS.map((idx) => landmarksRef.current[idx])
        .filter((point): point is Landmark => Boolean(point) && (point.visibility ?? 1) > 0.35)
        .map((point) => toCanvasCoords(point.x, point.y));
      if (points.length < 2) {
        return { centerX: width / 2, baseY: height * 0.88, auraWidth: width * 0.42, auraHeight: height * 0.72 };
      }
      const xs = points.map(([x]) => x);
      const ys = points.map(([, y]) => y);
      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);
      const bodyWidth = Math.max(maxX - minX, 120);
      const bodyHeight = Math.max(maxY - minY, 210);
      return {
        centerX: (minX + maxX) / 2,
        baseY: clamp(maxY + bodyHeight * 0.18, height * 0.5, height * 0.98),
        auraWidth: clamp(Math.max(bodyWidth * 2.8, bodyHeight * 0.86), 260, width * 0.78),
        auraHeight: clamp(bodyHeight * 1.85, 330, height * 0.94)
      };
    };

    const drawJaggedAura = (centerX: number, baseY: number, auraWidth: number, auraHeight: number, time: number, layer: number, fill: string, stroke: string) => {
      const segments = 18;
      const left: [number, number][] = [];
      const right: [number, number][] = [];
      for (let i = 0; i <= segments; i += 1) {
        const t = i / segments;
        const y = baseY - auraHeight * t;
        const bodyCurve = Math.sin(t * Math.PI) * auraWidth * (0.2 + layer * 0.04);
        const taper = auraWidth * (0.06 + (1 - t) * 0.12);
        const spike = (i % 2 === 0 ? 1 : -0.35) * auraWidth * (0.06 + seededNoise(i + layer * 31) * 0.12);
        const pulse = Math.sin(time * (0.006 + layer * 0.0015) + i * 1.7) * auraWidth * 0.035;
        const radius = Math.max(12, bodyCurve + taper + spike + pulse);
        left.push([centerX - radius, y]);
        right.unshift([centerX + radius * (0.9 + seededNoise(i + layer * 19) * 0.22), y]);
      }
      ctx.beginPath();
      ctx.moveTo(centerX, baseY + auraHeight * 0.04);
      left.forEach(([x, y]) => ctx.lineTo(x, y));
      ctx.lineTo(centerX + Math.sin(time * 0.012 + layer) * 18, baseY - auraHeight * 1.03);
      right.forEach(([x, y]) => ctx.lineTo(x, y));
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 4 + layer;
      ctx.shadowColor = "#fde047";
      ctx.shadowBlur = 28 + layer * 8;
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const { centerX, baseY, auraWidth, auraHeight } = getAuraFrame();
      const shakeX = Math.sin(time * 0.04) * 5 + Math.sin(time * 0.017) * 3;
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      drawJaggedAura(centerX + shakeX, baseY, auraWidth, auraHeight, time, 2, "rgba(250,204,21,0.16)", "rgba(254,240,138,0.28)");
      drawJaggedAura(centerX - shakeX * 0.5, baseY, auraWidth * 0.72, auraHeight * 0.9, time + 180, 1, "rgba(190,242,100,0.12)", "rgba(254,252,191,0.24)");
      drawJaggedAura(centerX + shakeX * 0.25, baseY, auraWidth * 0.46, auraHeight * 0.78, time + 340, 0, "rgba(134,239,172,0.08)", "rgba(187,247,208,0.18)");
      ctx.restore();
      animationFrame = window.requestAnimationFrame(draw);
    };

    if (!active) { ctx.clearRect(0, 0, width, height); return; }
    animationFrame = window.requestAnimationFrame(draw);
    return () => { window.cancelAnimationFrame(animationFrame); ctx.clearRect(0, 0, width, height); };
  }, [active, height, mirrored, width]);

  return <canvas ref={canvasRef} width={width} height={height} style={{ position: "absolute", inset: 0, zIndex: 3, width: "100%", height: "100%", opacity: 0.68, pointerEvents: "none" }} />;
});
