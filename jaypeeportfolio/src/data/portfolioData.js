// Portfolio content, verified account links, and supplied photographs.
export const personalInfo = {
  name: "Ron Jaypee V. Matienzo",
  title: "Computer Engineering Student",
  location: "Jala Jala, Rizal, Philippines",
  address: "211 Sitio Dunggot, Punta, Jala Jala, Rizal",
  email: "jaypeematienzo5@gmail.com",
  phone: "+639120783017",
  bioParagraphs: [
    "I'm a Computer Engineering student at the Institute of Creative Computer Technology (ICCT), with basic skills in programming, JavaScript, UI/UX design, and embedded systems.",
    "My academic projects include NutriTrack and Embedded Systems: Medicare, where I prepared technical documentation, defined system requirements, and collaborated with team members."
  ],
  avatarLight: "/assets/jaypee-profile.jpg",
  avatarDark: "/assets/jaypee-profile.jpg"
};

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/itsmejaypee", className: "social-github", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/matienzoronjaypee", className: "bg-bg text-text", icon: "linkedin" },
  { label: "Résumé", href: "/resume", className: "bg-accent text-white", icon: "resume" }
];

export const projects = [
  {
    id: 2,
    name: "NutriTrack",
    description: "An object oriented programming project at ICCT Colleges. As System Analyst and Technical Documentation Lead, I documented system features, class structures, program specifications, and functional requirements.",
    preview: "/assets/nutritrack.jpg",
    images: ["/assets/nutritrack.jpg"],
    imageFit: "contain",
    tags: ["Basic Programming", "System Analysis", "Technical Documentation"],
    period: "Aug 2025 - Nov 2025",
    duration: "Aug - Nov 2025",
    role: "System Analyst · Technical Documentation Lead",
    institution: "ICCT Colleges",
    responsibilities: [
      "Prepared project documentation and system reports.",
      "Documented system features, class structures, and program specifications.",
      "Defined functional requirements and project objectives.",
      "Collaborated with team members to ensure accurate documentation."
    ],
    glow: "#65b264",
    featured: true
  },
  {
    id: 1,
    name: "Embedded Systems: Medicare",
    description: "An embedded systems project at ICCT Colleges. As Systems Developer, I prepared technical reports, documented the system architecture and hardware components, and defined project requirements and objectives.",
    preview: "/assets/medicare.jpg",
    images: ["/assets/medicare.jpg"],
    imageFit: "contain",
    tags: ["Embedded Systems", "System Architecture", "Technical Documentation"],
    period: "March 2026 - July 2026",
    duration: "Mar - Jul 2026",
    role: "Systems Developer",
    institution: "ICCT Colleges",
    responsibilities: [
      "Prepared technical documentation and project reports.",
      "Documented system architecture, hardware components, and specifications.",
      "Defined system requirements and project objectives.",
      "Coordinated with team members to ensure accurate documentation."
    ],
    glow: "#e4a82b",
    featured: true
  }
];

export const experience = [projects[1], projects[0]].map(project => ({
  id: project.id,
  project: project.name,
  role: project.role,
  institution: project.institution,
  period: project.period,
  responsibilities: project.responsibilities,
  year: project.id === 1 ? 2026 : 2025,
  active: false
}));

export const education = [
  {
    id: "icct",
    role: "Institute of Creative Computer Technology (ICCT)",
    institution: "Computer Engineering",
    period: "2023 - Present",
    description: "ICCT Building, V.V. Soliven Avenue II, Brgy. San Isidro, Cainta, Rizal, Philippines.",
    year: "2023",
    active: true
  },
  {
    id: "gms",
    role: "Greenfield Montessori School - Tanay Main Campus",
    institution: "Science, Technology, Engineering & Mathematics (STEM)",
    period: "2022 - 2023",
    description: "East Rodriguez Avenue, Katipunan, Tanay, Rizal.",
    year: "2022",
    active: false
  }
];

export const techStack = [
  { category: "Programming & Design", tools: ["Basic Programming", "JavaScript", "UI/UX Design"] },
  { category: "Embedded Systems", tools: ["Embedded Systems"] },
  { category: "Productivity & CAD", tools: ["Microsoft Word", "Microsoft Excel", "Basic AutoCAD 2D", "Basic AutoCAD 3D", "Electrical Plan"] },
  { category: "Mechanical", tools: ["Mechanical Machine Troubleshooting"] }
];

export const certifications = [{
  title: "Safer Internet Day: Cybersecurity for Everyone",
  issuer: "DICT CALABARZON Regional Office",
  description: "Certificate of Participation",
  date: "February 10, 2026",
  certificateId: "DICTR4A-2026-0210-009",
  image: "/assets/dict-certificate.jpg"
}];

export const navLinks = [
  { label: "Projects", to: "/projects" },
  { label: "Project Experience", to: "/experience" },
  { label: "Basic Skills", to: "/stack" },
  { label: "Certifications", to: "/certifications" }
];
