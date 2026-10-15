# Syeda Momna Batool — Portfolio

Personal portfolio of a software engineer working mainly on the backend (PHP, Laravel, MySQL), with an MRes in Artificial Intelligence.

Live site: https://syedamomnabatool.vercel.app

## Stack

- React 18, React Router and Vite
- GSAP (ScrollTrigger, ScrollSmoother, DrawSVG, Draggable) for motion, smooth scrolling, the sideways project gallery, hand-drawn doodles and the draggable sticky notes
- Plain CSS with design tokens and six paper-and-ink themes
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
| At-a-glance sticky notes | `src/data/highlights.js` |
| Theme sound | `public/audio/ui/theme.mp3` (path in `src/lib/sound.js`) |
| Background music | `public/audio/background.mp3` |
| CV | `public/documents/syedamomnabatool.pdf` |

### Add a project

Copy any folder in `src/projects`, rename it, edit its `index.js` and set `order`. Drop a `cover.webp` (about 1280px wide) in the folder and import it like the others. It appears in the gallery and gets its own page at `/projects/<slug>`.

### Add something to The Nook

Add an entry to `src/nook/items.js` with a title, description and URL.

### Change the theme sound

Replace `public/audio/ui/theme.mp3` with your own, keeping the same name (or change the path in `src/lib/sound.js`). Browsers only allow sound after the first click or key press.

### Add a theme

Add an entry to `src/theme/themes.js` and a matching `[data-theme="..."]` block in `src/theme/themes.css`. Each theme is a paper colour, an ink colour and four sticky-note colours.

## Accessibility and performance

- Every animation, the doodles, the hello screen's word cycling and smooth scrolling switch off when the visitor's system asks for reduced motion.
- The doodles, the custom cursor and the theme sound are decorative. The cursor only appears with a mouse or trackpad, and everything works without sound and from the keyboard.

## Contact

- Email: smomnabatool@gmail.com
- LinkedIn: https://www.linkedin.com/in/momna-batool/
- GitHub: https://github.com/MomnaBukhari
