import { useState, useEffect } from "react";
import { NAV_LINKS } from "../data/content";

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Nav({ onWaitlist }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id) => {
    setOpen(false);
    scrollTo(id);
  };

  return (
    <>
      <a href="#main" className="skip-link">
        Saltar al contingut
      </a>
      <nav className={scrolled ? "s" : ""} aria-label="Navegació principal">
        <button type="button" className="brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          4mæ
        </button>
        <div className="nav-r">
          <div className="nav-links desk-only">
            {NAV_LINKS.map((l) => (
              <button key={l.id} type="button" className="nav-link" onClick={() => go(l.id)}>
                {l.label}
              </button>
            ))}
          </div>
          <div className="nav-pill desk-only">Beta oberta aviat</div>
          <button type="button" className="nav-cta" onClick={onWaitlist}>
            Accés anticipat
          </button>
          <button
            type="button"
            className={`nav-toggle${open ? " open" : ""}`}
            aria-expanded={open}
            aria-label={open ? "Tancar menú" : "Obrir menú"}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`nav-drawer${open ? " open" : ""}`} aria-hidden={!open}>
        <div className="nav-drawer-inner">
          {NAV_LINKS.map((l) => (
            <button key={l.id} type="button" className="nav-drawer-link" onClick={() => go(l.id)}>
              {l.label}
            </button>
          ))}
          <button
            type="button"
            className="nav-cta nav-drawer-cta"
            onClick={() => {
              setOpen(false);
              onWaitlist();
            }}
          >
            Accés anticipat
          </button>
        </div>
      </div>
      {open && <button type="button" className="nav-backdrop" aria-label="Tancar menú" onClick={() => setOpen(false)} />}
    </>
  );
}
