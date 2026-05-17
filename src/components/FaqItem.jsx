import { useRef, useEffect, useState } from "react";

export default function FaqItem({ q, a, open, onToggle }) {
  const innerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (open && innerRef.current) {
      setHeight(innerRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
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
      >
        <div ref={innerRef}>{a}</div>
      </div>
    </div>
  );
}
