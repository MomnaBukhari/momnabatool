import cover from "./cover.webp";

export default {
  slug: "muslim-match-makers",
  order: 2,
  title: "Muslim Match Makers",
  tagline: "Laravel APIs behind a matchmaking mobile app",
  type: "Professional",
  context: "Rev9 Solutions",
  period: "2024 – 2025",
  role: "Backend developer and database manager",
  stack: ["Laravel", "PHP", "MySQL", "REST APIs", "AWS Lambda", "Amazon S3"],
  overview:
    "A marriage-focused matchmaking platform with a Flutter mobile app. I built the Laravel REST APIs the app runs on and managed its database, working day to day with the Flutter developers and an AI/ML team.",
  highlights: [
    "REST APIs in Laravel for the Flutter mobile app.",
    "Integrated Laravel controllers with AWS Lambda functions, and used S3.",
    "Token-based authentication, role-based access control, OTP and ID verification.",
    "Multi-step forms with progress tracking, so people resume from their last step.",
    "Premium membership logic.",
    "Profile display rules: profiles served in batches of 10, with no repeats within 24 hours.",
    "Caching, indexing and query optimisation.",
    "Jobs, queues, events and scheduled tasks.",
  ],
  links: { live: "https://muslim-matchmakers.com/" },
  cover: { src: cover, alt: "Muslim Match Makers home page", width: 1280, height: 581 },
};
