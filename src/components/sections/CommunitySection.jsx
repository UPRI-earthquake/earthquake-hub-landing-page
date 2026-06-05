import { useEffect, useRef, useState } from "react"
import SectionLayout from "./SectionLayout"

// Import all images in the carousel directory with eager loading to ensure they're available when the carousel is rendered.
const carouselImageModules = import.meta.glob(
  "../../assets/carousel/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP,avif,AVIF}",
  { eager: true, import: "default" },
)

const communityImages = Object.entries(carouselImageModules)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
  .map(([, src], index) => ({
    src,
    alt: `UPRI Seismo community workshop and outreach activity ${index + 1}`,
  }))

const communityHighlights = [
  "Workshops and learning activities",
  "Students, teachers, and institutions",
  "Citizen science participation",
  "Earthquake awareness and preparedness",
]

const communityActions = [
  {
    label: "Facebook Group",
    title: "Earthquake Citizen Science Philippines",
    description: "Join discussions, shared observations, and community learning updates.",
    href: "https://www.facebook.com/groups/728109561898546",
  },
  {
    label: "Facebook Page",
    title: "Quake Quest",
    description: "Follow outreach stories, public education posts, and upcoming activities.",
    href: "https://www.facebook.com/quakequest/",
  },
]

const CommunitySection = () => {
  const layoutRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [shouldLoadCarousel, setShouldLoadCarousel] = useState(false)

  useEffect(() => {
    const node = layoutRef.current
    if (!node) {
      return undefined
    }

    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => {
        setShouldLoadCarousel(true)
        requestAnimationFrame(() => {
          setIsVisible(true)
        })
      })
      return () => cancelAnimationFrame(frame)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry) {
          return
        }

        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          setShouldLoadCarousel(true)
        }

        if (entry.intersectionRatio >= 0.18) {
          // Delay class toggle by 1 frame so CSS transitions can animate reliably.
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setIsVisible(true)
            })
          })
          observer.unobserve(node)
        }
      },
      {
        threshold: [0, 0.18],
        rootMargin: "0px 0px 220px 0px",
      },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
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
          <p className="community__lead">
            UPRI Seismo works with students, teachers, and partner institutions
            through workshops, field activities, and local collaborations.
          </p>
          <p>
            We support earthquake awareness, preparedness, and citizen science
            participation by creating practical spaces for people to learn together.
          </p>
          <ul className="community__highlights" aria-label="Community focus areas">
            {communityHighlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          <div className="community__actions" aria-label="Community links">
            {communityActions.map((action) => (
              <a
                key={action.title}
                className="community__action"
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="community__action-label">{action.label}</span>
                <span className="community__action-title">
                  {action.title}
                  <span className="community__link-icon" aria-hidden="true">{"\u2197"}</span>
                </span>
                <span className="community__action-description">{action.description}</span>
              </a>
            ))}
          </div>
        </div>

        <div className={`community__visual ${isVisible ? "community__visual--visible" : ""}`}>
          <div className="community__visual-card">
            <div
              className="community__carousel"
              aria-label="Community image carousel"
              tabIndex={0}
            >
              {shouldLoadCarousel ? (
                <div className="community__track">
                  <div className="community__track-group">
                    {communityImages.map((image, index) => (
                      <img
                        key={image.alt}
                        src={image.src}
                        alt={image.alt}
                        className="community__image"
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding={index === 0 ? "auto" : "async"}
                        fetchPriority={index === 0 ? "high" : "auto"}
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
                        loading="lazy"
                        decoding="async"
                        fetchPriority="auto"
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            <p className="community__visual-note">
              Community workshops, school visits, and preparedness activities.
            </p>
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}

export default CommunitySection
