export default function Section({ id, variant = "default", children }) {
  const className =
    variant === "alt" ? "sec-s" : variant === "muted" ? "sec-s2" : "sec";

  return (
    <section className={className} id={id}>
      <div className="sec-inner">{children}</div>
    </section>
  );
}

export function SectionHead({ eyebrow, children }) {
  return (
    <header className="sec-head">
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="sec-title">{children}</h2>
    </header>
  );
}
