import { useRef, useState } from "react"
import { createPortal } from "react-dom"
import { opportunities } from "../../data/opportunities"
import SectionLayout from "./SectionLayout"
import useScrollReveal from "../../hooks/useScrollReveal"
import OpportunityDialog from "../opportunities/OpportunityDialog"
import OpportunityMaterial from "../opportunities/OpportunityMaterial"

const openOpportunities = opportunities.filter((opportunity) => opportunity.status === "open")

const getApplyLabel = (opportunity) => {
  if (opportunity.applyHref && opportunity.applyLabel) {
    return opportunity.applyLabel
  }

  return "Apply"
}

const OpportunityCard = ({ opportunity, onOpen, currentIndex, totalCount, onPrevious, onNext }) => {
  return (
    <article className="opportunity-card">
      <div className="opportunity-card__copy">
        <div className="opportunity-card__header">
          <div>
            <p className="opportunity-card__eyebrow">Job opportunity</p>
            <h3 className="opportunity-card__title">{opportunity.title}</h3>
          </div>
        </div>

        <p className="opportunity-card__project">{opportunity.project}</p>
        <p className="opportunity-card__summary">{opportunity.summary}</p>

        <dl className="opportunity-card__facts">
          {opportunity.employmentType ? (
            <div>
              <dt>Appointment</dt>
              <dd>{opportunity.employmentType}</dd>
            </div>
          ) : null}
          {opportunity.compensation ? (
            <div>
              <dt>Compensation</dt>
              <dd>{opportunity.compensation}</dd>
            </div>
          ) : null}
        </dl>

        <div className="opportunity-card__actions">
          {opportunity.applyHref ? (
            <a className="opportunity-card__apply" href={opportunity.applyHref} target="_blank" rel="noreferrer">
              {getApplyLabel(opportunity)}
            </a>
          ) : (
            <button className="opportunity-card__apply" type="button" disabled>
              {getApplyLabel(opportunity)}
            </button>
          )}
          {totalCount > 1 ? (
            <div className="careers__carousel-controls" aria-label="Opportunity navigation">
              <button
                type="button"
                className="careers__carousel-button"
                onClick={onPrevious}
                aria-label="Show previous opportunity"
              >
                <span aria-hidden="true">←</span>
              </button>
              <span className="careers__carousel-position" aria-live="polite">
                <span className="careers__carousel-position-label">Opportunity</span>
                <span className="careers__carousel-position-value">
                  {currentIndex + 1} of {totalCount}
                </span>
              </span>
              <button
                type="button"
                className="careers__carousel-button"
                onClick={onNext}
                aria-label="Show next opportunity"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div className="opportunity-card__preview">
        <button
          type="button"
          className="opportunity-card__preview-button"
          onClick={(event) => onOpen(opportunity, event.currentTarget)}
          aria-label={`Open full posting for ${opportunity.title}`}
        >
          <div className="opportunity-card__preview-frame">
            <OpportunityMaterial opportunity={opportunity} compact />
          </div>
          <span className="opportunity-card__preview-caption">Open official poster</span>
        </button>
      </div>
    </article>
  )
}

const ComeWorkWithUsSection = () => {
  const [activeOpportunity, setActiveOpportunity] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const lastTriggerRef = useRef(null)
  const { setRevealRef, visibleItems } = useScrollReveal(2)

  const currentOpportunity = openOpportunities[currentIndex] ?? null

  const openOpportunity = (opportunity, trigger) => {
    lastTriggerRef.current = trigger ?? document.activeElement
    setActiveOpportunity(opportunity)
  }

  const goToOpportunity = (index) => {
    if (openOpportunities.length === 0) {
      return
    }

    const nextIndex = (index + openOpportunities.length) % openOpportunities.length
    setCurrentIndex(nextIndex)
  }

  const showPreviousOpportunity = () => {
    goToOpportunity(currentIndex - 1)
  }

  const showNextOpportunity = () => {
    goToOpportunity(currentIndex + 1)
  }

  const closeOpportunity = () => {
    setActiveOpportunity(null)
    const trigger = lastTriggerRef.current

    if (trigger instanceof HTMLElement) {
      window.requestAnimationFrame(() => {
        trigger.focus()
      })
    }
  }

  return (
    <SectionLayout id="come-work-with-us" label="Come Work With Us" variant="light">
      <div className="careers motion-group motion-group--ready">
        <header
          ref={setRevealRef(0)}
          data-reveal-index="0"
          className={`careers__header motion-reveal${visibleItems[0] ? " is-visible" : ""}`}
          style={{ "--motion-order": 0 }}
        >
          <p className="careers__kicker">Opportunities</p>
          <h2 className="careers__title">Come work with us</h2>
          <p className="careers__subtitle">
            Join applied earthquake engineering work grounded in public service, research, and field-ready instrumentation.
          </p>
        </header>

        {openOpportunities.length > 0 ? (
          <div
            ref={setRevealRef(1)}
            data-reveal-index="1"
            className={`careers__carousel motion-reveal${visibleItems[1] ? " is-visible" : ""}`}
            style={{ "--motion-order": 1 }}
            aria-label="Current opportunities"
          >
            {currentOpportunity ? (
              <OpportunityCard
                opportunity={currentOpportunity}
                onOpen={openOpportunity}
                currentIndex={currentIndex}
                totalCount={openOpportunities.length}
                onPrevious={showPreviousOpportunity}
                onNext={showNextOpportunity}
              />
            ) : null}
          </div>
        ) : (
          <div
            ref={setRevealRef(1)}
            data-reveal-index="1"
            className={`careers__empty motion-reveal${visibleItems[1] ? " is-visible" : ""}`}
            style={{ "--motion-order": 1 }}
            role="status"
          >
            <p>There are no open roles at the moment.</p>
            <span>Research assistantship, internship, and collaboration opportunities will be posted here when available.</span>
          </div>
        )}
      </div>

      {activeOpportunity && typeof document !== "undefined"
        ? createPortal(<OpportunityDialog opportunity={activeOpportunity} onClose={closeOpportunity} />, document.body)
        : null}
    </SectionLayout>
  )
}

export default ComeWorkWithUsSection
