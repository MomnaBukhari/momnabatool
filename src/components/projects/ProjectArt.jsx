import "./ProjectArt.css";

// A small seeded random generator so each project always gets the same art.
function seeded(text) {
  let h = 2166136261;
  for (const char of text) h = Math.imul(h ^ char.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

/**
 * A soft mesh gradient in the current theme's colours, unique to each
 * project, with a large monogram. Used behind project screenshots.
 */
export default function ProjectArt({ seed, monogram, className = "" }) {
  const rand = seeded(seed);
  const spot = () => `${Math.round(rand() * 100)}% ${Math.round(rand() * 100)}%`;
  const style = {
    "--p1": spot(),
    "--p2": spot(),
    "--p3": spot(),
    "--turn": `${Math.round(rand() * 360)}deg`,
  };

  return (
    <div className={`project-art ${className}`} style={style} aria-hidden="true">
      {monogram && <span className="project-art__mark">{monogram}</span>}
    </div>
  );
}
