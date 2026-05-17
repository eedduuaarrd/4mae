import { useState, useEffect, useRef } from "react";

export function useCountUp(target, { delay = 1300, duration = 900 } = {}) {
  const [count, setCount] = useState(0);
  const prevTarget = useRef(0);
  const frame = useRef(null);

  useEffect(() => {
    const start = prevTarget.current;
    prevTarget.current = target;
    const diff = target - start;
    if (diff === 0) return;

    const startTime = performance.now() + delay;

    const tick = (now) => {
      if (now < startTime) {
        frame.current = requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(start + diff * eased));
      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };

    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [target, delay, duration]);

  return count;
}
