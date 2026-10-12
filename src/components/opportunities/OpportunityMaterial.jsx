import { useState } from "react"
import { getMaterialKind } from "./materialUtils"

export const OpportunityPosterPlaceholder = ({ title, compact = false }) => (
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

export default OpportunityMaterial
