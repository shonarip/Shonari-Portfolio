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
    { label: "Manga", href: "#manga" },
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
      title: "Sunset Beach",
      year: "2025",
      role: "Event Poster & Art Direction",
      description:
        "A maximalist summer event poster — tropical florals, halftone texture, and bold display type locked into a split layout for print and social.",
      tags: ["Poster", "Typography", "Illustration"],
      href: "https://shonarip.myportfolio.com/",
      image: "/work/sunset-beach.png",
    },
    {
      title: "Chroma Blooms",
      year: "2025",
      role: "Graphic Series",
      description:
        "Floral poster explorations with chroma, hero blooms, and print-inspired halftone — built as a flexible visual system for campaign tiles.",
      tags: ["Print", "Texture", "Campaign"],
      href: "https://shonarip.myportfolio.com/",
      image: "/work/floral-poster.png",
    },
    {
      title: "Professional Production",
      year: "2022",
      role: "Commercial Design",
      description:
        "Client-facing production work including Presidential Touch Detailing — high-contrast promotional design for local service brands.",
      tags: ["Flyer", "Brand", "Production"],
      href: "https://shonarip.myportfolio.com/",
      image: "/work/prez-wash.jpg",
    },
    {
      title: "Floral Fields",
      year: "2025",
      role: "Pattern & Background Design",
      description:
        "Full-scatter botanical backgrounds — airy pastel hibiscus and plumeria fields for portfolio tiles and poster underlays.",
      tags: ["Pattern", "Illustration", "Brand"],
      href: "https://shonarip.myportfolio.com/",
      image: "/work/floral-bg.png",
    },
{
      title: "Connection",
      year: "2024",
      role: "Manga Edit",
      description:
        "A personal manga edit exploring charged proximity and emotional tension through color and crop.",
      tags: ["Manga", "Edit", "Personal"],
      href: "#",
      image: "/work/manga2/Connection.jpg",
    },
    {
      title: "Love Figures",
      year: "2024",
      role: "Manga Edit",
      description:
        "Figure-focused edit with soft intimacy and graphic framing.",
      tags: ["Manga", "Edit", "Personal"],
      href: "#",
      image: "/work/manga2/Love_Figures.jpg",
    },
    {
      title: "Two Face Girl",
      year: "2024",
      role: "Manga Edit",
      description:
        "Duality and identity — a split-persona manga composition.",
      tags: ["Manga", "Edit", "Personal"],
      href: "#",
      image: "/work/manga2/Two_facegirl.jpg",
    },
    {
      title: "Forever Lost",
      year: "2024",
      role: "Manga Edit",
      description:
        "Moody atmosphere and longing, tuned for a darker emotional register.",
      tags: ["Manga", "Edit", "Personal"],
      href: "#",
      image: "/work/manga2/Forever_lost.jpg",
    },
    {
      title: "Blue Hues",
      year: "2024",
      role: "Manga Edit",
      description:
        "Cool-toned palette study — blue washes over sharp character linework.",
      tags: ["Manga", "Edit", "Personal"],
      href: "#",
      image: "/work/manga2/Blue_Hues.jpg",
    },
    {
      title: "Kojiro",
      year: "2024",
      role: "Manga Edit",
      description:
        "Character edit with dramatic lighting and kinetic framing.",
      tags: ["Manga", "Edit", "Personal"],
      href: "#",
      image: "/work/manga2/Kojiro.jpg",
    },
    {
      title: "Zoro",
      year: "2024",
      role: "Manga Edit",
      description:
        "Bold One Piece-inspired edit with high-contrast grit.",
      tags: ["Manga", "Edit", "Personal"],
      href: "#",
      image: "/work/manga2/zoro.jpg",
    },
    {
      title: "Soul of Japan",
      year: "2024",
      role: "Manga Edit",
      description:
        "Cultural mood piece — atmosphere, texture, and quiet intensity.",
      tags: ["Manga", "Edit", "Personal"],
      href: "#",
      image: "/work/manga2/Soul_of_japan.jpg",
    },
    {
      title: "Sicko",
      year: "2024",
      role: "Manga Edit",
      description:
        "The classic Sicko edit — dark, emotional, and signature to the series.",
      tags: ["Manga", "Edit", "Personal"],
      href: "#",
      image: "/work/manga2/Sicko.jpg",
    },
    {
      title: "Ronin",
      year: "2024",
      role: "Manga Edit",
      description:
        "Lone-warrior energy — stark composition and cinematic grade.",
      tags: ["Manga", "Edit", "Personal"],
      href: "#",
      image: "/work/manga2/Ronin.jpg",
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
