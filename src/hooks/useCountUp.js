import { useState, useEffect, useRef } from "react";

export function useCountUp(target, { delay = 1300, enabled = true } = {}) {
  const [count, setCount] = useState(0);
  const frame = useRef(null);

  useEffect(() => {
    if (!enabled) {
      setCount(target);
      return;
    }
    let current = 0;
    const step = () => {
      current += Math.max(1, Math.ceil((target - current) / 8));
      if (current >= target) {
        setCount(target);
        return;
      }
      setCount(current);
      frame.current = requestAnimationFrame(step);
    };
    const t = setTimeout(() => {
      frame.current = requestAnimationFrame(step);
    }, delay);
    return () => {
      clearTimeout(t);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [target, delay, enabled]);

  return count;
}
