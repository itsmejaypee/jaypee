import React from "react";
import { PageHeader } from "../components/SectionHeader";
import Certifications from "../components/Certifications";
import { certifications } from "../data/portfolioData";

export default function CertificationsPage() {
  return (
    <section className="w-full max-w-3xl mx-auto px-6 py-10 md:py-14">
      <PageHeader
        title="Certifications"
        description="My DICT certificate of participation in Safer Internet Day: Cybersecurity for Everyone."
      />
      <Certifications items={certifications} />
    </section>
  );
}
