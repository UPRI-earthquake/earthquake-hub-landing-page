import { createOpportunity } from "./opportunity"
import uiUxDesignerSeismicNetwork2026 from "../assets/opportunities/ui-ux-designer-seismic-network-2026.png"
import scienceCommunicatorPublicRelations2026 from "../assets/opportunities/science-communicator-public-relations-2026.png"

// Update this link when the application form changes. Each active role uses it below.
const APPLICATION_FORM_URL = "https://forms.gle/bV8pYXb3PL97TTqQ8"

export const opportunities = [
  createOpportunity({
    id: "ui-ux-designer-seismic-network-2026",
    title: "UI/UX Designer",
    project: "Seismic Network Project",
    employmentType: "Contract of Service SG 14–18",
    compensation: "Up to PHP 64,581.60",
    summary:
      "Contract of Service role for the Seismic Network Project focused on user-centered interfaces, prototypes, and data usability.",
    materialSrc: uiUxDesignerSeismicNetwork2026,
    status: "open",
    applyHref: APPLICATION_FORM_URL,
  }),
  createOpportunity({
    id: "science-communicator-public-relations-2026",
    title: "Science Communicator",
    project: "Public Relations",
    employmentType: "Contract of Service SG 14",
    compensation: "PHP 46,516.80",
    summary:
      "Contract of Service role for Public Relations focused on science communication, storytelling, and community-facing content.",
    materialSrc: scienceCommunicatorPublicRelations2026,
    status: "open",
    applyHref: APPLICATION_FORM_URL,
  }),
]
