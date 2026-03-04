import { useState, useEffect, useRef } from "react"
import { products } from "../../data/products"

const ProductsSection = () => {
  const [displayIndex, setDisplayIndex] = useState(0)
  const [pendingIndex, setPendingIndex] = useState(null)
  const [phase, setPhase] = useState("idle") // 'idle' | 'exit' | 'enter'
  const [direction, setDirection] = useState("next") // 'next' | 'prev'
  const exitTimer = useRef(null)
  const enterTimer = useRef(null)

  const navigate = (dir) => {
    if (phase !== "idle") return
    const next =
      dir === "next"
        ? (displayIndex + 1) % products.length
        : (displayIndex - 1 + products.length) % products.length
    setDirection(dir)
    setPendingIndex(next)
    setPhase("exit")
  }

  const goToIndex = (i) => {
    if (phase !== "idle" || i === displayIndex) return
    setDirection(i > displayIndex ? "next" : "prev")
    setPendingIndex(i)
    setPhase("exit")
  }

  useEffect(() => {
    if (phase === "exit") {
      exitTimer.current = setTimeout(() => {
        setDisplayIndex(pendingIndex)
        setPhase("enter")
      }, 320)
    }
    if (phase === "enter") {
      enterTimer.current = setTimeout(() => {
        setPhase("idle")
        setPendingIndex(null)
      }, 480)
    }
    return () => {
      clearTimeout(exitTimer.current)
      clearTimeout(enterTimer.current)
    }
  }, [phase, pendingIndex])

  const product = products[displayIndex]

  let cardClass = "products-card"
  if (phase === "exit") {
    cardClass +=
      direction === "next"
        ? " products-card--exit-left"
        : " products-card--exit-right"
  } else if (phase === "enter") {
    cardClass +=
      direction === "next"
        ? " products-card--enter-right"
        : " products-card--enter-left"
  }

  return (
    <section id="products" className="products-section">
      <div className="products-section__inner">
        <h2 className="products-section__title">Products</h2>

        <div className="products-viewport">
          <div className={cardClass}>
            <div className="products-card__desc">
              <h3 className="products-card__name">{product.title}</h3>
              <p className="products-card__description">{product.description}</p>
            </div>

            <div className="products-card__visual">
              <div className="products-card__halfcircle" aria-hidden="true" />
              <img
                className="products-card__image"
                src={product.images}
                alt={product.title}
              />
            </div>
          </div>
        </div>

        <div className="products-nav">
          <button
            className="products-nav__btn"
            onClick={() => navigate("prev")}
            aria-label="Previous product"
            disabled={phase !== "idle"}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path
                d="M11 3L5 9L11 15"
                stroke="#F5F7FA"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="products-nav__dots">
            {products.map((_, i) => (
              <button
                key={i}
                className={`products-nav__dot${
                  i === displayIndex ? " products-nav__dot--active" : ""
                }`}
                onClick={() => goToIndex(i)}
                aria-label={`Go to ${products[i].title}`}
              />
            ))}
          </div>

          <button
            className="products-nav__btn"
            onClick={() => navigate("next")}
            aria-label="Next product"
            disabled={phase !== "idle"}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path
                d="M7 3L13 9L7 15"
                stroke="#F5F7FA"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductsSection
