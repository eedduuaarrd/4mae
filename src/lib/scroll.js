function getNavOffset() {
  const v = getComputedStyle(document.documentElement).getPropertyValue("--nav-h").trim();
  const n = parseInt(v, 10);
  return (Number.isFinite(n) ? n : 72) + 12;
}

export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - getNavOffset();
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
