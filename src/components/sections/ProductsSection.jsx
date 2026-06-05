import { useEffect, useRef, useState } from "react"
import { products } from "../../data/products"
import useScrollReveal from "../../hooks/useScrollReveal"

const ProductsSection = () => {
  const trackRef = useRef(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(products.length > 1)
  const { setRevealRef, visibleItems } = useScrollReveal(3)

  useEffect(() => {
    const track = trackRef.current
    if (!track) {
      return undefined
    }

    const updateScrollState = () => {
      const maxScrollLeft = track.scrollWidth - track.clientWidth
      setCanScrollPrev(track.scrollLeft > 8)
      setCanScrollNext(track.scrollLeft < maxScrollLeft - 8)
    }

    updateScrollState()
    track.addEventListener("scroll", updateScrollState, { passive: true })
    window.addEventListener("resize", updateScrollState)

    return () => {
      track.removeEventListener("scroll", updateScrollState)
      window.removeEventListener("resize", updateScrollState)
    }
  }, [])

  const scrollTrack = (direction) => {
    const track = trackRef.current
    if (!track) {
      return
    }

    const firstPanel = track.querySelector(".products-panel")
    const step = firstPanel
      ? firstPanel.getBoundingClientRect().width + 20
      : track.clientWidth * 0.82

    track.scrollBy({
      left: direction === "next" ? step : -step,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    })
  }

  return (
    <section
      id="shake-table-prototypes"
      className="products-section motion-group motion-group--ready"
      aria-labelledby="shake-table-prototypes-title"
    >
      <div className="products-section__inner">
        <div
          ref={setRevealRef(0)}
          data-reveal-index="0"
          className={`products-section__header motion-reveal${visibleItems[0] ? " is-visible" : ""}`}
          style={{ "--motion-order": 0 }}
        >
          <p className="products-section__eyebrow">
            From earthquake records to physical motion
          </p>
          <h2
            id="shake-table-prototypes-title"
            className="products-section__title"
          >
            Shake Tables
          </h2>
          <p className="products-section__intro">
            These project outputs turn seismic data into controlled motion so
            students, researchers, and communities can see how structures
            respond during earthquakes.
          </p>
        </div>

        <div
          ref={setRevealRef(1)}
          data-reveal-index="1"
          className={`products-rail motion-reveal${visibleItems[1] ? " is-visible" : ""}`}
          style={{ "--motion-order": 1 }}
        >
          <div className="products-rail__header">
            <p className="products-rail__meta">
              {products.length} model{products.length === 1 ? "" : "s"}
            </p>

            <div className="products-rail__controls" aria-label="Shake table navigation">
              <button
                type="button"
                className="products-rail__button"
                onClick={() => scrollTrack("prev")}
                disabled={!canScrollPrev}
                aria-label="Scroll shake tables backward"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path
                    d="M11 3L5 9L11 15"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                className="products-rail__button"
                onClick={() => scrollTrack("next")}
                disabled={!canScrollNext}
                aria-label="Scroll shake tables forward"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path
                    d="M7 3L13 9L7 15"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div
            ref={(node) => {
              trackRef.current = node
              setRevealRef(2)(node)
            }}
            className={`products-showcase motion-reveal${visibleItems[2] ? " is-visible" : ""}`}
            role="list"
            aria-label="Shake table projects"
            tabIndex={0}
            data-reveal-index="2"
            style={{ "--motion-order": 2 }}
          >
            {products.map((product, index) => (
              <article
                key={product.id}
                className={`products-panel products-panel--${index % 2 === 0 ? "light" : "dark"}`}
                role="listitem"
              >
                <div className="products-panel__copy">
                  <p className="products-panel__eyebrow">{product.category}</p>
                  <h3 className="products-panel__title">{product.title}</h3>
                  <p className="products-panel__description">{product.description}</p>
                </div>

                <div className="products-panel__visual">
                  <div className="products-panel__glow" aria-hidden="true" />
                  <img
                    className="products-panel__image"
                    src={product.images}
                    alt={product.title}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductsSection
