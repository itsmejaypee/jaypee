import React from "react";
import { PageHeader } from "../components/SectionHeader";
import ExperienceTimeline from "../components/ExperienceTimeline";
import { experience } from "../data/portfolioData";

export default function ExperiencePage() {
  return (
    <section className="w-full max-w-3xl mx-auto px-6 py-10 md:py-14">
      <PageHeader
        title="Project Experience"
        description="My roles and responsibilities in two academic projects at ICCT Colleges."
      />
      <ExperienceTimeline items={experience} showMeta={true} />
    </section>
  );
}
