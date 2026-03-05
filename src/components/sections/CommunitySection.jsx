import { useEffect, useRef, useState } from "react"
import SectionLayout from "./SectionLayout"

const carouselImageModules = import.meta.glob(
  "../../assets/carousel/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP,avif,AVIF}",
  { eager: true, import: "default" },
)

const communityImages = Object.entries(carouselImageModules)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
  .map(([, src], index) => ({
    src,
    alt: `Community carousel image ${index + 1}`,
  }))

const CommunitySection = () => {
  const layoutRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = layoutRef.current
    if (!node) {
      return undefined
    }

    let didReveal = false

    const reveal = () => {
      // Delay class toggle by 1 frame so CSS transitions can animate reliably.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true)
        })
      })
    }

    const checkVisibility = () => {
      if (didReveal) {
        return
      }

      const rect = node.getBoundingClientRect()
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight

      const entersViewport = rect.top <= viewportHeight * 0.82
      const notPassedCompletely = rect.bottom >= viewportHeight * 0.18

      if (entersViewport && notPassedCompletely) {
        didReveal = true
        reveal()
        window.removeEventListener("scroll", checkVisibility)
        window.removeEventListener("resize", checkVisibility)
      }
    }

    checkVisibility()
    window.addEventListener("scroll", checkVisibility, { passive: true })
    window.addEventListener("resize", checkVisibility)

    return () => {
      window.removeEventListener("scroll", checkVisibility)
      window.removeEventListener("resize", checkVisibility)
    }
  }, [])

  return (
    <SectionLayout
      id="community"
      label="Community"
      variant="dark"
      // title="Community"
    >
      <div ref={layoutRef} className="community__layout">
        <div className={`community__copy ${isVisible ? "community__copy--visible" : ""}`}>
          <h2>Community</h2>
          <p>
            UPRI Seismo works with students, teachers, and partner institutions
            through workshops, field activities, and local collaborations.
          </p>
          <p>
            We build a stronger earthquake-ready culture by sharing practical
            knowledge and creating spaces for people to learn together.
          </p>
          <p className="community__links">
            Facebook Group:{" "}
            <a
              href="https://www.facebook.com/groups/728109561898546"
              target="_blank"
              rel="noopener noreferrer"
            >
              Earthquake Citizen Science Philippines
              <span className="community__link-icon" aria-hidden="true">↗</span>
            </a>
            <br />
            Facebook Page:{" "}
            <a
              href="https://www.facebook.com/quakequest/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Quake Quest
              <span className="community__link-icon" aria-hidden="true">↗</span>
            </a>
          </p>
        </div>

        <div className={`community__visual ${isVisible ? "community__visual--visible" : ""}`}>
          <div className="community__carousel" aria-label="Community image carousel">
            <div className="community__track">
              <div className="community__track-group">
                {communityImages.map((image) => (
                  <img
                    key={image.alt}
                    src={image.src}
                    alt={image.alt}
                    className="community__image"
                  />
                ))}
              </div>

              <div className="community__track-group" aria-hidden="true">
                {communityImages.map((image) => (
                  <img
                    key={`${image.alt}-duplicate`}
                    src={image.src}
                    alt=""
                    className="community__image"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}

export default CommunitySection
