// The CVs on the /cv page. The PDFs live in public/documents/cv/.
// To update them: edit cv-source/build_cvs.py and run it (see the README),
// or simply replace a PDF and its preview image, keeping the same file names.

const base = "/documents/cv/syeda-momna-batool";

export const cvs = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    note: "the all-rounder",
    summary: "Backend first, with frontend and my MRes in AI alongside. A good fit for most software roles.",
    pdf: `${base}-software-engineer-cv.pdf`,
    preview: `${base}-software-engineer-cv.png`,
  },
  {
    id: "backend-engineer",
    title: "Backend Engineer",
    note: "APIs, data, security",
    summary: "Leads with the APIs, data models, security and performance work behind the products I've built.",
    pdf: `${base}-backend-engineer-cv.pdf`,
    preview: `${base}-backend-engineer-cv.png`,
  },
  {
    id: "php-developer",
    title: "PHP Developer",
    note: "PHP and Laravel",
    summary: "Everything I've built in PHP: Laravel APIs and dashboards, Blade, WordPress and MySQL.",
    pdf: `${base}-php-developer-cv.pdf`,
    preview: `${base}-php-developer-cv.png`,
  },
];

export const allCvsZip = `${base}-cvs.zip`;
