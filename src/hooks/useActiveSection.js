import { useState, useEffect } from "react";

export function useActiveSection(ids, offset = 120) {
  const [active, setActive] = useState(ids[0] ?? null);

  useEffect(() => {
    const onScroll = () => {
      let current = ids[0] ?? null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids, offset]);

  return active;
}
