import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInVariants } from "../components/Hero";

export default function NotFoundPage() {
  return (
    <section className="w-full max-w-3xl mx-auto px-6 py-10 md:py-14 min-h-screen flex flex-col items-center justify-center text-center">
      <motion.div
        initial="hidden"
        animate="visible"
        custom={0}
        variants={fadeInVariants}
        className="flex items-center gap-2 text-xs text-text-faint"
      >
        <span className="rounded-md border border-border px-1.5 py-0.5 text-[11px]">
          404
        </span>
        <span className="tracking-wider uppercase">Page Not Found</span>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        custom={0.06}
        variants={fadeInVariants}
        className="mt-8"
      >
        <h1 className="text-xl md:text-2xl font-medium text-text">
          This page doesn't exist.
        </h1>
        <p className="text-text-muted text-sm md:text-base mt-2">
          The page you're looking for may have been moved or removed.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-text tracking-wider uppercase hover:text-accent transition-colors duration-base ease-out mt-6 rounded-md border border-border px-3 py-2"
        >
          Back to home
        </Link>
      </motion.div>
    </section>
  );
}
