import { useEffect } from "react";

export default function LegalModal({ doc, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!doc) return null;

  return (
    <div className="modal-root" role="dialog" aria-modal="true" aria-labelledby="legal-title">
      <button type="button" className="modal-backdrop" aria-label="Tancar" onClick={onClose} />
      <div className="modal-panel">
        <div className="modal-hd">
          <h2 id="legal-title">{doc.title}</h2>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Tancar">
            ×
          </button>
        </div>
        <p className="modal-updated">Actualitzat: {doc.updated}</p>
        <div className="modal-body">
          {doc.sections.map((s) => (
            <section key={s.h}>
              <h3>{s.h}</h3>
              <p>{s.p}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
