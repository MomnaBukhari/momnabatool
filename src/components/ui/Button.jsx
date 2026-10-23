import { useRef } from "react";
import useMagnetic from "../../hooks/useMagnetic";
import RollText from "./RollText";
import "./Button.css";

/**
 * A link styled as a button, or a real <button> when there is no href.
 * variant: "solid" (default) | "outline". Magnetic on hover.
 */
export default function Button({ href, variant = "solid", className = "", icon, children, ...rest }) {
  const ref = useRef(null);
  useMagnetic(ref, 0.25);
  const classes = `button button--${variant}${variant === "solid" ? " glitter" : ""} ${className}`.trim();
  const content = (
    <>
      <RollText>{children}</RollText>
      {icon && <span className="button__icon">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button ref={ref} type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
