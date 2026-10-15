import "./RollText.css";

/** On hover the text rolls up and a copy rolls in from below. */
export default function RollText({ children }) {
  return (
    <span className="roll">
      <span className="roll__inner">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </span>
  );
}
