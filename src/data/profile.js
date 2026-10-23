// Everything about you that appears in more than one place.

export const profile = {
  name: "Syeda Momna Batool",
  firstName: "Momna",
  role: "Software Engineer",
  headline:
    "I build the backend of web and mobile products in PHP and Laravel: APIs, data models, and the logic that keeps them honest.",
  summary:
    "Almost five years in production teams, an MRes in Artificial Intelligence, and a soft spot for things that feel lovely to use. Based in Greater Manchester, UK.",
  location: "Greater Manchester, UK",
  email: "smomnabatool@gmail.com",
  links: {
    github: "https://github.com/MomnaBukhari",
    linkedin: "https://www.linkedin.com/in/momna-batool/",
  },
  // The page that shows all three CVs. The CVs themselves are listed in src/data/cvs.js.
  cv: "/cv",
  // Formspree endpoint used by the contact form.
  formEndpoint: "https://formspree.io/f/mzzdzovg",
};

export const about = {
  // The one line people should remember.
  lead: "I'm a creative software engineer, mostly on the backend, and I've worked across the whole lifecycle: requirements, data models, APIs, interfaces, releases and fixing things in production.",
  // Three short chapters instead of long paragraphs. icon: a name from the ICONS list in About.jsx.
  chapters: [
    {
      icon: "briefcase",
      when: "2024 – 2025",
      title: "Rev9 Solutions",
      text: "Built the Laravel APIs behind Muslim Match Makers' Flutter app with the mobile and AI/ML teams, and was the only engineer on ScanPass.",
    },
    {
      icon: "code",
      when: "2021 – 2024",
      title: "AH Media & Marketing",
      text: "Over three years on client projects under a confidentiality agreement, growing from intern to Software Engineer.",
    },
    {
      icon: "flask",
      when: "2025 – 2026",
      title: "MRes Artificial Intelligence",
      text: "Added Python and applied NLP. I'm a backend engineer first; the research taught me to build the pipeline around a model with the same care.",
    },
  ],
  // The index card beside About. Everything from the old "At a glance" wall lives here now.
  facts: [
    { term: "Focus", detail: "Backend engineering: PHP, Laravel, MySQL and REST APIs" },
    { term: "Also", detail: "React, JavaScript, Python, and Figma for sketching ideas" },
    { term: "Experience", detail: "Almost 5 years, building, releasing and supporting production systems" },
    { term: "Proudest", detail: "Sole engineer on ScanPass; the Laravel APIs behind Muslim Match Makers" },
    { term: "Education", detail: "MRes AI with Distinction, University of Greater Manchester. BS IT, Gold Medal, GPA 3.79" },
    { term: "Certified", detail: "AWS Academy: Cloud Foundations, and Machine Learning for NLP" },
    { term: "Based in", detail: "Greater Manchester, UK. Happy on site, hybrid or remote" },
  ],
  // A few true things about life outside the day job.
  beyond: [
    "Gold medallist, 1st in my BS Information Technology year.",
    "Tutored programming, databases, OOP and project management one to one during my degree.",
    "AI Ambassador with InnovateHer, bringing AI into school assemblies and role model talks.",
    "Supporting the University of Greater Manchester organising team on the “November to Remember” series with IEEE.",
    "Off the clock: fashion illustration and mehndi.",
  ],
};

// The sections linked from the navigation, in page order. The navigation shows
// the ones without `inNav: false` and uses the full list to know where you are.
// (The order they render in is set in src/pages/Home.jsx.)
export const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "research", label: "Research" },
  { id: "education", label: "Education", inNav: false },
  { id: "recommendations", label: "Kind words", inNav: false },
  { id: "contact", label: "Contact" },
];

// The cozy page for small, fun experiments. Rename it here and the nav updates.
export const nook = {
  path: "/nook",
  label: "The Nook",
  title: "The Nook",
  intro:
    "A cozy little corner for the small, silly, lovely things I make when no one's asked me to. Pull up a cushion.",
};
