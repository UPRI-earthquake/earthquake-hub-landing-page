import { useEffect, useRef, useState } from "react"
import SectionLayout from "./SectionLayout"
import phMapImage from "../../assets/ph.svg"

const WhatWeAreSection = () => {
  const revealRefs = useRef([])
  const [visibleItems, setVisibleItems] = useState({})

  useEffect(() => {
    const nodes = revealRefs.current.filter(Boolean)
    if (nodes.length === 0) {
      return undefined
    }

    if (!("IntersectionObserver" in window)) {
      setVisibleItems(
        nodes.reduce((acc, _, index) => {
          acc[index] = true
          return acc
        }, {}),
      )
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

          setVisibleItems((prev) => {
            if (prev[index]) {
              return prev
            }
            return { ...prev, [index]: true }
          })
          observer.unobserve(entry.target)
        })
      },
      {
        threshold: [0.2],
        rootMargin: "0px 0px -8% 0px",
      },
    )

    nodes.forEach((node) => observer.observe(node))

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <SectionLayout
      id="what-we-are"
      label="What We Are"
      variant="dark"
      title=""
    >
      <div className="what-we-are__layout">
        <img
          src={phMapImage}
          alt=""
          aria-hidden="true"
          className="what-we-are__map-bg"
        />

        <h2
          ref={(node) => {
            revealRefs.current[0] = node
          }}
          data-reveal-index="0"
          className={`what-we-are__heading what-we-are__reveal what-we-are__reveal--heading ${visibleItems[0] ? "what-we-are__reveal--visible" : ""}`}
        >
          About Us
        </h2>

        <div
          ref={(node) => {
            revealRefs.current[1] = node
          }}
          data-reveal-index="1"
          className={`what-we-are__copy what-we-are__card what-we-are__reveal what-we-are__reveal--card-1 ${visibleItems[1] ? "what-we-are__reveal--visible" : ""}`}
        >
          <h3 className="what-we-are__card-title">What We Are</h3>
          <p>
            The SEISMO Team of the UP Resilience Institute (UPRI) is a small
            yet dynamic group dedicated to advancing disaster resilience in
            the Philippines through innovative seismic engineering solutions.
          </p>
        </div>

        {/* <div className="what-we-are__visual">
          <img
            src={lineupImage}
            alt="Seismo team presenting their research project"
            className="what-we-are__image"
          />
        </div> */}

        <div
          ref={(node) => {
            revealRefs.current[2] = node
          }}
          data-reveal-index="2"
          className={`what-we-are__card what-we-are__card--mid what-we-are__reveal what-we-are__reveal--card-2 ${visibleItems[2] ? "what-we-are__reveal--visible" : ""}`}
        >
          <h3 className="what-we-are__card-title">What We Do</h3>
          <p>
            The SEISMO Team of the UP Resilience Institute (UPRI) is a small
            yet dynamic group dedicated to advancing disaster resilience in the
            Philippines through innovative seismic engineering solutions.
          </p>
        </div>

        <div
          ref={(node) => {
            revealRefs.current[3] = node
          }}
          data-reveal-index="3"
          className={`what-we-are__card what-we-are__card--bottom what-we-are__reveal what-we-are__reveal--card-3 ${visibleItems[3] ? "what-we-are__reveal--visible" : ""}`}
        >
          <h3 className="what-we-are__card-title">Initiative</h3>
          <p>
            The SEISMO Team of the UP Resilience Institute (UPRI) is a small
            yet dynamic group dedicated to advancing disaster resilience in the
            Philippines through innovative seismic engineering solutions.
          </p>
        </div>
      </div>
    </SectionLayout>
  )
}

export default WhatWeAreSection
