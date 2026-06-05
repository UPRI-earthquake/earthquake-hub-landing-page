import { useEffect, useRef, useState } from "react"

const createVisibleMap = (count) =>
  Array.from({ length: count }).reduce((accumulator, _, index) => {
    accumulator[index] = true
    return accumulator
  }, {})

const useScrollReveal = (
  itemCount,
  {
    threshold = 0.18,
    rootMargin = "0px 0px -8% 0px",
  } = {},
) => {
  const revealRefs = useRef([])
  const [visibleItems, setVisibleItems] = useState(() => {
    if (typeof window === "undefined") {
      return {}
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mediaQuery.matches || !("IntersectionObserver" in window)) {
      return createVisibleMap(itemCount)
    }

    return {}
  })

  useEffect(() => {
    const nodes = revealRefs.current.filter(Boolean)
    if (nodes.length === 0) {
      return undefined
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mediaQuery.matches || !("IntersectionObserver" in window)) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          const index = Number(entry.target.getAttribute("data-reveal-index"))
          if (Number.isNaN(index)) {
            return
          }

          setVisibleItems((previous) => {
            if (previous[index]) {
              return previous
            }

            return { ...previous, [index]: true }
          })

          observer.unobserve(entry.target)
        })
      },
      {
        threshold: [threshold],
        rootMargin,
      },
    )

    nodes.forEach((node) => observer.observe(node))

    return () => {
      observer.disconnect()
    }
  }, [itemCount, rootMargin, threshold])

  const setRevealRef = (index) => (node) => {
    revealRefs.current[index] = node
  }

  return { setRevealRef, visibleItems }
}

export default useScrollReveal
