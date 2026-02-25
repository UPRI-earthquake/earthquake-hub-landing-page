import SectionLayout from "./SectionLayout"
import { useEffect, useMemo, useState } from "react"
import { products } from "../../data/products"

const ProductsSection = () => {
  const productCount = products.length
  const [activeIndex, setActiveIndex] = useState(productCount > 1 ? 1 : 0)

  const getWrappedIndex = (index) => {
    if (productCount === 0) {
      return 0
    }

    return (index + productCount) % productCount
  }

  const visibleProducts = useMemo(() => {
    if (productCount === 0) {
      return []
    }

    if (productCount === 1) {
      return [products[0], products[0], products[0]]
    }

    return [
      products[getWrappedIndex(activeIndex - 1)],
      products[getWrappedIndex(activeIndex)],
      products[getWrappedIndex(activeIndex + 1)],
    ]
  }, [activeIndex, productCount])

  const activeProduct = useMemo(() => {
    if (!visibleProducts.length) {
      return null
    }

    if (visibleProducts[1]) {
      return visibleProducts[1]
    }

    return visibleProducts[0]
  }, [visibleProducts])

  const handleCardSelect = (cardIndex) => {
    if (productCount < 2 || cardIndex === 1) {
      return
    }

    if (cardIndex === 0) {
      setActiveIndex((prevIndex) => (prevIndex - 1 + productCount) % productCount)
      return
    }

    if (cardIndex === 2) {
      setActiveIndex((prevIndex) => (prevIndex + 1) % productCount)
    }
  }

  useEffect(() => {
    if (productCount < 2) {
      return
    }

    const handleKeyDown = (event) => {
      if (!window.matchMedia("(min-width: 901px)").matches) {
        return
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((prevIndex) => (prevIndex + 1) % productCount)
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((prevIndex) => (prevIndex - 1 + productCount) % productCount)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [productCount])

  return (
    <SectionLayout
      id="products"
      label="Products"
      variant="light"
      title="Products"
    >
      <div className="products-panel">
        <h3 className="products-panel__title">Products</h3>

        <div className="products-grid">
          {visibleProducts.map((product, index) => {
            const isFeatured = index === 1

            return (
            <button
              key={`${product.id}-${index}`}
              className={`product-card ${isFeatured ? "product-card--featured" : ""}`}
              type="button"
              onClick={() => handleCardSelect(index)}
              aria-label={isFeatured ? `${product.title} selected` : `Select ${product.title}`}
            >
              <div className="product-card__thumb">
                <img
                  src={product.images?.[0]}
                  alt={product.title}
                  className="product-card__image"
                />
              </div>
              <span className="product-card__nameplate">{product.title.toUpperCase()}</span>
            </button>
            )
          })}
        </div>

        <p className="products-panel__description">
          {activeProduct?.description}
        </p>
      </div>
    </SectionLayout>
  )
}

export default ProductsSection
