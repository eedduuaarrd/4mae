import { useInView } from "../hooks/useInView";

export default function Reveal({ children, className = "", delay = 0, as: Tag = "div" }) {
  const [ref, inView] = useInView({ threshold: 0.12 });
  return (
    <Tag
      ref={ref}
      className={`reveal${inView ? " in" : ""}${className ? ` ${className}` : ""}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
