// Every folder in src/projects is one project. This file collects them.
//
// To add a project: copy a folder (for example ./do-do), rename it, edit its
// index.js, and optionally drop a cover.webp (about 1280px wide) inside it.
// It appears on the home page and gets its own page at /projects/<slug>.

const modules = import.meta.glob("./*/index.js", { eager: true });

export const projects = Object.values(modules)
  .map((module) => module.default)
  .sort((a, b) => a.order - b.order);

export const getProject = (slug) => projects.find((project) => project.slug === slug);

/** The project after this one, wrapping round to the first. */
export const getNextProject = (slug) => {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
};
