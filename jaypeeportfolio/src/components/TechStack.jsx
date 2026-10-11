import React from "react";
import { motion } from "framer-motion";
import { fadeInVariants } from "./Hero";

export default function TechStack({ groups, staggerDelay = 0.08 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
      {groups.map((group, idx) => (
        <motion.div
          key={group.category}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          custom={idx * staggerDelay}
          variants={fadeInVariants}
          className="rounded-xl border border-border p-5"
        >
          <h3 className="text-xs text-text-faint tracking-wider uppercase">
            {group.category}
          </h3>
          <div className="flex flex-wrap gap-2 mt-4">
            {group.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-md border border-border px-2.5 py-1 text-xs text-text-muted hover:text-text hover:border-accent transition-colors duration-base ease-out"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
