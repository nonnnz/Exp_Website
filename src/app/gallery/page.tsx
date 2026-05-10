"use client";

import Footer from "@/components/Footer";
import { useCallback, useEffect, useState, useRef, type PointerEvent } from "react";

type Img = { id: string; name: string; src: string; createdTime: string };

function useColumns() {
  const [cols, setCols] = useState(4);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setCols(2);
      else if (window.innerWidth < 1024) setCols(3);
      else setCols(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return cols;
}

export default function GalleryPage() {
  const [images, setImages] = useState<Img[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const cols = useColumns();

  useEffect(() => {
    fetch("/api/drive-images")
      .then((r) => { if (!r.ok) throw new Error("fail"); return r.json(); })
      .then((d) => setImages(d.images ?? []))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const open = useCallback((i: number) => {
    setLightboxIndex(i);
    document.body.style.overflow = "hidden";
  }, []);
  const close = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);
  const goNext = useCallback(() => setLightboxIndex((i) => i === null ? null : (i + 1) % images.length), [images.length]);
  const goPrev = useCallback(() => setLightboxIndex((i) => i === null ? null : (i - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [lightboxIndex, close, goNext, goPrev]);

  // Chunk into rows
  const rows: Img[][] = [];
  for (let i = 0; i < images.length; i += cols) rows.push(images.slice(i, i + cols));

  const ROW_H = typeof window !== "undefined" && window.innerWidth < 640 ? 160 : typeof window !== "undefined" && window.innerWidth < 1024 ? 220 : 280;

  return (
    <div className="min-h-screen bg-space-bg text-space-cream">
      {/* Hero */}
      <section className="relative flex min-h-[24vh] items-end overflow-hidden rounded-b-[32px] pb-10 pt-24">
        <div className="absolute inset-0 bg-gradient-to-t from-space-bg via-primary/20 to-space-bg" />
        <div className="absolute inset-0 stars-layer opacity-40" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />
        <div className="relative z-10 mx-auto w-full max-w-[1831px] px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent/90">Visual Archive</p>
          <div className="mt-3 flex items-end justify-between">
            <h1 className="font-anton text-[40px] uppercase leading-none sm:text-[60px] md:text-[75px]">Gallery</h1>
            {!isLoading && !hasError && (
              <p className="mb-1 font-mono text-xs uppercase text-space-cream/40">{images.length} images</p>
            )}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-[1831px] px-3 py-8 sm:px-4 lg:px-6">
        {isLoading ? (
          <div className="flex flex-col gap-2">
            {[280, 240, 260].map((h, i) => (
              <div key={i} className="flex gap-2">
                {Array.from({ length: cols }).map((_, j) => (
                  <div key={j} className="animate-pulse rounded-[12px] bg-white/8 flex-1" style={{ height: h }} />
                ))}
              </div>
            ))}
          </div>
        ) : hasError ? (
          <div className="flex flex-col items-center py-32">
            <p className="font-mono text-sm uppercase text-space-cream/50">Failed to load images.</p>
            <button onClick={() => window.location.reload()} className="mt-6 liquid-glass min-h-11 rounded-[28px] px-5 py-3 font-anton text-xs uppercase text-space-cream hover:text-accent">
              Retry
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {rows.map((row, ri) => (
              <div key={ri} className="flex gap-2" style={{ height: ROW_H }}>
                {row.map((img, ci) => {
                  const globalIdx = ri * cols + ci;
                  const isHov = hoveredId === img.id;
                  const isDim = hoveredId !== null && !isHov;
                  return (
                    <button
                      key={img.id}
                      type="button"
                      aria-label={`View image ${globalIdx + 1}`}
                      onClick={() => open(globalIdx)}
                      onMouseEnter={() => setHoveredId(img.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      style={{
                        flexGrow: isHov ? 2 : 1,
                        flexShrink: 1,
                        flexBasis: 0,
                        minWidth: 0,
                        height: "100%",
                        transition: "flex-grow 0.42s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease, filter 0.3s ease",
                        overflow: "hidden",
                        borderRadius: 12,
                        opacity: isDim ? 0.45 : 1,
                        filter: isDim ? "brightness(0.6) saturate(0.5)" : "none",
                        outline: "none",
                        cursor: "zoom-in",
                        position: "relative",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.src}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                          transform: isHov ? "scale(1.04)" : "scale(1)",
                          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </section>

      {lightboxIndex !== null && images[lightboxIndex] && (
        <Lightbox
          image={images[lightboxIndex]}
          index={lightboxIndex}
          total={images.length}
          onClose={close}
          onNext={goNext}
          onPrev={goPrev}
        />
      )}

      <Footer />
    </div>
  );
}

function Lightbox({ image, index, total, onClose, onNext, onPrev }: {
  image: Img; index: number; total: number;
  onClose: () => void; onNext: () => void; onPrev: () => void;
}) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const drag = useRef<{ pid: number; sx: number; sy: number; ox: number; oy: number } | null>(null);

  useEffect(() => { setZoom(1); setPan({ x: 0, y: 0 }); }, [image.id]);

  const setZ = (z: number) => {
    const c = Math.min(5, Math.max(0.5, Math.round(z * 100) / 100));
    setZoom(c);
    if (c <= 1) setPan({ x: 0, y: 0 });
  };

  const onWheel = (e: React.WheelEvent) => { e.preventDefault(); setZ(zoom + (e.deltaY < 0 ? 0.15 : -0.15)); };
  const onPD = (e: PointerEvent<HTMLDivElement>) => {
    if (zoom <= 1) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { pid: e.pointerId, sx: e.clientX, sy: e.clientY, ox: pan.x, oy: pan.y };
  };
  const onPM = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current || drag.current.pid !== e.pointerId) return;
    setPan({ x: drag.current.ox + e.clientX - drag.current.sx, y: drag.current.oy + e.clientY - drag.current.sy });
  };
  const onPE = (e: PointerEvent<HTMLDivElement>) => { if (drag.current?.pid === e.pointerId) drag.current = null; };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/92"
      role="dialog" aria-modal="true"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div
        className={`relative flex h-full w-full select-none items-center justify-center overflow-hidden ${zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-out"}`}
        onPointerDown={onPD} onPointerMove={onPM} onPointerUp={onPE} onPointerCancel={onPE} onWheel={onWheel}
        onClick={(e) => { if (e.target === e.currentTarget && zoom <= 1) onClose(); }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image.src} alt="" draggable={false}
          className="max-h-[90vh] max-w-[90vw] rounded-[8px] object-contain shadow-2xl"
          style={{ transform: `translate3d(${pan.x}px,${pan.y}px,0) scale(${zoom})`, transition: drag.current ? "none" : "transform 0.2s ease-out" }}
        />
      </div>

      {/* Top bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-4 py-4">
        <span className="pointer-events-auto rounded-full bg-black/50 px-4 py-2 font-mono text-xs uppercase text-white/60 backdrop-blur">
          {index + 1} / {total}
        </span>
        <div className="pointer-events-auto flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-black/50 p-1.5 backdrop-blur">
            <button onClick={() => setZ(zoom - 0.25)} className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white" aria-label="Zoom out">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0zm-6 0H8" /></svg>
            </button>
            <button onClick={() => setZ(1)} className="min-w-[44px] rounded-full px-2 py-1 font-mono text-[10px] uppercase text-white/60 hover:text-white" aria-label="Reset zoom">
              {Math.round(zoom * 100)}%
            </button>
            <button onClick={() => setZ(zoom + 0.25)} className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white" aria-label="Zoom in">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0zm0-6v6m-3-3h6" /></svg>
            </button>
          </div>
          <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white/70 backdrop-blur hover:bg-white/15 hover:text-white" aria-label="Close">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>

      {total > 1 && <>
        <button onClick={onPrev} className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white/70 backdrop-blur hover:bg-white/15 hover:text-white" aria-label="Previous">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button onClick={onNext} className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white/70 backdrop-blur hover:bg-white/15 hover:text-white" aria-label="Next">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </>}
    </div>
  );
}
