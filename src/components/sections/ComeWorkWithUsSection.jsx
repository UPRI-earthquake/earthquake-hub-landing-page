import { useEffect, useId, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { opportunities } from "../../data/opportunities"
import SectionLayout from "./SectionLayout"
import useScrollReveal from "../../hooks/useScrollReveal"

const MIN_DOCUMENT_ZOOM = 1
const MAX_DOCUMENT_ZOOM = 2.75
const DOCUMENT_ZOOM_STEP = 0.25

const clampDocumentZoom = (zoom) => Math.min(MAX_DOCUMENT_ZOOM, Math.max(MIN_DOCUMENT_ZOOM, zoom))

const getMaterialKind = (opportunity) => {
  if (opportunity.materialType) {
    return opportunity.materialType
  }

  if (typeof opportunity.materialSrc === "string" && opportunity.materialSrc.toLowerCase().endsWith(".pdf")) {
    return "pdf"
  }

  return "image"
}

const getApplyLabel = (opportunity) => {
  if (opportunity.applyHref && opportunity.applyLabel) {
    return opportunity.applyLabel
  }

  return "Apply"
}

const OpportunityPosterPlaceholder = ({ title, compact = false }) => (
  <div className={`opportunity-poster-placeholder${compact ? " opportunity-poster-placeholder--compact" : ""}`} aria-hidden="true">
    <div className="opportunity-poster-placeholder__sheet">
      <span className="opportunity-poster-placeholder__tag">Official posting</span>
      <strong>{title}</strong>
      <span>Place final image or PDF in `src/assets/opportunities/`.</span>
      <div className="opportunity-poster-placeholder__lines">
        <span />
        <span />
        <span />
      </div>
    </div>
  </div>
)

const OpportunityMaterial = ({ opportunity, compact = false }) => {
  const [hasAssetError, setHasAssetError] = useState(false)
  const materialKind = getMaterialKind(opportunity)

  if (!opportunity.materialSrc || hasAssetError) {
    return <OpportunityPosterPlaceholder title={opportunity.title} compact={compact} />
  }

  if (materialKind === "pdf") {
    return (
      <div className={`opportunity-pdf-preview${compact ? " opportunity-pdf-preview--compact" : ""}`}>
        <div className="opportunity-pdf-preview__sheet">
          <span className="opportunity-pdf-preview__label">PDF posting</span>
          <strong>{opportunity.title}</strong>
          <span>{opportunity.project}</span>
        </div>
      </div>
    )
  }

  return (
    <img
      className={`opportunity-material-image${compact ? " opportunity-material-image--compact" : ""}`}
      src={opportunity.materialSrc}
      alt={opportunity.materialAlt}
      loading="lazy"
      onError={() => setHasAssetError(true)}
    />
  )
}

const OpportunityDialog = ({ opportunity, onClose }) => {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const viewerStageRef = useRef(null)
  const documentElementRef = useRef(null)
  const dragStateRef = useRef(null)
  const activePointersRef = useRef(new Map())
  const pinchStateRef = useRef(null)
  const [documentOffset, setDocumentOffset] = useState({ x: 0, y: 0 })
  const [documentZoom, setDocumentZoom] = useState(MIN_DOCUMENT_ZOOM)
  const [baseDocumentSize, setBaseDocumentSize] = useState(null)
  const titleId = useId()
  const materialKind = getMaterialKind(opportunity)

  useEffect(() => {
    setDocumentOffset({ x: 0, y: 0 })
    setDocumentZoom(MIN_DOCUMENT_ZOOM)
    setBaseDocumentSize(null)
  }, [opportunity])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const root = dialogRef.current
    const focusableSelector =
      'a[href], button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"])'

    document.body.style.overflow = "hidden"
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== "Tab" || !root) {
        return
      }

      const focusableElements = [...root.querySelectorAll(focusableSelector)].filter(
        (element) => !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true",
      )

      if (focusableElements.length === 0) {
        event.preventDefault()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose])

  useEffect(() => {
    const stage = viewerStageRef.current

    if (!stage) {
      return undefined
    }

    const handleWheel = (event) => {
      event.preventDefault()
      setDocumentZoom((currentZoom) =>
        clampDocumentZoom(currentZoom + (event.deltaY < 0 ? DOCUMENT_ZOOM_STEP : -DOCUMENT_ZOOM_STEP)),
      )
    }

    stage.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      stage.removeEventListener("wheel", handleWheel)
    }
  }, [])

  useEffect(() => {
    if (materialKind !== "image") {
      setBaseDocumentSize(null)
      return undefined
    }

    const stage = viewerStageRef.current

    if (!stage) {
      return undefined
    }

    const updateBaseSize = () => {
      const documentElement = documentElementRef.current

      if (!documentElement) {
        return
      }

      const { naturalWidth, naturalHeight } = documentElement

      if (!naturalWidth || !naturalHeight) {
        return
      }

      const stageRect = stage.getBoundingClientRect()
      const nextScale = Math.min(stageRect.width / naturalWidth, stageRect.height / naturalHeight, 1)

      if (!Number.isFinite(nextScale) || nextScale <= 0) {
        setBaseDocumentSize(null)
        return
      }

      setBaseDocumentSize({
        width: naturalWidth * nextScale,
        height: naturalHeight * nextScale,
      })
    }

    updateBaseSize()

    const resizeObserver = new ResizeObserver(() => {
      updateBaseSize()
    })

    resizeObserver.observe(stage)
    window.addEventListener("resize", updateBaseSize)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", updateBaseSize)
    }
  }, [materialKind, opportunity])

  const hasDocumentTransform = documentZoom !== MIN_DOCUMENT_ZOOM || documentOffset.x !== 0 || documentOffset.y !== 0
  const documentTransform = `translate(${documentOffset.x}px, ${documentOffset.y}px) scale(${documentZoom})`
  const documentStyle = {
    ...(baseDocumentSize
      ? {
          width: `${baseDocumentSize.width}px`,
          height: `${baseDocumentSize.height}px`,
        }
      : {}),
    ...(hasDocumentTransform ? { transform: documentTransform } : {}),
  }
  const zoomPercentage = `${Math.round(documentZoom * 100)}%`

  const getPointerDistance = () => {
    const pointers = [...activePointersRef.current.values()]

    if (pointers.length < 2) {
      return 0
    }

    return Math.hypot(pointers[0].x - pointers[1].x, pointers[0].y - pointers[1].y)
  }

  const zoomDocument = (amount) => {
    setDocumentZoom((currentZoom) => clampDocumentZoom(currentZoom + amount))
  }

  const resetDocumentView = () => {
    setDocumentOffset({ x: 0, y: 0 })
    setDocumentZoom(MIN_DOCUMENT_ZOOM)
  }

  const zoomControls = (
    <div className="opportunity-dialog__zoom-controls" aria-label="Posting zoom controls">
      <button
        type="button"
        className="opportunity-dialog__zoom-button"
        aria-label="Zoom out"
        onClick={() => zoomDocument(-DOCUMENT_ZOOM_STEP)}
        disabled={documentZoom <= MIN_DOCUMENT_ZOOM}
      >
        <span aria-hidden="true">−</span>
      </button>
      <button
        type="button"
        className="opportunity-dialog__zoom-value"
        aria-label={`Reset zoom. Current zoom is ${zoomPercentage}`}
        onClick={resetDocumentView}
      >
        {zoomPercentage}
      </button>
      <button
        type="button"
        className="opportunity-dialog__zoom-button"
        aria-label="Zoom in"
        onClick={() => zoomDocument(DOCUMENT_ZOOM_STEP)}
        disabled={documentZoom >= MAX_DOCUMENT_ZOOM}
      >
        <span aria-hidden="true">+</span>
      </button>
    </div>
  )

  const startDocumentDrag = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return
    }

    event.currentTarget.setPointerCapture(event.pointerId)
    activePointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })

    if (activePointersRef.current.size >= 2) {
      pinchStateRef.current = {
        startDistance: getPointerDistance(),
        startZoom: documentZoom,
      }
      dragStateRef.current = null
      return
    }

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: documentOffset.x,
      offsetY: documentOffset.y,
    }
  }

  const moveDocumentDrag = (event) => {
    if (activePointersRef.current.has(event.pointerId)) {
      activePointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
    }

    if (activePointersRef.current.size >= 2 && pinchStateRef.current) {
      const nextDistance = getPointerDistance()

      if (nextDistance > 0 && pinchStateRef.current.startDistance > 0) {
        setDocumentZoom(clampDocumentZoom(pinchStateRef.current.startZoom * (nextDistance / pinchStateRef.current.startDistance)))
      }

      return
    }

    const dragState = dragStateRef.current

    if (!dragState || dragState.pointerId !== event.pointerId) {
      return
    }

    setDocumentOffset({
      x: dragState.offsetX + event.clientX - dragState.startX,
      y: dragState.offsetY + event.clientY - dragState.startY,
    })
  }

  const endDocumentDrag = (event) => {
    activePointersRef.current.delete(event.pointerId)
    pinchStateRef.current = activePointersRef.current.size >= 2 ? pinchStateRef.current : null

    if (dragStateRef.current?.pointerId === event.pointerId) {
      dragStateRef.current = null
    }
  }

  return (
    <div
      className="opportunity-dialog"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        ref={dialogRef}
        className="opportunity-dialog__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="opportunity-dialog__topbar">
          <div className="opportunity-dialog__meta">
            <div className="opportunity-dialog__heading">
              <h3 id={titleId} className="opportunity-dialog__title">
                {opportunity.title}
              </h3>
              <p className="opportunity-dialog__subtitle">
                {opportunity.project}
                {opportunity.employmentType ? ` • ${opportunity.employmentType}` : ""}
              </p>
            </div>
          </div>
          <div className="opportunity-dialog__actions">
            <button
              ref={closeButtonRef}
              type="button"
              className="opportunity-dialog__close"
              aria-label={`Close ${opportunity.title} posting`}
              onClick={onClose}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </div>
        {zoomControls}

        <div className="opportunity-dialog__viewer">
          <div
            ref={viewerStageRef}
            className="opportunity-dialog__viewer-stage"
            onPointerDown={startDocumentDrag}
            onPointerMove={moveDocumentDrag}
            onPointerUp={endDocumentDrag}
            onPointerCancel={endDocumentDrag}
            onDoubleClick={resetDocumentView}
          >
            {opportunity.materialSrc ? (
              materialKind === "pdf" ? (
                <iframe
                  className="opportunity-dialog__frame"
                  src={opportunity.materialSrc}
                  title={`${opportunity.title} full posting`}
                  style={documentStyle}
                />
              ) : (
                <img
                  ref={documentElementRef}
                  className="opportunity-dialog__image"
                  src={opportunity.materialSrc}
                  alt={opportunity.materialAlt}
                  decoding="sync"
                  draggable="false"
                  fetchPriority="high"
                  onLoad={() => {
                    const stage = viewerStageRef.current
                    const documentElement = documentElementRef.current

                    if (!stage || !documentElement) {
                      return
                    }

                    const { naturalWidth, naturalHeight } = documentElement

                    if (!naturalWidth || !naturalHeight) {
                      return
                    }

                    const stageRect = stage.getBoundingClientRect()
                    const nextScale = Math.min(stageRect.width / naturalWidth, stageRect.height / naturalHeight, 1)

                    if (!Number.isFinite(nextScale) || nextScale <= 0) {
                      setBaseDocumentSize(null)
                      return
                    }

                    setBaseDocumentSize({
                      width: naturalWidth * nextScale,
                      height: naturalHeight * nextScale,
                    })
                  }}
                  style={documentStyle}
                />
              )
            ) : (
              <OpportunityPosterPlaceholder title={opportunity.title} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
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

  const currentOpportunity = opportunities[currentIndex] ?? null

  const openOpportunity = (opportunity, trigger) => {
    lastTriggerRef.current = trigger ?? document.activeElement
    setActiveOpportunity(opportunity)
  }

  const goToOpportunity = (index) => {
    if (opportunities.length === 0) {
      return
    }

    const nextIndex = (index + opportunities.length) % opportunities.length
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

        {opportunities.length > 0 ? (
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
                totalCount={opportunities.length}
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
