import SectionLayout from "./SectionLayout"
import lineupImage from "../../assets/lineup.JPG"
import phMapImage from "../../assets/ph.svg"

const WhatWeAreSection = () => {
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

        <h2 className="what-we-are__heading">About Us</h2>

        <div className="what-we-are__copy what-we-are__card">
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

        <div className="what-we-are__card what-we-are__card--mid">
          <h3 className="what-we-are__card-title">What We Do</h3>
          <p>
            The SEISMO Team of the UP Resilience Institute (UPRI) is a small
            yet dynamic group dedicated to advancing disaster resilience in the
            Philippines through innovative seismic engineering solutions.
          </p>
        </div>

        <div className="what-we-are__card what-we-are__card--bottom">
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
