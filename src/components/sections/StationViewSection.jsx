import { useState } from "react"
import SectionLayout from "./SectionLayout"
import stationImage from "../../assets/station.png"
import eqInfoImage from "../../assets/eqinfo.PNG"
import stationDataImage from "../../assets/stationdata.png"
import stationDataFullImage from "../../assets/stationdatafull.png"
import significantEarthquakesImage from "../../assets/significantearthquakes.PNG"

const StationViewSection = () => {
  const [selected, setSelected] = useState(null)

  // Centralized copy for each interactive hotspot.
  // Keep keys aligned with `setSelected("<key>")` calls and CSS modifiers:
  // `.station-view__beacon--<key>` and `.station-view__popover--<key>`.
  const descriptions = {
    events:
      "Clicking the events beacon will show recent earthquake activity pulled directly from the live network.",
    map:
      "The map beacon points to the interactive station map where you can zoom and pan across the Philippine archipelago.",
    legend:
      "Legend explains the color coding used on the display so users can quickly interpret magnitudes and depths.",
    significant:
      "Significant Earthquakes highlights major seismic events so users can quickly focus on high-impact activity."
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
          <p className="station-view__subhead">SEISMO</p>

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
            {/* Interactive beacons mapped to fixed coordinates in App.css. */}
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
            <button
              type="button"
              className="station-view__beacon station-view__beacon--significant"
              aria-label="Significant earthquakes feature"
              onClick={e => {
                e.stopPropagation()
                setSelected("significant")
              }}
            />

            {/* Popover uses a selected-key modifier class for per-beacon positioning. */}
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
                {/* Map hotspot shows an additional station waveform image. */}
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
          <p className="station-view__eyebrow">https://earthquake.science.upd.edu.ph/</p>
          <div className="station-view__bottom-row station-view__bottom-row--primary">
          <div className="station-view__copy">
            
            <h4>
              Powered by <span>Data</span>. Built for <span>Resilience</span>.
            </h4>
            <p>
                UPRI Earthquake Hub connects a growing network of seismic sensors across the country, transforming real-time ground motion into clear, accessible information. More than a monitoring platform, it is a commitment to making earthquake data openly available and understandable to all Filipino citizens—strengthening awareness, and a culture of resilience nationwide.
            </p>
          </div>

          <div className="station-view__info-card">
            <img
              src={eqInfoImage}
              alt="Earthquake information detail card"
              className="station-view__info-image"
            />
          </div>
          </div>

          <div className="station-view__bottom-row station-view__bottom-row--station-data">
            <div className="station-view__feature-image-card">
              <img
                src={stationDataFullImage}
                alt="Station data full view card"
                className="station-view__feature-image"
              />
            </div>
            <div className="station-view__feature-copy">
              <h5>Real-time data for seismic stations</h5>
              <p>
                Station Data provides a focused look into live waveform readings, making it easier to inspect sensor behavior and monitor seismic trends in near real time.
              </p>
            </div>
          </div>

          <div className="station-view__bottom-row station-view__bottom-row--significant">

            <div className="station-view__feature-copy">
              <h5>Some Earthquakes Are Just More Special</h5>
              <p>
                Significant Earthquakes highlights the most impactful recent events in a single view so users can quickly scan magnitudes, locations, and key details for rapid situational awareness.
              </p>
            </div>
                        <div className="station-view__feature-image-card station-view__feature-image-card--significant">
              <img
                src={significantEarthquakesImage}
                alt="Significant earthquakes panel view"
                className="station-view__feature-image"
              />
            </div>
          </div>

          <div className="station-view__bottom-row station-view__bottom-row--cta">
            <button onClick={handleClick} type="button" className="station-view__cta">
              See it in action &#8594;
            </button>
          </div>

          <div className="station-view__bottom-row station-view__bottom-row--docs">
            <p className="station-view__docs-label">Documentation</p>
            <a
              className="station-view__docs-link"
              href="https://upri-earthquake.github.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://upri-earthquake.github.io/
            </a>
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}

export default StationViewSection
