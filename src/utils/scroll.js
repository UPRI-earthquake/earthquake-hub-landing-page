export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

export const getTargetScrollTop = (target) => {
  const scrollMarginTop = Number.parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0
  return Math.max(0, target.getBoundingClientRect().top + window.scrollY - scrollMarginTop)
}

export const scrollToSection = (target, { smooth = true } = {}) => {
  window.scrollTo({
    top: getTargetScrollTop(target),
    behavior: smooth && !prefersReducedMotion() ? "smooth" : "auto",
  })
}
