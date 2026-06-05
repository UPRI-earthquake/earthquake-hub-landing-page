import { useEffect, useRef, useState } from "react"
import SectionLayout from "./SectionLayout"
import ehubBeaconBgImage from "../../assets/ehub-beacon-bg.png"
import ehubBeaconControlsBgImage from "../../assets/ehub-beacon-controls-bg.png"
import ehubBeaconLegendBgImage from "../../assets/ehub-beacon-legend-bg.png"
import ehubBeaconEventBgImage from "../../assets/ehub-beacon-event-bg.png"
import ehubBeaconStationBgImage from "../../assets/ehub-beacon-station-bg.png"
import ehubBeaconEventListBgImage from "../../assets/ehub-beacon-event-list-bg.png"
import ehubBeaconStationListBgImage from "../../assets/ehub-beacon-station-list-bg.png"
import eqInfoImage from "../../assets/eqinfo.PNG"
import stationDataImage from "../../assets/stationdata.png"
import stationDataFullImage from "../../assets/stationdatafull.png"

const EarthquakeHubSection = () => {
  const sectionRef = useRef(null)
  const bottomRowRefs = useRef([])
  const [selected, setSelected] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [visibleBottomRows, setVisibleBottomRows] = useState({})

  // Centralized copy for each interactive hotspot.
  // Keep keys aligned with `setSelected("<key>")` calls and CSS modifiers:
  // `.ehub__beacon--<key>`.
  const beaconContent = {
    eventList: {
      label: "Event list",
      title: "Recent earthquake list",
      body:
        "Scan recent earthquake events, compare entries quickly, and move from the list into a selected event detail workflow.",
      backgroundImage: ehubBeaconEventListBgImage,
      modifier: "event-list",
      buttonLabel: "Event list feature",
    },
    stationList: {
      label: "Station list",
      title: "Station list view",
      body:
        "Switch from earthquake events to deployed seismic stations across the network, then choose a station for local context and live readings.",
      backgroundImage: ehubBeaconStationListBgImage,
      modifier: "station-list",
      buttonLabel: "Station list feature",
    },
    station: {
      label: "Station popup",
      title: "Station popup",
      body:
        "Open a deployed seismic station from the map to inspect station information and its live waveform readout.",
      backgroundImage: ehubBeaconStationBgImage,
      modifier: "station",
      buttonLabel: "Station popup feature",
    },
    eventPopup: {
      label: "Event popup",
      title: "Event popup",
      body:
        "Select an earthquake on the map to preview magnitude, location, depth, and timing before opening deeper event intelligence.",
      backgroundImage: ehubBeaconEventBgImage,
      modifier: "event-popup",
      buttonLabel: "Event popup feature",
    },
    layers: {
      label: "Map controls",
      title: "Map controls",
      body:
        "Use map controls and layers to switch context while keeping earthquakes, stations, and geography in view.",
      backgroundImage: ehubBeaconControlsBgImage,
      modifier: "layers",
      buttonLabel: "Map controls feature",
    },
    legend: {
      label: "Legend panel",
      title: "Legend panel",
      body:
        "Read stations, faults, boundaries, and earthquake depth colors directly beside the active map.",
      backgroundImage: ehubBeaconLegendBgImage,
      modifier: "legend",
      buttonLabel: "Legend panel feature",
    },
  }

  const activeBeacon = selected ? beaconContent[selected] : null
  const activeBackgroundImage = activeBeacon?.backgroundImage ?? ehubBeaconBgImage

  const handleClick = () => {
    window.open('https://earthquake.science.upd.edu.ph/')
  }

  useEffect(() => {
    const node = sectionRef.current
    if (!node) {
      return undefined
    }

    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => {
        setIsVisible(true)
      })
      return () => cancelAnimationFrame(frame)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry) {
          return
        }

        if (entry.isIntersecting || entry.intersectionRatio > 0.2) {
          setIsVisible(true)
          observer.unobserve(node)
        }
      },
      {
        threshold: [0.2],
        rootMargin: "0px 0px -8% 0px",
      },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const nodes = bottomRowRefs.current.filter(Boolean)
    if (nodes.length === 0) {
      return undefined
    }

    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => {
        setVisibleBottomRows(
          nodes.reduce((acc, _, index) => {
            acc[index] = true
            return acc
          }, {}),
        )
      })
      return () => cancelAnimationFrame(frame)
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

          setVisibleBottomRows((prev) => {
            if (prev[index]) {
              return prev
            }
            return { ...prev, [index]: true }
          })
          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0.2,
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
      id="earthquake-hub"
      label="Earthquake Hub"
      variant="light"
      title="Earthquake Hub"
    >
      <div
        ref={sectionRef}
        className={`ehub ${isVisible ? "ehub--visible" : ""}`}
      >
        <div className="ehub__top ehub__reveal ehub__reveal--top">
          <p className="ehub__eyebrow">The network that started it all</p>
          <h3 className="ehub__headline">
            From seismic data to public <span>resilience</span>
          </h3>
          <p className="ehub__subhead">Earthquake Hub</p>

          <div className="ehub__callout">
            Accessible earthquake data for Filipino communities
          </div>

          <div
            className="ehub__main-shot-wrap"
            onClick={() => setSelected(null)}
          >
            <img
              src={activeBackgroundImage}
              alt="UPRI Earthquake Hub map interface"
              className="ehub__main-shot"
            />
            {/* Interactive beacons mapped to fixed coordinates in App.css. */}
            <button
              type="button"
              className="ehub__beacon ehub__beacon--event-list"
              aria-label={beaconContent.eventList.buttonLabel}
              aria-pressed={selected === "eventList"}
              onClick={e => {
                e.stopPropagation()
                setSelected("eventList")
              }}
            />
            <button
              type="button"
              className="ehub__beacon ehub__beacon--station-list"
              aria-label={beaconContent.stationList.buttonLabel}
              aria-pressed={selected === "stationList"}
              onClick={e => {
                e.stopPropagation()
                setSelected("stationList")
              }}
            />
            <button
              type="button"
              className="ehub__beacon ehub__beacon--station"
              aria-label={beaconContent.station.buttonLabel}
              aria-pressed={selected === "station"}
              onClick={e => {
                e.stopPropagation()
                setSelected("station")
              }}
            />
            <button
              type="button"
              className="ehub__beacon ehub__beacon--layers"
              aria-label={beaconContent.layers.buttonLabel}
              aria-pressed={selected === "layers"}
              onClick={e => {
                e.stopPropagation()
                setSelected("layers")
              }}
            />
            <button
              type="button"
              className="ehub__beacon ehub__beacon--legend"
              aria-label={beaconContent.legend.buttonLabel}
              aria-pressed={selected === "legend"}
              onClick={e => {
                e.stopPropagation()
                setSelected("legend")
              }}
            />
            <button
              type="button"
              className="ehub__beacon ehub__beacon--event-popup"
              aria-label={beaconContent.eventPopup.buttonLabel}
              aria-pressed={selected === "eventPopup"}
              onClick={e => {
                e.stopPropagation()
                setSelected("eventPopup")
              }}
            />

            {activeBeacon ? (
              <aside
                className="ehub__active-note"
                role="status"
                aria-live="polite"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="ehub__active-note-close"
                  onClick={() => setSelected(null)}
                  aria-label="Close feature note"
                >
                  ×
                </button>
                <h4>{activeBeacon.title}</h4>
                <p>{activeBeacon.body}</p>
              </aside>
            ) : null}
          </div>
        </div>

        <div className="ehub__bottom">
          <div className="ehub__bottom-inner">
          <div
            ref={(node) => {
              bottomRowRefs.current[1] = node
            }}
            data-reveal-index="1"
            className={`ehub__bottom-row ehub__bottom-row--primary ehub__reveal ${visibleBottomRows[1] ? "ehub__reveal--visible" : ""}`}
          >
          <div className="ehub__copy">
            <h4>
              Recent earthquake <span>exploration</span>.
            </h4>
            <p>
              Users can scan recent earthquakes, filter events, select an entry, and inspect magnitude, location, depth, and event details in a public-facing workflow.
            </p>
          </div>

          <div className="ehub__info-card ehub__info-card--recent">
            <img
              src={eqInfoImage}
              alt="Recent earthquake event card with magnitude, location, depth, and event details"
              className="ehub__info-image"
            />
          </div>
          </div>

          <div
            ref={(node) => {
              bottomRowRefs.current[2] = node
            }}
            data-reveal-index="2"
            className={`ehub__bottom-row ehub__bottom-row--station-data ehub__reveal ${visibleBottomRows[2] ? "ehub__reveal--visible" : ""}`}
          >
            <div className="ehub__feature-image-card ehub__feature-image-card--station">
              <img
                src={stationDataFullImage}
                alt="Station data full view card"
                className="ehub__feature-image"
              />
            </div>
            <div className="ehub__feature-copy">
              <h5>Real-time seismic station and waveform data</h5>
              <p>
                Users can inspect deployed seismic stations and review live waveform readings in near real time to understand device status and how seismic signals are being recorded.
              </p>
            </div>
          </div>

          <div
            ref={(node) => {
              bottomRowRefs.current[3] = node
            }}
            data-reveal-index="3"
            className={`ehub__bottom-row ehub__bottom-row--details ehub__reveal ${visibleBottomRows[3] ? "ehub__reveal--visible" : ""}`}
          >

            <div className="ehub__feature-copy">
              <h5>Event intelligence and detail page</h5>
              <p>
                Selected events open into a detail page showing depth, event time, epicenter context, nearest station, and station recordings for closer inspection.
              </p>
            </div>
            <div className="ehub__feature-image-card ehub__feature-image-card--details">
              <img
                src={stationDataImage}
                alt="Earthquake Hub detail view placeholder showing station and waveform information"
                className="ehub__feature-image"
              />
            </div>
          </div>

          <div
            ref={(node) => {
              bottomRowRefs.current[4] = node
            }}
            data-reveal-index="4"
            className={`ehub__bottom-row ehub__bottom-row--cta ehub__reveal ${visibleBottomRows[4] ? "ehub__reveal--visible" : ""}`}
          >
            <div className="ehub__bridge">
              <p className="ehub__bridge-copy">
                The same earthquake records can move beyond the screen into controlled motion for classrooms, demonstrations, and hands-on seismic learning.
              </p>
              <button onClick={handleClick} type="button" className="ehub__cta">
                Open Live Platform &#8594;
              </button>
            </div>
          </div>

          <div
            ref={(node) => {
              bottomRowRefs.current[5] = node
            }}
            data-reveal-index="5"
            className={`ehub__bottom-row ehub__bottom-row--docs ehub__reveal ${visibleBottomRows[5] ? "ehub__reveal--visible" : ""}`}
          >
            <a
              className="ehub__docs-link"
              href="https://upri-earthquake.github.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              View documentation &#8594;
            </a>
          </div>
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}

export default EarthquakeHubSection
