import { useRef, useEffect, useState } from "react";

export default function FaqItem({ q, a, open, onToggle }) {
  const innerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const measure = () => setHeight(open ? el.scrollHeight : 0);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open, a]);

  return (
    <div className={`fi${open ? " open" : ""}`}>
      <button type="button" className="fi-q" aria-expanded={open} onClick={onToggle}>
        <span>{q}</span>
        <span className="fi-ic" aria-hidden>
          +
        </span>
      </button>
      <div
        className="fi-a"
        style={{ maxHeight: open ? height : 0, paddingBottom: open ? 24 : 0 }}
        aria-hidden={!open}
      >
        <div ref={innerRef}>{a}</div>
      </div>
    </div>
  );
}
