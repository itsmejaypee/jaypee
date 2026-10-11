import React, { useState, useRef, useCallback } from "react";
import { ArrowUpRight, Images as ImagesIcon, Code, ClipboardList, Cpu, Layers, FileText } from "lucide-react";
import ImageLightbox from "./ImageLightbox";

const tagIcons = {
  "Basic Programming": Code,
  "System Analysis": ClipboardList,
  "Technical Documentation": FileText,
  "Embedded Systems": Cpu,
  "System Architecture": Layers,
};

function TechPill({ tag }) {
  const Icon = tagIcons[tag];

  return (
    <span
      title={tag}
      className="group relative flex h-7 shrink-0 items-center rounded-full border border-border bg-bg overflow-hidden hover:z-10"
    >
      <span className="flex size-7 shrink-0 items-center justify-center overflow-hidden">
        {Icon ? <Icon size={14} className="text-text-muted" /> : (
          <span className="text-[10px] font-medium text-text-faint">
            {tag.charAt(0).toUpperCase()}
          </span>
        )}
      </span>
      <span className="grid grid-cols-[0fr] overflow-hidden transition-[grid-template-columns] duration-base ease-out group-hover:grid-cols-[1fr]">
        <span className="min-w-0 overflow-hidden">
          <span className="block whitespace-nowrap pl-0.5 pr-2.5 text-[10px] font-medium text-text">
            {tag}
          </span>
        </span>
      </span>
    </span>
  );
}

// Interactive cursor-following radial glow border
function GlowOverlay({ color, gridRadius = 140, edgeRadius = 260 }) {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out"
        style={{
          opacity: "var(--glow-opacity, 0)",
          backgroundImage: `linear-gradient(to right, color-mix(in srgb, ${color} 10%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, ${color} 10%, transparent) 1px, transparent 1px)`,
          backgroundSize: "8px 8px",
          WebkitMaskImage: `radial-gradient(circle ${gridRadius}px at var(--glow-x, 50%) var(--glow-y, 50%), #000, transparent 70%)`,
          maskImage: `radial-gradient(circle ${gridRadius}px at var(--glow-x, 50%) var(--glow-y, 50%), #000, transparent 70%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300 ease-out"
        style={{
          opacity: "var(--glow-opacity, 0)",
          padding: "1px",
          background: `radial-gradient(circle ${edgeRadius}px at var(--glow-x, 50%) var(--glow-y, 50%), color-mix(in srgb, ${color} 90%, transparent), transparent 70%)`,
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
    </>
  );
}

export function useCardGlow() {
  const cardRef = useRef(null);
  const rafRef = useRef(null);

  const onMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const { clientX, clientY } = e;

    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--glow-x", `${clientX - rect.left}px`);
        card.style.setProperty("--glow-y", `${clientY - rect.top}px`);
      });
    }
  }, []);

  const onMouseEnter = useCallback(() => {
    cardRef.current?.style.setProperty("--glow-opacity", "1");
  }, []);

  const onMouseLeave = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    cardRef.current?.style.setProperty("--glow-opacity", "0");
  }, []);

  return { ref: cardRef, onMouseMove, onMouseEnter, onMouseLeave };
}

export default function ProjectCard({ project, expandable = false }) {
  const { ref, onMouseMove, onMouseEnter, onMouseLeave } = useCardGlow();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const canExpand = expandable && !!project.preview;
  const galleryImages =
    project.images && project.images.length > 0
      ? project.images
      : [project.preview].filter(Boolean);

  const openLightbox = (e) => {
    e.stopPropagation();
    setIsLightboxOpen(true);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ "--glow-opacity": 0 }}
      className="relative h-full overflow-hidden rounded-xl border border-border bg-bg p-5"
    >
      <GlowOverlay color={project.glow} />

      {/* Media Preview Box */}
      <div
        className="relative flex aspect-2/1 items-center justify-center overflow-hidden rounded-lg border border-border"
        style={
          project.preview
            ? undefined
            : {
                backgroundImage: `radial-gradient(circle at 30% 20%, color-mix(in srgb, ${project.glow} 14%, transparent), transparent 60%)`,
              }
        }
      >
        {project.preview ? (
          <img
            src={project.preview}
            alt={`${project.name} preview`}
            style={{ objectFit: project.imageFit || "cover" }}
            className={`size-full object-cover ${
              canExpand
                ? "cursor-zoom-in transition-transform duration-base ease-out hover:scale-105"
                : "pointer-events-none"
            }`}
            draggable={false}
            role={canExpand ? "button" : undefined}
            tabIndex={canExpand ? 0 : undefined}
            aria-label={canExpand ? `Expand ${project.name} preview` : undefined}
            onClick={canExpand ? openLightbox : undefined}
            onKeyDown={
              canExpand
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openLightbox(e);
                    }
                  }
                : undefined
            }
          />
        ) : (
          <img
            src={project.icon}
            alt={project.name}
            width={56}
            height={56}
            className="rounded-xl object-contain shadow-sm pointer-events-none"
            draggable={false}
          />
        )}

        {/* Gallery Image Counter Badge */}
        {canExpand && galleryImages.length > 1 && (
          <span className="absolute bottom-2 right-2 pointer-events-none inline-flex items-center gap-1 rounded-full border border-border bg-bg/80 px-2 py-1 text-[11px] text-text backdrop-blur-sm">
            <ImagesIcon size={12} />
            1/{galleryImages.length}
          </span>
        )}
      </div>

      <h3 className="relative text-base font-medium text-text mt-4">
        {project.name}
      </h3>
      <p className="relative text-text-muted text-sm mt-2 line-clamp-2">
        {project.description}
      </p>

      {/* Tech Tags */}
      <div className="relative flex items-center -space-x-2 mt-3">
        {project.tags.slice(0, 6).map((tag) => (
          <TechPill key={tag} tag={tag} />
        ))}
        {project.tags.length > 6 && (
          <span className="relative flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-bg text-[10px] text-text-faint">
            +{project.tags.length - 6}
          </span>
        )}
      </div>

      {/* Footer Info */}
      <div className="relative flex items-center justify-between border-t border-border mt-4 pt-4 text-xs">
        <button
          type="button"
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          onClick={openLightbox}
          className="inline-flex items-center gap-1.5 text-text hover:text-accent transition-colors duration-base ease-out select-none"
        >
          <span>View Photo</span>
          <ArrowUpRight size={14} />
        </button>
        <span className="text-text-faint">{project.duration}</span>
      </div>

      {galleryImages.length > 0 && (
        <ImageLightbox
          images={galleryImages}
          alt={`${project.name} preview`}
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </div>
  );
}
