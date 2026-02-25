import { useState } from "react"
import comm1 from "../../assets/comm1.JPG"
import comm2 from "../../assets/comm2.JPG"
import comm3 from "../../assets/comm3.JPG"
import comm4 from "../../assets/comm4.JPG"
import comm5 from "../../assets/comm5.JPG"
import SectionLayout from "./SectionLayout"

const CommunitySection = () => {
  const communityImages = [
    { src: comm1, alt: "Community members gathered for a group photo" },
    { src: comm2, alt: "Participants engaging during a community event" },
    { src: comm3, alt: "Students and volunteers during outreach activities" },
    { src: comm4, alt: "Community session with presenters and attendees" },
    { src: comm5, alt: "Seismo team with community collaborators" },
  ]

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const lastImageIndex = communityImages.length - 1

  const showPreviousImage = () => {
    setActiveImageIndex((prevIndex) =>
      prevIndex === 0 ? lastImageIndex : prevIndex - 1,
    )
  }

  const showNextImage = () => {
    setActiveImageIndex((prevIndex) =>
      prevIndex === lastImageIndex ? 0 : prevIndex + 1,
    )
  }

  return (
    <SectionLayout
      id="community"
      label="Community"
      variant="dark"
      title="Community"
    >
      <div className="community__layout">
        <div className="community__copy">
          <p>
            UPRI Seismo works with students, teachers, and partner institutions
            through workshops, field activities, and local collaborations.
          </p>
          <p>
            We build a stronger earthquake-ready culture by sharing practical
            knowledge and creating spaces for people to learn together.
          </p>
        </div>

        <div className="community__visual">
          <div className="community__carousel">
            <img
              src={communityImages[activeImageIndex].src}
              alt={communityImages[activeImageIndex].alt}
              className="community__image"
            />

            <button
              type="button"
              className="community__control community__control--left"
              onClick={showPreviousImage}
              aria-label="Previous community image"
            >
              &#10094;
            </button>
            <button
              type="button"
              className="community__control community__control--right"
              onClick={showNextImage}
              aria-label="Next community image"
            >
              &#10095;
            </button>
          </div>

          <div className="community__dots" aria-label="Community image slides">
            {communityImages.map((image, index) => (
              <button
                key={image.alt}
                type="button"
                className={`community__dot ${index === activeImageIndex ? "community__dot--active" : ""}`}
                onClick={() => setActiveImageIndex(index)}
                aria-label={`Show community image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}

export default CommunitySection
