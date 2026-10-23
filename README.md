# Syeda Momna Batool — Portfolio

Personal portfolio of a software engineer working mainly on the backend (PHP, Laravel, MySQL), with an MRes in Artificial Intelligence.

Live site: https://syedamomnabatool.vercel.app

## Stack

- React 18, React Router and Vite
- GSAP (ScrollTrigger, ScrollSmoother, DrawSVG, Draggable) for motion, smooth scrolling, the sideways project gallery, hand-drawn doodles and the draggable sticky notes
- Plain CSS with design tokens and twelve full-mood themes, each with its own hero scene and drifting particles
- Inter, Kalam (handwriting) and JetBrains Mono (the code window), self-hosted via Fontsource
- Tech logos from Simple Icons (via react-icons)

## Getting started

```bash
npm install
npm run dev      # local development
npm run build    # production build in dist/
npm run preview  # serve the production build
npm run lint
```

## Where things live

| What | Where |
| --- | --- |
| Your details, About text, section list, The Nook's name | `src/data/profile.js` |
| Work history | `src/data/experience.js` |
| Skills | `src/data/skills.js` |
| MRes research | `src/data/research.js` |
| Education, certifications, awards, activities | `src/data/education.js` |
| Recommendations | `src/data/recommendations.js` |
| Projects (one folder each) | `src/projects/<name>/index.js` (+ optional `cover.webp`) |
| Things on The Nook page | `src/nook/items.js` |
| Colour themes | `src/theme/themes.js` and `src/theme/themes.css` |
| The hello screen and its languages | `src/components/loader/Loader.jsx` (`GREETINGS`) |
| The code in the hero's editor window | `src/components/hero/CodeWindow.jsx` (`LINES`) |
| The custom cursor and its shapes | `src/components/cursor/Cursor.jsx` and `Cursor.css` |
| Hand-drawn doodles (underline, arrow, flower…) | `src/components/doodles/Doodle.jsx` |
| Logos and icons next to each skill | `src/lib/techIcons.jsx` |
| Themes: names, moods and particle effects | `src/theme/themes.js` (colours in `themes.css`) |
| Each theme's hero scene | `src/components/hero/HeroScene.jsx` and `HeroScene.css` |
| The drifting particles (leaves, snow, petals…) | `src/components/ambience/` |
| The side rail (themes, effects, full screen, music, sound) | `src/components/layout/SideRail.jsx` |
| The storybook of recommendations | `src/components/sections/Recommendations.jsx` (text in `src/data/recommendations.js`) |
| Theme sound | `public/audio/ui/theme.mp3` (path in `src/lib/sound.js`) |
| Background music | `public/audio/background.mp3` |
| The three CVs (PDFs, previews and a zip of all three) | `public/documents/cv/`, listed in `src/data/cvs.js`, shown at `/cv` |
| CV text, to edit and rebuild | `cv-source/build_cvs.py` |

### Add a project

Copy any folder in `src/projects`, rename it, edit its `index.js` and set `order`. Drop a `cover.webp` (about 1280px wide) in the folder and import it like the others. It appears in the gallery and gets its own page at `/projects/<slug>`.

### Update a CV

Edit the text in `cv-source/build_cvs.py` and run `python cv-source/build_cvs.py`. It writes an HTML version of each CV into `cv-source/` and, if Playwright for Python is installed, the PDFs and preview images into `public/documents/cv/`. Without Playwright, open the HTML file in Chrome and use Print, then Save as PDF. Rebuild the zip of all three afterwards.

### Add something to The Nook

Add an entry to `src/nook/items.js` with a title, description and URL.

### Change the theme sound

Replace `public/audio/ui/theme.mp3` with your own, keeping the same name (or change the path in `src/lib/sound.js`). Browsers only allow sound after the first click or key press.

### Add a theme

Add an entry to `src/theme/themes.js` (name, mood, preview colours and its particle `effect`), a matching `[data-theme="..."]` block in `src/theme/themes.css`, and optionally a scene for it in `HeroScene.jsx`. Also add its id to the list in `index.html`, which sets the theme before the page paints.

## Accessibility and performance

- Every animation, the doodles, the hello screen's word cycling and smooth scrolling switch off when the visitor's system asks for reduced motion.
- The doodles, particles, custom cursor and theme sound are decorative; particles can be switched off from the side rail. The cursor only appears with a mouse or trackpad, and everything works without sound and from the keyboard.

## Contact

- Email: smomnabatool@gmail.com
- LinkedIn: https://www.linkedin.com/in/momna-batool/
- GitHub: https://github.com/MomnaBukhari
