import React, { useState } from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { fadeInVariants } from "./Hero";
import ImageLightbox from "./ImageLightbox";

// Animated layered certificate icon on hover
function CertificateIcon() {
  return (
    <div className="relative h-10 w-8 shrink-0" aria-hidden="true">
      {/* Back layer rotated on hover */}
      <span className="absolute inset-0 rounded-md border border-accent bg-accent/10 opacity-0 transition-all duration-base ease-out motion-reduce:transition-none group-hover:-translate-x-1.5 group-hover:-translate-y-0.5 group-hover:-rotate-6 group-hover:opacity-100" />
      {/* Front layer */}
      <span className="absolute inset-0 flex items-center justify-center rounded-md border border-border bg-bg text-text-faint transition-all duration-base ease-out motion-reduce:transition-none group-hover:-translate-y-0.5 group-hover:border-accent group-hover:text-accent">
        <Award size={14} />
        <i className="absolute bottom-2.5 left-2 h-0.5 w-4 rounded-full bg-accent opacity-0 transition-opacity duration-base ease-out motion-reduce:transition-none group-hover:opacity-70" />
        <i className="absolute bottom-1.5 left-2 h-0.5 w-2.5 rounded-full bg-accent opacity-0 transition-opacity delay-75 duration-base ease-out motion-reduce:transition-none group-hover:opacity-70" />
      </span>
    </div>
  );
}

export default function Certifications({ items, staggerDelay = 0.08 }) {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
      {items.map((item, idx) => {
        return (
          <motion.button
            key={item.title}
            type="button"
            onClick={() => setSelectedCertificate(item)}
            aria-label={`View certificate: ${item.title}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            custom={idx * staggerDelay}
            variants={fadeInVariants}
            className="certificate-card group w-full text-left rounded-xl border border-border p-5 transition-colors duration-base ease-out hover:border-accent"
          >
            {item.image && <img src={item.image} alt={`${item.description} issued to Ron Jaypee V. Matienzo`} className="certificate-photo" loading="lazy" />}
            <div className="flex items-start gap-4">
            <CertificateIcon />
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-medium text-text">{item.title}</h3>
              <p className="text-text-muted text-xs mt-2">{item.description} · {item.date}</p>
              <p className="text-text-faint text-xs mt-2">Certificate ID: {item.certificateId}</p>
              <div className="flex items-center justify-between gap-3 mt-4">
                <span className="text-text-muted text-xs">{item.issuer}</span>
                  <ExternalLink
                    size={14}
                    className="shrink-0 text-text-faint transition-all duration-base ease-out motion-reduce:transition-none group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
              </div>
            </div>
            </div>
          </motion.button>
        );
      })}
    </div>
    <ImageLightbox
      images={selectedCertificate ? [selectedCertificate.image] : []}
      alt={selectedCertificate ? `${selectedCertificate.title} certificate` : "Certificate"}
      isOpen={!!selectedCertificate}
      onClose={() => setSelectedCertificate(null)}
    />
    </>
  );
}
