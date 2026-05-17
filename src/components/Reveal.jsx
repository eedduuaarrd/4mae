import { useInView } from "../hooks/useInView";

export default function Reveal({ children, className = "", delay = 0, instant = false }) {
  const [ref, inView] = useInView({ threshold: 0.1 });

  if (instant) {
    return <div className={className || undefined}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={`reveal${inView ? " in" : ""}${className ? ` ${className}` : ""}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
