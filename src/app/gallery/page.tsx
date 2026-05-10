"use client";

import Footer from "@/components/Footer";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";

type DriveImage = {
  id: string;
  name: string;
  src: string;
  createdTime: string;
};

/* ─────────────────────────────────────────────
   Intersection-observer hook for scroll reveal
───────────────────────────────────────────── */
function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export default function GalleryPage() {
  const [images, setImages] = useState<DriveImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/drive-images");
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        setImages(data.images ?? []);
      } catch (err) {
        console.error("Failed to fetch gallery:", err);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  const openImage = useCallback((index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setSelectedIndex(null);
    document.body.style.overflow = "";
  }, []);

  const goNext = useCallback(() => {
    if (images.length === 0 || selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  }, [images.length, selectedIndex]);

  const goPrev = useCallback(() => {
    if (images.length === 0 || selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  }, [images.length, selectedIndex]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedIndex, closeModal, goNext, goPrev]);

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;
  const isAnyHovered = hoveredId !== null;

  return (
    <div className="min-h-screen bg-space-bg text-space-cream">
      {/* ── Hero ── */}
      <section className="relative flex min-h-[28vh] items-end overflow-hidden rounded-b-[32px] pb-12 pt-24">
        <div className="absolute inset-0 bg-gradient-to-t from-space-bg via-primary/20 to-space-bg" />
        <div className="absolute inset-0 stars-layer opacity-40" />
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />

        <div className="relative z-10 mx-auto w-full max-w-[1831px] px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent/90">Visual Archive</p>
          <div className="mt-3 flex items-end justify-between gap-6">
            <h1 className="font-anton text-[40px] uppercase leading-none sm:text-[60px] md:text-[75px]">
              Gallery
            </h1>
            {!isLoading && !hasError && (
              <p className="mb-2 font-mono text-xs uppercase tracking-wider text-space-cream/40">
                {images.length} images
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="mx-auto max-w-[1831px] px-3 py-10 sm:px-4 lg:px-6">
        {/* Inject global transition for the hover scale effect */}
        <style>{`
          .gallery-item {
            transition:
              transform 0.4s cubic-bezier(0.34, 1.2, 0.64, 1),
              opacity 0.3s ease,
              filter 0.3s ease,
              box-shadow 0.3s ease;
            will-change: transform, opacity;
          }
          .gallery-item.is-hovered {
            transform: scale(1.03);
            opacity: 1;
            filter: none;
            box-shadow: 0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.07);
            z-index: 20;
          }
          .gallery-item.is-dimmed {
            transform: scale(1);
            opacity: 0.4;
            filter: brightness(0.65) saturate(0.6);
            z-index: 0;
          }
          @media (min-width: 640px)  { .masonry { column-count: 3; } }
          @media (min-width: 1024px) { .masonry { column-count: 4; } }
          @media (min-width: 1280px) { .masonry { column-count: 5; } }

          /* Scroll-reveal */
          .reveal-item {
            opacity: 0;
            transform: translateY(28px) scale(0.97);
            transition:
              opacity 0.6s ease,
              transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .reveal-item.revealed {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        `}</style>

        {isLoading ? (
          <SkeletonMasonry />
        ) : hasError ? (
          <ErrorState onRetry={() => window.location.reload()} />
        ) : images.length === 0 ? (
          <EmptyState />
        ) : (
          <MasonryGallery
            images={images}
            hoveredId={hoveredId}
            isAnyHovered={isAnyHovered}
            onHover={setHoveredId}
            onOpen={openImage}
          />
        )}
      </section>

      {/* ── Lightbox ── */}
      {selectedImage && selectedIndex !== null && (
        <Lightbox
          image={selectedImage}
          index={selectedIndex}
          total={images.length}
          onClose={closeModal}
          onNext={goNext}
          onPrev={goPrev}
        />
      )}

      <Footer />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Masonry gallery with hover spotlight
───────────────────────────────────────────── */
function MasonryGallery({
  images,
  hoveredId,
  isAnyHovered,
  onHover,
  onOpen,
}: {
  images: DriveImage[];
  hoveredId: string | null;
  isAnyHovered: boolean;
  onHover: (id: string | null) => void;
  onOpen: (index: number) => void;
}) {
  const { ref, visible } = useScrollReveal();

  return (
    <div ref={ref} className="masonry" style={{ columnCount: 2, columnGap: "12px" }}>
      {images.map((img, index) => {
        const isHovered = hoveredId === img.id;
        const isDimmed = isAnyHovered && !isHovered;

        return (
          <div
            key={img.id}
            className={`relative mb-3 overflow-hidden rounded-[16px] gallery-item reveal-item ${
              visible ? `revealed` : ""
            } ${isHovered ? "is-hovered" : ""} ${isDimmed ? "is-dimmed" : ""}`}
            style={{
              breakInside: "avoid",
              transitionDelay: visible ? `${Math.min(index * 40, 600)}ms` : "0ms",
              position: "relative",
            }}
            onMouseEnter={() => onHover(img.id)}
            onMouseLeave={() => onHover(null)}
          >
            <button
              type="button"
              onClick={() => onOpen(index)}
              aria-label={`View image ${index + 1}`}
              className="block w-full cursor-zoom-in focus:outline-none"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt=""
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
            </button>

            {/* Subtle accent shine on hover */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[16px] opacity-0 transition-opacity duration-300"
              style={{
                opacity: isHovered ? 1 : 0,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Lightbox with zoom + pan
───────────────────────────────────────────── */
function Lightbox({
  image,
  index,
  total,
  onClose,
  onNext,
  onPrev,
}: {
  image: DriveImage;
  index: number;
  total: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragState = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    dragState.current = null;
  }, [image.id]);

  const setViewerZoom = (nextZoom: number) => {
    const clamped = Math.min(5, Math.max(0.5, Math.round(nextZoom * 100) / 100));
    setZoom(clamped);
    if (clamped <= 1) setPan({ x: 0, y: 0 });
  };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setViewerZoom(zoom + (e.deltaY < 0 ? 0.15 : -0.15));
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (zoom <= 1) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragState.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      originX: pan.x,
      originY: pan.y,
    };
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const drag = dragState.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    setPan({ x: drag.originX + e.clientX - drag.startX, y: drag.originY + e.clientY - drag.startY });
  };

  const onPointerEnd = (e: PointerEvent<HTMLDivElement>) => {
    if (dragState.current?.pointerId === e.pointerId) dragState.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/92"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Image area */}
      <div
        className={`relative flex h-full w-full select-none items-center justify-center overflow-hidden ${
          zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-out"
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onWheel={onWheel}
        onClick={(e) => { if (e.target === e.currentTarget && zoom <= 1) onClose(); }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt=""
          draggable={false}
          className="max-h-[90vh] max-w-[90vw] rounded-[8px] object-contain shadow-2xl"
          style={{
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
            transition: dragState.current ? "none" : "transform 0.2s ease-out",
          }}
        />
      </div>

      {/* Top bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-4 py-4">
        <span className="pointer-events-auto rounded-full bg-black/50 px-4 py-2 font-mono text-xs uppercase text-white/60 backdrop-blur">
          {index + 1} / {total}
        </span>
        <div className="pointer-events-auto flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-black/50 p-1.5 backdrop-blur">
            <button
              type="button"
              onClick={() => setViewerZoom(zoom - 0.25)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white focus:outline-none"
              aria-label="Zoom out"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0zm-6 0H8" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setViewerZoom(1)}
              className="min-w-[44px] rounded-full px-2 py-1 font-mono text-[10px] uppercase text-white/60 transition-colors hover:text-white focus:outline-none"
              aria-label="Reset zoom"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              type="button"
              onClick={() => setViewerZoom(zoom + 0.25)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white focus:outline-none"
              aria-label="Zoom in"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0zm0-6v6m-3-3h6" />
              </svg>
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white/70 backdrop-blur transition-colors hover:bg-white/15 hover:text-white focus:outline-none"
            aria-label="Close viewer"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Prev / Next */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={onPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white/70 backdrop-blur transition-colors hover:bg-white/15 hover:text-white focus:outline-none sm:left-5"
            aria-label="Previous image"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white/70 backdrop-blur transition-colors hover:bg-white/15 hover:text-white focus:outline-none sm:right-5"
            aria-label="Next image"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Skeleton
───────────────────────────────────────────── */
const SKELETON_HEIGHTS = [220, 310, 180, 260, 340, 200, 280, 220, 300, 190, 250, 320];

function SkeletonMasonry() {
  return (
    <div className="masonry" style={{ columnCount: 2, columnGap: "12px" }}>
      <style>{`
        @media (min-width: 640px)  { .masonry { column-count: 3; } }
        @media (min-width: 1024px) { .masonry { column-count: 4; } }
        @media (min-width: 1280px) { .masonry { column-count: 5; } }
      `}</style>
      {SKELETON_HEIGHTS.map((h, i) => (
        <div
          key={i}
          className="mb-3 animate-pulse rounded-[16px] bg-white/6"
          style={{ height: h, breakInside: "avoid" }}
        />
      ))}
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <p className="font-mono text-sm uppercase tracking-wider text-space-cream/50">
        Signal lost — couldn&apos;t load images.
      </p>
      <button
        onClick={onRetry}
        className="mt-6 liquid-glass min-h-11 rounded-[28px] px-5 py-3 font-anton text-xs uppercase tracking-wide text-space-cream transition-colors hover:text-accent"
      >
        Retry
      </button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <p className="font-mono text-sm uppercase tracking-wider text-space-cream/50">
        No images found in archive.
      </p>
    </div>
  );
}
