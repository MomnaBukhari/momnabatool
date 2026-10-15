import { profile } from "../../data/profile";
import WaveText from "../ui/WaveText";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <WaveText as="p" className="footer__name" text={profile.name} />
      </div>
    </footer>
  );
}
