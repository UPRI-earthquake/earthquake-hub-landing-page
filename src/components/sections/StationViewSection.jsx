import SectionLayout from "./SectionLayout"
import stationImage from "../../assets/station.png"
import eqInfoImage from "../../assets/eqinfo.PNG"

const StationViewSection = () => {

  const handleClick = () => {
    window.open('https://earthquake.science.upd.edu.ph/')
  }

  return (
    <SectionLayout
      id="station-view"
      label="Station View"
      variant="light"
      title="Station View"
    >
      <div className="station-view">
        <div className="station-view__top">
          <h3 className="station-view__headline">
            Earthquake Data For All <span>Filipino Citizens</span>
          </h3>
          <p className="station-view__subhead">UPRI Earthquake Hub</p>

          <div className="station-view__callout">
            Information at your fingertips/mouse
          </div>

          <div className="station-view__main-shot-wrap">
            <img
              src={stationImage}
              alt="UPRI Earthquake Hub map interface"
              className="station-view__main-shot"
            />
          </div>
        </div>

        <div className="station-view__bottom">
          <div className="station-view__copy">
            <p className="station-view__eyebrow">https://earthquake.science.upd.edu.ph/</p>
            <h4>Powered by Data. Built for Resilience.</h4>
            <p>
                UPRI Earthquake Hub connects a growing network of seismic sensors across the country, transforming real-time ground motion into clear, accessible information. More than a monitoring platform, it is a commitment to making earthquake data openly available and understandable to all Filipino citizens—strengthening awareness, and a culture of resilience nationwide.
            </p>
            <button onClick={handleClick} type="button" className="station-view__cta">
              See it in action &#8594;
            </button>
          </div>

          <div className="station-view__info-card">
            <img
              src={eqInfoImage}
              alt="Earthquake information detail card"
              className="station-view__info-image"
            />
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}

export default StationViewSection
