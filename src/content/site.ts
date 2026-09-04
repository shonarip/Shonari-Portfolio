export const site = {
  name: "Shonari Phillips",
  title: "Designer & Creative Technologist",
  tagline:
    "Crafting thoughtful digital experiences where clarity, craft, and curiosity meet.",
  email: "hello@shonariphillips.com",
  location: "New York, NY",
  nav: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],
  about: {
    heading: "About",
    paragraphs: [
      "I'm Shonari Phillips — a design-minded builder who cares about how products feel as much as how they function. I work at the intersection of visual systems, interaction design, and front-end engineering.",
      "My practice blends strategic thinking with meticulous craft: from early concept sketches to polished interfaces that hold up in the real world. I believe good design is quiet confidence — clear hierarchy, generous space, and intentional motion.",
      "When I'm not shaping interfaces, you'll find me exploring typography, photographing city light, or refining a side project until it sings.",
    ],
  },
  projects: [
    {
      title: "Lumen Studio",
      year: "2025",
      role: "Product Design & Front-end",
      description:
        "A calm workspace for creative teams — redesigned information architecture, refined visual language, and a responsive marketing site.",
      tags: ["Next.js", "Design Systems", "Brand"],
      href: "#",
    },
    {
      title: "Northline",
      year: "2024",
      role: "UX & Interaction Design",
      description:
        "End-to-end experience for a logistics dashboard: clearer workflows, accessible data density, and motion that guides without noise.",
      tags: ["UX Research", "Prototyping", "Accessibility"],
      href: "#",
    },
    {
      title: "Atelier Press",
      year: "2024",
      role: "Art Direction",
      description:
        "Editorial identity and digital presence for an independent publisher — typography-led layouts with a warm, tactile palette.",
      tags: ["Identity", "Editorial", "Web"],
      href: "#",
    },
    {
      title: "Signal Kit",
      year: "2023",
      role: "Creative Technology",
      description:
        "An open toolkit for expressive UI experiments — modular components, subtle animation primitives, and documentation that teaches.",
      tags: ["React", "Motion", "Open Source"],
      href: "#",
    },
  ],
  skills: {
    heading: "Skills",
    groups: [
      {
        title: "Design",
        items: [
          "Product & UX design",
          "Visual systems",
          "Prototyping",
          "Art direction",
          "Typography",
        ],
      },
      {
        title: "Engineering",
        items: [
          "React / Next.js",
          "TypeScript",
          "Tailwind CSS",
          "Accessible UI",
          "Design tokens",
        ],
      },
      {
        title: "Process",
        items: [
          "Workshops & critique",
          "Systems thinking",
          "Content strategy",
          "Collaboration",
          "Iteration",
        ],
      },
    ],
  },
  contact: {
    heading: "Let's build something thoughtful",
    body: "Have a project in mind, or just want to say hello? I'd love to hear from you.",
    cta: "Send a message",
  },
  social: [
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "GitHub", href: "https://github.com" },
    { label: "Email", href: "mailto:hello@shonariphillips.com" },
  ],
} as const;

export type SiteContent = typeof site;
