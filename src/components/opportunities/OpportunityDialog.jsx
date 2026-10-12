import { useEffect, useId, useRef, useState } from "react"
import { OpportunityPosterPlaceholder } from "./OpportunityMaterial"
import { getMaterialKind } from "./materialUtils"

const MIN_DOCUMENT_ZOOM = 1
const MAX_DOCUMENT_ZOOM = 2.75
const DOCUMENT_ZOOM_STEP = 0.25

const clampDocumentZoom = (zoom) => Math.min(MAX_DOCUMENT_ZOOM, Math.max(MIN_DOCUMENT_ZOOM, zoom))

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

export default OpportunityDialog
