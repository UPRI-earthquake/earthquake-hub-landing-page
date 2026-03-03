import { useState } from "react"
import SectionLayout from "./SectionLayout"
import stationImage from "../../assets/station.png"
import eqInfoImage from "../../assets/eqinfo.PNG"
import stationDataImage from "../../assets/stationdata.png"

const StationViewSection = () => {
  const [selected, setSelected] = useState(null)

  const descriptions = {
    events:
      "Clicking the events beacon will show recent earthquake activity pulled directly from the live network.",
    map:
      "The map beacon points to the interactive station map where you can zoom and pan across the Philippine archipelago.",
    legend:
      "Legend explains the color coding used on the display so users can quickly interpret magnitudes and depths."
  }

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

          <div
            className="station-view__main-shot-wrap"
            onClick={() => setSelected(null)}
          >
            <img
              src={stationImage}
              alt="UPRI Earthquake Hub map interface"
              className="station-view__main-shot"
            />
            {/* interactive beacons */}
            <button
              type="button"
              className="station-view__beacon station-view__beacon--events"
              aria-label="Events feature"
              onClick={e => {
                e.stopPropagation()
                setSelected("events")
              }}
            />
            <button
              type="button"
              className="station-view__beacon station-view__beacon--map"
              aria-label="Map feature"
              onClick={e => {
                e.stopPropagation()
                setSelected("map")
              }}
            />
            <button
              type="button"
              className="station-view__beacon station-view__beacon--legend"
              aria-label="Legend feature"
              onClick={e => {
                e.stopPropagation()
                setSelected("legend")
              }}
            />

            {selected && (
              <div className={`station-view__popover station-view__popover--${selected}`}>
                <button
                  type="button"
                  className="station-view__popover-close"
                  onClick={() => setSelected(null)}
                  aria-label="Close description"
                >
                  ×
                </button>
                <p>{descriptions[selected]}</p>
                {selected === "map" && (
                  <img
                    src={stationDataImage}
                    alt="Station waveform snapshot"
                    className="station-view__popover-image"
                  />
                )}
              </div>
            )}
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
