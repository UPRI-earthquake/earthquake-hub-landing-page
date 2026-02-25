import SectionLayout from "./SectionLayout"
import lineupImage from "../../assets/lineup.JPG"
import roomImage from "../../assets/room.png"

const WhatWeAreSection = () => {
  return (
    <SectionLayout
      id="what-we-are"
      label="What We Are"
      variant="dark"
      title=""
    >
      <div className="what-we-are__layout">
        <div className="what-we-are__copy">
          <h2 className="content-section__title">What We Are</h2>
          <p>
            UPRI Seismo is the seismology and earthquake monitoring initiative
            of the University of the Philippines Resilience Institute, dedicated
            to advancing earthquake science and disaster resilience in the
            Philippines.
          </p>
          <p>
            We bring together researchers, engineers, and data specialists to
            analyze seismic activity and translate complex geophysical data into
            actionable insights for communities, and institutions.
          </p>
        </div>

        <div className="what-we-are__visual">
          <span className="what-we-are__accent" aria-hidden="true" />
          <img
            src={lineupImage}
            alt="Seismo team presenting their research project"
            className="what-we-are__image what-we-are__image--front"
          />
          <img
            src={roomImage}
            alt="Seismo station setup in a demonstration room"
            className="what-we-are__image what-we-are__image--back"
          />
        </div>
      </div>
    </SectionLayout>
  )
}

export default WhatWeAreSection
