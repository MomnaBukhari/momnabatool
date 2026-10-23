// Most recent first.
// mains: the three or four things a reader should see first (icon: a name from
// the ICONS list in Experience.jsx). The full detail in `groups` opens on request.
// margin: a short handwritten note beside the role.

export const experience = [
  {
    company: "InnovateHer",
    role: "AI Ambassador",
    period: "2026 – present",
    location: "Greater Manchester, UK · Volunteer, in person",
    note: "Volunteer role alongside my work and studies",
    summary:
      "InnovateHer is working towards a world with no gender gap, starting with the tech industry. Its ambassadors are STEM professionals who go into schools to show teenagers, girls especially, what they can achieve in tech.",
    margin: "volunteer",
    mains: [
      { icon: "spark", text: "AI Assembly at North Chadderton School" },
      { icon: "talk", text: "AI Role Model Talk for students" },
      { icon: "school", text: "InnovateHer ambassador induction" },
    ],
    groups: [
      {
        title: "What I do",
        points: [
          "Deliver an AI Assembly and an AI Role Model Talk at North Chadderton School, in person, in November 2026.",
          "Share what working in software and studying AI is really like, so students can picture themselves there.",
        ],
      },
      {
        title: "How it works",
        points: [
          "Ambassadors take part in assemblies, role model talks, careers fairs and mock interviews, in person and online.",
          "Joined InnovateHer's ambassador induction course in October 2026.",
        ],
      },
    ],
    stack: ["AI literacy", "Public speaking", "STEM outreach"],
  },
  {
    company: "Rev9 Solutions",
    role: "Backend Developer",
    period: "Jun 2024 – Aug 2025",
    location: "Jhelum, Pakistan · Full-time, on-site",
    note: "Joined as an intern, Mar – May 2024",
    summary:
      "Production Laravel, PHP and MySQL systems for client products, released regularly and supported in production.",
    margin: "Appreciation Award, 2025",
    mains: [
      { icon: "mobile", text: "Laravel APIs for the Muslim Match Makers app" },
      { icon: "solo", text: "Sole engineer on ScanPass, design to deployment" },
      { icon: "shield", text: "Auth, roles, OTP and ID verification" },
      { icon: "cloud", text: "Laravel integrated with AWS Lambda and S3" },
    ],
    groups: [
      {
        title: "What I built",
        points: [
          "The Laravel REST APIs behind the Muslim Match Makers Flutter app, working with the Flutter developers and an AI/ML team.",
          "Integrations between Laravel controllers and AWS Lambda functions, and used S3.",
          "Token-based authentication, role-based access control, OTP and ID verification, and server-side validation.",
          "Caching, indexing and query optimisation, with background work handled by jobs, queues, events and scheduled tasks.",
          "ScanPass, as the sole engineer: system design, data modelling, API design and deployment.",
          "Inn'vision, delivered full stack alongside a product designer.",
          "Payment integration and webhooks, as a contributor alongside a senior developer.",
        ],
      },
      {
        title: "How I worked",
        points: [
          "Agile and Scrum, with requirements gathered directly from clients.",
          "Git and GitLab, senior code review, and a CI/CD-based release workflow with regular production releases.",
          "Postman test scripts alongside functional and manual testing.",
          "Logging and production troubleshooting.",
          "Received the Rev9 Solutions Appreciation Award in 2025.",
        ],
      },
    ],
    stack: ["PHP", "Laravel", "MySQL", "REST APIs", "AWS Lambda", "S3", "GitLab"],
  },
  {
    company: "AH Media & Marketing",
    role: "Software Engineer",
    period: "Jan 2021 – Jun 2024",
    location: "Jhelum, Pakistan · Hybrid, then remote",
    note: "Progressed from Software Engineering Intern",
    summary:
      "Client projects under a confidentiality agreement (MoU), so the specifics stay private.",
    margin: "intern to engineer",
    mains: [
      { icon: "code", text: "Backends in PHP and Laravel" },
      { icon: "plug", text: "REST APIs" },
      { icon: "wordpress", text: "WordPress sites" },
    ],
    groups: [
      {
        title: "What I built",
        points: [
          "Backends in PHP and Laravel.",
          "REST APIs.",
          "WordPress sites.",
        ],
      },
      {
        title: "How I worked",
        points: [
          "Full-time (hybrid) until February 2024, then part-time and remote until June 2024.",
        ],
      },
    ],
    stack: ["PHP", "Laravel", "REST APIs", "WordPress"],
  },
];
