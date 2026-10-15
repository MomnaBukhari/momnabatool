// A logo (or a fitting icon) for every skill and tool named on the site.
// Brand logos come from Simple Icons, drawn in each brand's own colour.
// Ideas without a logo (like "Caching") get a Phosphor icon in your theme's ink.
//
// To add one: put the exact name used in src/data/*.js on the left.
// Anything missing here simply shows without an icon.

import {
  SiAmazons3,
  SiAwslambda,
  SiBootstrap,
  SiCanva,
  SiCplusplus,
  SiFigma,
  SiGit,
  SiGithub,
  SiGitlab,
  SiGreensock,
  SiHtml5,
  SiCss3,
  SiHuggingface,
  SiInstagram,
  SiJavascript,
  SiLaravel,
  SiMysql,
  SiNotion,
  SiNumpy,
  SiPandas,
  SiPhp,
  SiPhpstorm,
  SiPostman,
  SiPython,
  SiPytorch,
  SiReact,
  SiScikitlearn,
  SiScipy,
  SiSelenium,
  SiSlack,
  SiWordpress,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import {
  PiArrowsClockwise,
  PiBowlFood,
  PiBroadcast,
  PiBug,
  PiChartBar,
  PiChartLine,
  PiChatTeardropText,
  PiChatsCircle,
  PiCheckSquare,
  PiCircleNotch,
  PiClipboardText,
  PiClock,
  PiCube,
  PiIdentificationCard,
  PiKey,
  PiLayout,
  PiLightning,
  PiListMagnifyingGlass,
  PiLockKey,
  PiPaintBrush,
  PiPassword,
  PiPlugs,
  PiQueue,
  PiRocketLaunch,
  PiShieldCheck,
  PiStack,
  PiTable,
  PiTranslate,
  PiTreeStructure,
  PiTreeView,
  PiUsersThree,
} from "react-icons/pi";

const brand = (Icon, color) => ({ Icon, color });
const idea = (Icon) => ({ Icon, color: null });

const ICONS = {
  // Backend
  PHP: brand(SiPhp, "#777BB4"),
  Laravel: brand(SiLaravel, "#FF2D20"),
  "Laravel Blade": brand(SiLaravel, "#FF2D20"),
  WordPress: brand(SiWordpress, "#21759B"),
  "REST API design": idea(PiPlugs),
  "REST APIs": idea(PiPlugs),
  MySQL: brand(SiMysql, "#4479A1"),

  // Security and access
  "Token-based authentication": idea(PiKey),
  "Role-based access control": idea(PiUsersThree),
  "OTP verification": idea(PiPassword),
  "ID verification": idea(PiIdentificationCard),
  "Server-side validation": idea(PiShieldCheck),
  "Secure environment configuration": idea(PiLockKey),

  // Data and performance
  "Data modelling": idea(PiTreeStructure),
  "Schema design": idea(PiTable),
  Indexing: idea(PiListMagnifyingGlass),
  "Query optimisation": idea(PiLightning),
  Caching: idea(PiStack),

  // Background work and cloud
  "Jobs and queues": idea(PiQueue),
  Events: idea(PiBroadcast),
  "Scheduled tasks": idea(PiClock),
  "AWS Lambda integration": brand(SiAwslambda, "#FF9900"),
  "AWS Lambda": brand(SiAwslambda, "#FF9900"),
  "Amazon S3": brand(SiAmazons3, "#569A31"),
  S3: brand(SiAmazons3, "#569A31"),

  // Delivery and quality
  Git: brand(SiGit, "#F05032"),
  GitHub: brand(SiGithub, "#181717"),
  "Git and GitHub": brand(SiGithub, "#181717"),
  GitLab: brand(SiGitlab, "#FC6D26"),
  "Code review": idea(PiChatsCircle),
  "CI/CD-based release workflow": idea(PiRocketLaunch),
  "Postman test scripts": brand(SiPostman, "#FF6C37"),
  "Functional and manual testing": idea(PiCheckSquare),
  "Logging and production troubleshooting": idea(PiBug),

  // Frontend
  JavaScript: brand(SiJavascript, "#E8C400"),
  React: brand(SiReact, "#087EA4"),
  HTML: brand(SiHtml5, "#E34F26"),
  CSS: brand(SiCss3, "#1572B6"),
  Bootstrap: brand(SiBootstrap, "#7952B3"),
  GSAP: brand(SiGreensock, "#5A9E00"),

  // Python and NLP
  Python: brand(SiPython, "#3776AB"),
  "Python 3.13": brand(SiPython, "#3776AB"),
  pandas: brand(SiPandas, "#150458"),
  NumPy: brand(SiNumpy, "#013243"),
  NLTK: idea(PiTranslate),
  langdetect: idea(PiTranslate),
  "scikit-learn": brand(SiScikitlearn, "#F7931E"),
  PyTorch: brand(SiPytorch, "#EE4C2C"),
  "Hugging Face Transformers": brand(SiHuggingface, "#E0A100"),
  Transformers: brand(SiHuggingface, "#E0A100"),
  SciPy: brand(SiScipy, "#0054A6"),
  Matplotlib: idea(PiChartLine),
  Seaborn: idea(PiChartBar),
  Instaloader: brand(SiInstagram, "#E4405F"),
  Selenium: brand(SiSelenium, "#43B02A"),
  BeautifulSoup: idea(PiBowlFood),

  // Ways of working
  "Agile and Scrum": idea(PiArrowsClockwise),
  SDLC: idea(PiCircleNotch),
  "Requirements gathering": idea(PiClipboardText),
  "Client communication": idea(PiChatTeardropText),
  "Object-oriented programming": idea(PiCube),
  "Data structures": idea(PiTreeView),
  "C++": brand(SiCplusplus, "#00599C"),

  // Tools
  PhpStorm: brand(SiPhpstorm, "#000000"),
  "VS Code": brand(VscVscode, "#007ACC"),
  Postman: brand(SiPostman, "#FF6C37"),
  Slack: brand(SiSlack, "#4A154B"),
  Notion: brand(SiNotion, "#000000"),

  // Creative tools
  Figma: brand(SiFigma, "#F24E1E"),
  Canva: brand(SiCanva, "#00C4CC"),
  "ibisPaint X": idea(PiPaintBrush),
  Balsamiq: idea(PiLayout),
};

/** The icon for a skill, or null. Brand logos keep their own colour. */
export function TechIcon({ name, className = "" }) {
  const entry = ICONS[name];
  if (!entry) return null;
  const { Icon, color } = entry;
  return (
    <Icon
      className={`tech-icon${color ? " is-brand" : ""} ${className}`.trim()}
      style={color ? { color } : undefined}
      aria-hidden="true"
      focusable="false"
    />
  );
}

