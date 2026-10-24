import Link from "next/link";
import { profile } from "@/lib/portfolio";
import { Arrow, Asterisk } from "./icons";

export function Contact() {
  return (
    <section id="contact" className="contact-section" data-motion-group>
      <div className="contact-top eyebrow">
        <span>05 / THE NEXT GOOD IDEA</span>
        <span>LET’S MAKE IT HAPPEN.</span>
      </div>
      <div className="contact-main">
        <div>
          <h2
            className="contact-masked-heading"
            data-motion-heading
            aria-label="LET’S COLLABORATE."
          >
            <span className="line-mask">
              <span className="motion-line">LET’S</span>
            </span>
            <span className="line-mask">
              <em className="motion-line motion-step-1">COLLABORATE.</em>
            </span>
          </h2>
          <p data-motion-item className="contact-description">
            Brand collaborations. Freelance projects.
            <br />
            Thoughtful ideas, brought to life.
          </p>
        </div>
        <a
          className="contact-orbit contact-cta"
          data-motion-item
          href={profile.contactHref}
          aria-label="Email Cha about a collaboration"
        >
          <Arrow />
          <span>START A CONVERSATION</span>
        </a>
      </div>
      <a
        className="email-link contact-email"
        data-motion-item
        href={profile.contactHref}
      >
        {profile.email}
        <Arrow />
      </a>
      <div className="contact-bottom">
        <span>BASED IN MANILA, PHILIPPINES</span>
        <Asterisk />
        <a href="/downloads/cha-yorsua-cv.pdf" target="_blank" rel="noreferrer">
          View my CV <Arrow />
        </a>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <Link href="/" className="footer-brand">
        CHAAYRS.CREATES
      </Link>
      <span>CREATIVE, WITH INTENTION.</span>
      <a href="#top">BACK TO TOP ↑</a>
      <small>© {new Date().getFullYear()} CHA YORSUA</small>
    </footer>
  );
}
