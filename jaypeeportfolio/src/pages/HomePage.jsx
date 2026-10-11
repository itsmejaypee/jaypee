import React from "react";
import ScrollProgress from "../components/ScrollProgress";
import BackgroundGrid from "../components/BackgroundGrid";
import Hero from "../components/Hero";
import { SectionHeader } from "../components/SectionHeader";
import ProjectsCarousel from "../components/ProjectsCarousel";
import ExperienceTimeline from "../components/ExperienceTimeline";
import TechStack from "../components/TechStack";
import Certifications from "../components/Certifications";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import {
  projects,
  experience,
  techStack,
  certifications,
  education,
} from "../data/portfolioData";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />

      {/* Hero section with interactive grid ripple background */}
      <BackgroundGrid>
        <Hero />
      </BackgroundGrid>

      {/* Section 01: Projects Carousel */}
      <section className="w-full max-w-3xl mx-auto px-6 pb-9">
        <SectionHeader
          number="01"
          label="Projects"
          action={{ to: "/projects", label: "All projects" }}
        />
        <ProjectsCarousel projects={projects} />
      </section>

      {/* Section 02: Experience Preview */}
      <section className="w-full max-w-3xl mx-auto px-6 pb-18">
        <SectionHeader
          number="02"
          label="Project Experience"
          action={{ to: "/experience", label: "View details" }}
        />
        <ExperienceTimeline items={experience.slice(0, 4)} showMeta={true} />
      </section>

      {/* Section 03: Tech Stack */}
      <section className="w-full max-w-3xl mx-auto px-6 pb-18">
        <SectionHeader
          number="03"
          label="Basic Skills"
          action={{ to: "/stack", label: "View all" }}
        />
        <TechStack groups={techStack} />
      </section>

      {/* Section 04: Certifications */}
      <section className="w-full max-w-3xl mx-auto px-6 pb-18">
        <SectionHeader
          number="04"
          label="Certifications"
          action={{ to: "/certifications", label: "View all" }}
        />
        <Certifications items={certifications.slice(0, 4)} />
      </section>

      <section className="w-full max-w-3xl mx-auto px-6 pb-18">
        <SectionHeader number="05" label="Education" />
        <ExperienceTimeline items={education} showMeta={true} />
      </section>

      {/* Section 06: Contact */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </>
  );
}
