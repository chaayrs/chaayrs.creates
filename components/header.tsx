"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/chaayrs-monogram.png";
import { useEffect, useRef, useState } from "react";

const navigation = [
  { label: "ABOUT", anchor: "about" },
  { label: "WORK", anchor: "work" },
  { label: "SERVICES", anchor: "approach" },
  { label: "KIND WORDS", anchor: "kind-words" },
  { label: "CONTACT", anchor: "contact" },
];

export function Header({ home = false }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggle.current?.focus();
    };
    const closeOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      )
        setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [open]);

  const prefix = home ? "" : "/";
  return (
    <header ref={header} className={`site-header ${home ? "home-header" : ""}`}>
      <Link
        href="/"
        className="signature"
        aria-label="Chaayrs Creates home"
        onClick={() => setOpen(false)}
      >
        <Image
          src={logo}
          alt=""
          priority
          sizes="(max-width: 760px) 72px, 84px"
        />
      </Link>
      <span className="header-caption">
        INDEPENDENT MIND.
        <br />
        MULTIDISCIPLINARY CREATIVE.
      </span>
      <button
        ref={toggle}
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="main-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close −" : "Menu +"}
      </button>
      <nav
        id="main-nav"
        aria-label="Main navigation"
        className={`main-nav ${open ? "is-open" : ""}`}
      >
        {navigation.map(({ label, anchor }) => (
          <a
            key={anchor}
            href={`${prefix}#${anchor}`}
            onClick={() => setOpen(false)}
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
