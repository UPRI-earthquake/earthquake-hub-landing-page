import { useEffect, useRef, useState } from "react"
import comm1 from "../../assets/comm1.JPG"
import comm2 from "../../assets/comm2.JPG"
import comm3 from "../../assets/comm3.JPG"
import comm4 from "../../assets/comm4.JPG"
import comm5 from "../../assets/comm5.JPG"
import SectionLayout from "./SectionLayout"

const CommunitySection = () => {
  const layoutRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const communityImages = [
    { src: comm1, alt: "Community members gathered for a group photo" },
    { src: comm2, alt: "Participants engaging during a community event" },
    { src: comm3, alt: "Students and volunteers during outreach activities" },
    { src: comm4, alt: "Community session with presenters and attendees" },
    { src: comm5, alt: "Seismo team with community collaborators" },
  ]

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
