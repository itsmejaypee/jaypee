import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, ZoomOut, RotateCcw, X, ChevronLeft, ChevronRight } from "lucide-react";

const MIN_ZOOM = 1;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.25;

export default function ImageLightbox({ images, alt, isOpen, onClose }) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [imageRatio, setImageRatio] = useState(4 / 3);

  const imgRef = useRef(null);
  const stageRef = useRef(null);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const pointerStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const activePointers = useRef(new Map());
  const pinchData = useRef({ distance: 0, zoom: 1 });

  const hasMultiple = images.length > 1;
  const isZoomed = zoom > MIN_ZOOM;

  const clampPan = (currentPan, currentZoom) => {
    const el = stageRef.current;
    if (!el || currentZoom <= MIN_ZOOM) return { x: 0, y: 0 };
    const rect = el.getBoundingClientRect();
    const boundX = Math.max(0, rect.width * (currentZoom - 1) / 2);
    const boundY = Math.max(0, rect.height * (currentZoom - 1) / 2);
    return {
      x: Math.min(boundX, Math.max(-boundX, currentPan.x)),
      y: Math.min(boundY, Math.max(-boundY, currentPan.y)),
    };
  };

  // Keyboard navigation & lock body scroll
  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    closeRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const controls = [...dialogRef.current.querySelectorAll('button:not(:disabled)')].filter(button => button.getClientRects().length);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
      if (e.key === "ArrowLeft" && hasMultiple) {
        setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }
      if (e.key === "ArrowRight" && hasMultiple) {
        setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [isOpen, onClose, hasMultiple, images.length]);

  // Reset zoom on image change
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setIsPanning(false);
    setImageRatio(4 / 3);
    activePointers.current.clear();
  }, [index, isOpen]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleZoomIn = (e) => {
    e.stopPropagation();
    setZoom((prev) => Math.min(MAX_ZOOM, prev + ZOOM_STEP));
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    const nextZoom = Math.max(MIN_ZOOM, zoom - ZOOM_STEP);
    setZoom(nextZoom);
    setPan(currentPan => clampPan(currentPan, nextZoom));
  };

  const handleResetZoom = (e) => {
    e.stopPropagation();
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handlePointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const points = [...activePointers.current.values()];
    if (points.length === 2) {
      pinchData.current = { distance: Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y), zoom };
    } else {
      pointerStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
    }
    setIsPanning(isZoomed);
  };

  const handlePointerMove = (e) => {
    if (!activePointers.current.has(e.pointerId)) return;
    activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const points = [...activePointers.current.values()];
    if (points.length === 2 && pinchData.current.distance) {
      const distance = Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y);
      const nextZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, pinchData.current.zoom * distance / pinchData.current.distance));
      setZoom(nextZoom);
      setPan(currentPan => clampPan(currentPan, nextZoom));
    } else if (isZoomed) {
      const start = pointerStart.current;
      setPan(clampPan({ x: start.panX + e.clientX - start.x, y: start.panY + e.clientY - start.y }, zoom));
    }
  };

  const handlePointerUp = (e) => {
    activePointers.current.delete(e.pointerId);
    const remaining = [...activePointers.current.values()][0];
    if (remaining) pointerStart.current = { x: remaining.x, y: remaining.y, panX: pan.x, panY: pan.y };
    else setIsPanning(false);
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lightbox-backdrop"
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lightbox-dialog"
            onClick={(e) => e.stopPropagation()}
          >
          {/* Top Toolbar */}
          <div
            className="lightbox-toolbar flex items-center justify-between gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lightbox-control-group flex items-center gap-1.5 rounded-full p-1">
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoom >= MAX_ZOOM}
                aria-label="Zoom in"
                className="lightbox-control-button flex size-8 items-center justify-center rounded-full transition-colors duration-base ease-out disabled:opacity-30"
              >
                <ZoomIn size={16} />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                aria-label="Reset zoom"
                className="lightbox-control-button flex size-8 items-center justify-center rounded-full transition-colors duration-base ease-out"
              >
                <RotateCcw size={14} />
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoom <= MIN_ZOOM}
                aria-label="Zoom out"
                className="lightbox-control-button flex size-8 items-center justify-center rounded-full transition-colors duration-base ease-out disabled:opacity-30"
              >
                <ZoomOut size={16} />
              </button>
            </div>

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="lightbox-close flex size-9 items-center justify-center rounded-full transition-colors duration-base ease-out"
            >
              <X size={18} />
            </button>
          </div>

          {/* Main Viewport */}
          <div className="lightbox-content">
            <div
              ref={stageRef}
              className="lightbox-stage"
              style={{ aspectRatio: imageRatio }}
              onClick={(e) => e.stopPropagation()}
            >
              {hasMultiple && (
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous image"
                  className="lightbox-nav-button absolute left-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full transition-colors duration-base ease-out"
                >
                  <ChevronLeft size={20} />
                </button>
              )}

              <motion.img
                ref={imgRef}
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: zoom, x: pan.x, y: pan.y }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: isPanning ? 0 : 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                src={images[index]}
                alt={`${alt} ${index + 1}`}
                onLoad={(e) => setImageRatio(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight)}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className={`lightbox-image touch-none rounded-lg object-contain select-none ${
                  isZoomed
                    ? isPanning
                      ? "cursor-grabbing"
                      : "cursor-grab"
                    : ""
                }`}
                draggable={false}
              />

              {hasMultiple && (
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next image"
                  className="lightbox-nav-button absolute right-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full transition-colors duration-base ease-out"
                >
                  <ChevronRight size={20} />
                </button>
              )}

              {hasMultiple && (
                <span className="lightbox-counter absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs">
                  Image {index + 1} of {images.length}
                </span>
              )}
            </div>

            {/* Desktop Thumbnails Sidebar */}
            {hasMultiple && (
              <div
                className="lightbox-gallery no-scrollbar"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="mb-3 text-[11px] font-medium tracking-wide text-white/50 uppercase">
                  Gallery
                </p>
                <div className="flex flex-col gap-2">
                  {images.map((img, i) => (
                    <button
                      key={img + i}
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`View image ${i + 1}`}
                      className={`overflow-hidden rounded-md border-2 transition-all duration-base ease-out ${
                        i === index
                          ? "scale-102 border-accent"
                          : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${alt} thumbnail ${i + 1}`}
                        className="aspect-2/1 w-full object-cover"
                        draggable={false}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <p className="lightbox-caption">{alt}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
