export const getMaterialKind = (opportunity) => {
  if (opportunity.materialType) {
    return opportunity.materialType
  }

  if (typeof opportunity.materialSrc === "string" && opportunity.materialSrc.toLowerCase().endsWith(".pdf")) {
    return "pdf"
  }

  return "image"
}
