import React, { useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { fadeInVariants } from "./Hero";

const DRAG_THRESHOLD = 80;
const MAX_FEATURED = 3;

export default function ProjectsCarousel({ projects }) {
  const featured = projects.filter((p) => p.featured).slice(0, MAX_FEATURED);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animState, setAnimState] = useState("idle");

  const onViewportEnter = () => {
    setAnimState("entering");
    requestAnimationFrame(() => setAnimState("settled"));
  };

  const goToIndex = (newIndex) => {
    const total = featured.length;
    const wrapped = ((newIndex % total) + total) % total;
    setActiveIndex(wrapped);
  };

  const handleDragEnd = (e, info) => {
    if (info.offset.x < -DRAG_THRESHOLD || info.velocity.x < -500) {
      goToIndex(activeIndex + 1);
    } else if (info.offset.x > DRAG_THRESHOLD || info.velocity.x > 500) {
      goToIndex(activeIndex - 1);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goToIndex(index);
    }
  };

  return (
    <MotionConfig reducedMotion="never">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        onViewportEnter={onViewportEnter}
        custom={0}
        variants={fadeInVariants}
        className="relative left-1/2 w-screen -translate-x-1/2 mt-8 h-106 overflow-hidden"
      >
        {featured.map((project, idx) => {
          const total = featured.length;
          let offset = idx - activeIndex;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          const absOffset = Math.abs(offset);
          const isCurrent = offset === 0;
          const isEntering = animState !== "idle";
          const delay = animState === "settled" || isCurrent ? 0 : 0.2 + (absOffset - 1) * 0.08;

          return (
            <motion.div
              key={project.id}
              drag={isCurrent ? "x" : false}
              dragElastic={0.6}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={isCurrent ? handleDragEnd : undefined}
              onClick={() => !isCurrent && goToIndex(idx)}
              role={isCurrent ? undefined : "button"}
              tabIndex={isCurrent ? undefined : 0}
              aria-label={isCurrent ? undefined : `View ${project.name}`}
              onKeyDown={isCurrent ? undefined : (e) => handleKeyDown(e, idx)}
              animate={{
                x: `${offset * 60}%`,
                y: isEntering ? 0 : 24,
                scale: isCurrent ? 1 : 1 - absOffset * 0.18,
                opacity: isEntering ? (isCurrent ? 1 : 1 - absOffset * 0.4) : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                delay,
              }}
              style={{ zIndex: 10 - absOffset }}
              className={`absolute inset-x-0 top-0 mx-auto w-72 md:w-80 rounded-xl shadow-2xl ${
                isCurrent ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"
              }`}
            >
              <ProjectCard project={project} />
            </motion.div>
          );
        })}
      </motion.div>
    </MotionConfig>
  );
}
