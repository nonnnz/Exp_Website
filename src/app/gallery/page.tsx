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
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
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

  // Distribute images round-robin into columns (natural masonry order)
  const columns: Array<Array<{ img: Img; globalIdx: number }>> = Array.from({ length: cols }, () => []);
  images.forEach((img, idx) => {
    columns[idx % cols].push({ img, globalIdx: idx });
  });

  const hoveredCol = hoveredIdx !== null ? hoveredIdx % cols : null;
  const isAnyHovered = hoveredIdx !== null;

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

      {/* Gallery — flex columns */}
      <section className="mx-auto max-w-[1831px] px-3 py-8 sm:px-4 lg:px-6">
        {isLoading ? (
          // Skeleton: fixed columns with placeholder boxes
          <div style={{ display: "flex", gap: 8 }}>
            {Array.from({ length: cols }).map((_, ci) => (
              <div key={ci} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                {[220, 310, 180].map((h, i) => (
                  <div key={i} className="animate-pulse rounded-[12px] bg-white/8" style={{ height: h }} />
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
          // Real flex-column layout — flex-grow animates the whole column width
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            {columns.map((colItems, colIdx) => {
              const isHovCol = hoveredCol === colIdx;
              return (
                <div
                  key={colIdx}
                  style={{
                    // The magic: hovered column grows to 2x, others shrink proportionally
                    flexGrow: isHovCol ? 2 : 1,
                    flexShrink: 1,
                    flexBasis: 0,
                    minWidth: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    transition: "flex-grow 0.42s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {colItems.map(({ img, globalIdx }) => {
                    const isHov = hoveredIdx === globalIdx;
                    const isDim = isAnyHovered && !isHov;
                    return (
                      <button
                        key={img.id}
                        type="button"
                        aria-label={`View image ${globalIdx + 1}`}
                        onClick={() => open(globalIdx)}
                        onMouseEnter={() => setHoveredIdx(globalIdx)}
                        onMouseLeave={() => setHoveredIdx(null)}
                        style={{
                          display: "block",
                          width: "100%",
                          padding: 0,
                          border: "none",
                          background: "none",
                          outline: "none",
                          cursor: "zoom-in",
                          borderRadius: 12,
                          overflow: "hidden",
                          // Per-image: scale pop + dim
                          transform: isHov ? "scale(1.03)" : "scale(1)",
                          opacity: isDim ? 0.35 : 1,
                          filter: isDim ? "brightness(0.5) saturate(0.4)" : "none",
                          boxShadow: isHov ? "0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.07)" : "none",
                          transition:
                            "transform 0.38s cubic-bezier(0.34, 1.2, 0.64, 1), " +
                            "opacity 0.28s ease, filter 0.28s ease, box-shadow 0.28s ease",
                          zIndex: isHov ? 10 : 0,
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
                            display: "block",
                            width: "100%",
                            height: "auto", // ← natural ratio!
                            transition: "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                            transform: isHov ? "scale(1.04)" : "scale(1)",
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              );
            })}
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
