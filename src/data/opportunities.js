import { createOpportunity } from "./opportunity"
import uiUxDesignerSeismicNetwork2026 from "../assets/opportunities/UPRI-Hiring-UI-UX-Designer-Seismic-Network-2026.png"
import scienceCommunicatorPublicRelations2026 from "../assets/opportunities/UPRI-Hiring-Science-Communicator-Public-Relations-and-Management-2026.png"
import engineeringLogisticsMaterialsAide2026 from "../assets/opportunities/UPRI-Hiring-Office-Aide-Engineering-Logistics-Materials-Aide-2026.png"
import electricalEngineeringTechnicalAide2026 from "../assets/opportunities/Upri-Hiring-Electrical-Engineering-Technical-Aide-2026.png"
import mechanicalFabricationAssemblyAide2026 from "../assets/opportunities/Upri-Hiring-Mechanical-Fabrication-Assembly-Aide-2026.png"

// Update this link when the application form changes. Each active role uses it below.
const APPLICATION_FORM_URL = "https://forms.gle/qgTkKda7vqGTaZXw6"  

export const opportunities = [
  createOpportunity({
    id: "UPRI Hiring - UI_UX DESIGNER - Seismic Network",
    title: "UI/UX Designer",
    project: "Seismic Network Project",
    employmentType: "Contract of Service SG 15",
    compensation: "PHP 50,613.60",
    summary:
      "Contract of Service role focused on user-centered interface design, interactive prototypes, seismic data visualization, design systems, and visual communication.",
    materialSrc: uiUxDesignerSeismicNetwork2026,
    status: "open",
    applyHref: APPLICATION_FORM_URL,
  }),
  createOpportunity({
    id: "UPRI Hiring - SCIENCE COMMUNICATOR  - Public Relations and Management Updated",
    title: "Science Communicator",
    project: "Public Relations",
    employmentType: "Contract of Service SG 14",
    compensation: "PHP 46,516.80",
    summary:
      "Contract of Service role focused on science communication, visual storytelling, multimedia production, digital content creation, and public engagement.",
    materialSrc: scienceCommunicatorPublicRelations2026,
    status: "open",
    applyHref: APPLICATION_FORM_URL,
  }),
  createOpportunity({
    id: "UPRI Hiring - Office Aide - Engineering Logistics & Materials Aide",
    title: "Engineering Logistics & Materials Aide",
    project: "Shake Table Project",
    employmentType: "Contract of Service SG 6",
    compensation: "PHP 23,659.20",
    summary:
      "Contract of Service role supporting engineering projects through inventory management, procurement, supplier coordination, and materials logistics.",
    materialSrc: engineeringLogisticsMaterialsAide2026,
    status: "open",
    applyHref: APPLICATION_FORM_URL,
  }),
  createOpportunity({
    id: "UPRI Hiring -  Electrical & Engineering Technical Aide",
    title: "Electrical & Engineering Technical Aide",
    project: "Shake Table Project",
    employmentType: "Contract of Service SG 6",
    compensation: "PHP 23,659.20",
    summary:
      "Contract of Service role supporting engineers in electrical assembly, wiring preparation, equipment maintenance, and technical testing.",
    materialSrc: electricalEngineeringTechnicalAide2026,
    status: "open",
    applyHref: APPLICATION_FORM_URL,
  }),
  createOpportunity({
    id: "UPRI Hiring - Mechanical Fabrication & Assembly Aide",
    title: "Mechanical Fabrication & Assembly Aide",
    project: "Shake Table Project",
    employmentType: "Contract of Service SG 6",
    compensation: "PHP 23,659.20",
    summary:
      "Contract of Service role supporting shake table development through mechanical fabrication, component assembly, workshop operations, and equipment maintenance.",
    materialSrc: mechanicalFabricationAssemblyAide2026,
    status: "open",
    applyHref: APPLICATION_FORM_URL,
  }),
]
