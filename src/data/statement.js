// The personal statement page (/statement). Edit freely: it's in your words.
// Every paragraph is one short chapter; `title` is the small label beside it.

export const statement = {
  title: "Personal statement",
  intro: "Who I am, how I work, and what I'm looking for next, in my own words.",
  chapters: [
    {
      title: "Where I started",
      text: "I'm a software engineer with almost five years of experience, mostly on the backend in PHP, Laravel and MySQL. I joined AH Media & Marketing as an intern in 2021 and grew into a Software Engineer there over three years, building backends, REST APIs and WordPress sites for client projects. I then joined Rev9 Solutions, where I built the Laravel APIs behind the Muslim Match Makers app and was the only engineer on ScanPass.",
    },
    {
      title: "How I work",
      text: "I like owning a problem from end to end. On ScanPass that meant every technical decision, from the first data model to deployment. On Muslim Match Makers it meant working day to day with Flutter developers and an AI/ML team on an API everyone could build on. I think about security, data and performance from the start: who is allowed to do what, how the data is shaped, and which work should happen in the background.",
    },
    {
      title: "What research taught me",
      text: "In 2025 I began an MRes in Artificial Intelligence at the University of Greater Manchester, and completed it with Distinction. My dissertation compared multilingual and English-only sentiment analysis of Instagram fashion content. I planned the whole pipeline before writing any code, then built it as separate modules. It taught me to give the systems around a model the same care as the model itself.",
    },
    {
      title: "Beyond the code",
      text: "I volunteer as an AI Ambassador with InnovateHer, helping school students, girls especially, picture themselves in tech, and I'm supporting the University of Greater Manchester organising team on the “November to Remember” series with IEEE. I graduated first in my BS Information Technology year with a Gold Medal, and I still love sketching interfaces in Figma.",
    },
    {
      title: "What I'm looking for",
      text: "A role where I can build and own backend systems, with a team that cares about doing things properly. I'm based in Greater Manchester and happy on site, hybrid or remote.",
    },
  ],
  signOff: "Momna",
};

// The CV, shown beside the statement. The PDF and its preview live in public/documents/cv/.
// To update it, edit cv-source/build_cvs.py and run it, or replace both files keeping the names.
export const cv = {
  pdf: "/documents/cv/syeda-momna-batool-software-engineer-cv.pdf",
  preview: "/documents/cv/syeda-momna-batool-software-engineer-cv.png",
  fileName: "Syeda-Momna-Batool-CV.pdf",
};
