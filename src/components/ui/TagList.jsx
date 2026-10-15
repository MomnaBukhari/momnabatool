import "./TagList.css";

/** A row of small outlined labels, used for technologies. */
export default function TagList({ items, label }) {
  if (!items?.length) return null;

  return (
    <ul className="tags" aria-label={label}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
