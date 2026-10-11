import React from "react";
import { motion } from "framer-motion";
import { PageHeader } from "../components/SectionHeader";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/portfolioData";
import { fadeInVariants } from "../components/Hero";

export default function ProjectsPage() {
  return (
    <section className="w-full max-w-3xl mx-auto px-6 py-10 md:py-14">
      <PageHeader
        title="Projects"
        description="Two academic projects at ICCT Colleges: NutriTrack and Embedded Systems: Medicare. Select a photo to view it in full."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            custom={idx * 0.08}
            variants={fadeInVariants}
          >
            <ProjectCard project={project} expandable={true} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
