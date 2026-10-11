import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, ChevronRight, FileText } from "lucide-react";
import { personalInfo, socialLinks } from "../data/portfolioData";

export const fadeInVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

function SocialIcon({ name }) {
  if (name === "resume") return <FileText size={16} />;
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    {name === "github" ? <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.24c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.6-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.31c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" /> : <><rect x="1" y="1" width="22" height="22" rx="2" /><path fill="var(--bg)" d="M5 9h3v10H5zm1.5-5a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM10 9h3v1.4c.5-.9 1.5-1.6 3-1.6 3 0 3 2.6 3 4.5V19h-3v-5c0-1.3 0-2.6-1.5-2.6S13 12.7 13 14v5h-3Z" /></>}
  </svg>;
}

// Verified badge icon SVG
function VerifiedBadge() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className="size-4 shrink-0"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.5924 3.20027C9.34888 3.4078 9.22711 3.51158 9.09706 3.59874C8.79896 3.79854 8.46417 3.93721 8.1121 4.00672C7.95851 4.03705 7.79903 4.04977 7.48008 4.07522C6.6787 4.13918 6.278 4.17115 5.94371 4.28923C5.17051 4.56233 4.56233 5.17051 4.28923 5.94371C4.17115 6.278 4.13918 6.6787 4.07522 7.48008C4.04977 7.79903 4.03705 7.95851 4.00672 8.1121C3.93721 8.46417 3.79854 8.79896 3.59874 9.09706C3.51158 9.22711 3.40781 9.34887 3.20027 9.5924C2.67883 10.2043 2.4181 10.5102 2.26522 10.8301C1.91159 11.57 1.91159 12.43 2.26522 13.1699C2.41811 13.4898 2.67883 13.7957 3.20027 14.4076C3.40778 14.6511 3.51158 14.7729 3.59874 14.9029C3.79854 15.201 3.93721 15.5358 4.00672 15.8879C4.03705 16.0415 4.04977 16.201 4.07522 16.5199C4.13918 17.3213 4.17115 17.722 4.28923 18.0563C4.56233 18.8295 5.17051 19.4377 5.94371 19.7108C6.278 19.8288 6.6787 19.8608 7.48008 19.9248C7.79903 19.9502 7.95851 19.963 8.1121 19.9933C8.46417 20.0628 8.79896 20.2015 9.09706 20.4013C9.22711 20.4884 9.34887 20.5922 9.5924 20.7997C10.2043 21.3212 10.5102 21.5819 10.8301 21.7348C11.57 22.0884 12.43 22.0884 13.1699 21.7348C13.4898 21.5819 13.7957 21.3212 14.4076 20.7997C14.6511 20.5922 14.7729 20.4884 14.9029 20.4013C15.201 20.2015 15.5358 20.0628 15.8879 19.9933C16.0415 19.963 16.201 19.9502 16.5199 19.9248C17.3213 19.8608 17.722 19.8288 18.0563 19.7108C18.8295 19.4377 19.4377 18.8295 19.7108 18.0563C19.8288 17.722 19.8608 17.3213 19.9248 16.5199C19.9502 16.201 19.963 16.0415 19.9933 15.8879C20.0628 15.5358 20.2015 15.201 20.4013 14.9029C20.4884 14.7729 20.5922 14.6511 20.7997 14.4076C21.3212 13.7957 21.5819 13.4898 21.7348 13.1699C22.0884 12.43 22.0884 11.57 21.7348 10.8301C21.5819 10.5102 21.3212 10.2043 20.7997 9.5924C20.5922 9.34887 20.4884 9.22711 20.4013 9.09706C20.2015 8.79896 20.0628 8.46417 19.9933 8.1121C19.963 7.95851 19.9502 7.79903 19.9248 7.48008C19.8608 6.6787 19.8288 6.278 19.7108 5.94371C19.4377 5.17051 18.8295 4.56233 18.0563 4.28923C17.722 4.17115 17.3213 4.13918 16.5199 4.07522C16.201 4.04977 16.0415 4.03705 15.8879 4.00672C15.5358 3.93721 15.201 3.79854 14.9029 3.59874C14.7729 3.51158 14.6511 3.40781 14.4076 3.20027C13.7957 2.67883 13.4898 2.41811 13.1699 2.26522C12.43 1.91159 11.57 1.91159 10.8301 2.26522C10.5102 2.4181 10.2043 2.67883 9.5924 3.20027ZM16.3735 9.86314C16.6913 9.5453 16.6913 9.03 16.3735 8.71216C16.0557 8.39433 15.5403 8.39433 15.2225 8.71216L10.3723 13.5624L8.77746 11.9676C8.45963 11.6498 7.94432 11.6498 7.62649 11.9676C7.30866 12.2854 7.30866 12.8007 7.62649 13.1186L9.79678 15.2889C10.1146 15.6067 10.6299 15.6067 10.9478 15.2889L16.3735 9.86314Z"
        fill="#49ADF4"
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <header className="w-full max-w-3xl mx-auto px-6 pt-14 pb-18">
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        {/* Profile Avatar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          custom={0}
          variants={fadeInVariants}
          className="size-32 md:size-72 shrink-0 mx-auto md:mx-0"
        >
          <img
            src={personalInfo.avatarLight}
            alt={personalInfo.name}
            width={288}
            height={288}
            fetchPriority="high"
            className="size-32 md:size-72 rounded-full border-2 border-accent object-cover dark:hidden"
          />
          <img
            src={personalInfo.avatarDark}
            alt={personalInfo.name}
            width={288}
            height={288}
            fetchPriority="high"
            className="size-32 md:size-72 rounded-full border-2 border-accent object-cover hidden dark:block"
          />
        </motion.div>

        {/* Bio Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              custom={0.08}
              variants={fadeInVariants}
            >
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h1 className="text-xl md:text-2xl font-bold text-text">
                  {personalInfo.name}
                </h1>
                <VerifiedBadge />
              </div>
              <p className="text-sm text-text-muted mt-2">{personalInfo.title}</p>
              <div className="flex items-center justify-center md:justify-start gap-1.5 text-text-muted text-xs md:text-sm mt-1 md:mt-2">
                <MapPin size={12} className="shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            custom={0.16}
            variants={fadeInVariants}
            className="max-w-100 md:max-w-none mx-auto md:mx-0 text-text-muted text-sm mt-5 space-y-4"
          >
            {personalInfo.bioParagraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            custom={0.24}
            variants={fadeInVariants}
            className="social-links flex items-center justify-center md:justify-start gap-3 mt-6"
          >
            {socialLinks.map((link) => {
              const ButtonLink = link.icon === "resume" ? Link : "a";
              const linkProps = link.icon === "resume" ? { to: link.href } : { href: link.href, target: "_blank", rel: "noopener noreferrer" };
              return (
              <ButtonLink
                key={link.label}
                {...linkProps}
                className={`inline-flex items-center gap-2 rounded-md shadow-sm px-4 py-2 text-xs transition-all duration-base ease-out hover:opacity-90 hover:-translate-y-0.5 ${link.className}`}
              >
                <SocialIcon name={link.icon} />
                <span>{link.label}</span>
                <ChevronRight size={16} className="hidden md:block" />
              </ButtonLink>
            );})}
          </motion.div>
        </div>
      </div>
    </header>
  );
}
