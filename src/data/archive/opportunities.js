import { createOpportunity } from "../opportunity"
import electricalEngineerShakeTable2026 from "../../assets/opportunities/archive/electrical-engineer-shake-table-2026.png"
import electronicsControlsEngineerShakeTable2026 from "../../assets/opportunities/archive/electronics-controls-engineer-shake-table-2026.png"
import embeddedSystemsDeveloperShakeTable2026 from "../../assets/opportunities/archive/embedded-systems-developer-shake-table-2026.png"
import mechanicalEngineerShakeTable2026 from "../../assets/opportunities/archive/mechanical-engineer-shake-table-2026.png"
import backEndDeveloperSeismicNetwork2026 from "../../assets/opportunities/archive/back-end-developer-seismic-network-2026.png"
import frontEndDeveloperSeismicNetwork2026 from "../../assets/opportunities/archive/front-end-developer-seismic-network-2026.png"
import humanResourceManagementHeadPublicRelations2026 from "../../assets/opportunities/archive/human-resource-management-head-public-relations-2026.png"

// Closed postings are retained for reference and are not imported by the live page.
// This is the historical form URL; review it before restoring any role.
const APPLICATION_FORM_URL = "https://forms.gle/bV8pYXb3PL97TTqQ8"

export const archivedOpportunities = [
  createOpportunity({
    id: "electrical-engineer-shake-table-2026",
    title: "Electrical Engineer",
    project: "Shake Table Project",
    employmentType: "Contract of Service SG 15",
    compensation: "PHP 50,613.60",
    summary:
      "Contract of Service role for the Shake Table Project focused on electrical design, power distribution, and system commissioning.",
    materialSrc: electricalEngineerShakeTable2026,
    status: "closed",
    applyHref: APPLICATION_FORM_URL,
  }),
  createOpportunity({
    id: "electronics-controls-engineer-shake-table-2026",
    title: "Electronics/Controls Engineer",
    project: "Shake Table Project",
    employmentType: "Contract of Service SG 15",
    compensation: "PHP 50,613.60",
    summary:
      "Contract of Service role supporting the Shake Table Project through electronics and controls work.",
    materialSrc: electronicsControlsEngineerShakeTable2026,
    status: "closed",
    applyHref: APPLICATION_FORM_URL,
  }),
  createOpportunity({
    id: "embedded-systems-developer-shake-table-2026",
    title: "Embedded Systems Developer",
    project: "Shake Table Project",
    employmentType: "Contract of Service SG 15",
    compensation: "PHP 50,613.60",
    summary:
      "Contract of Service role for the Shake Table Project focused on embedded software, control logic, and hardware integration.",
    materialSrc: embeddedSystemsDeveloperShakeTable2026,
    status: "closed",
    applyHref: APPLICATION_FORM_URL,
  }),
  createOpportunity({
    id: "mechanical-engineer-shake-table-2026",
    title: "Mechanical Engineer",
    project: "Shake Table Project",
    employmentType: "Contract of Service SG 15",
    compensation: "PHP 50,613.60",
    summary:
      "Contract of Service role for the Shake Table Project focused on mechanical design review, fabrication support, and system testing.",
    materialSrc: mechanicalEngineerShakeTable2026,
    status: "closed",
    applyHref: APPLICATION_FORM_URL,
  }),
  createOpportunity({
    id: "back-end-developer-seismic-network-2026",
    title: "Back-end Developer",
    project: "Seismic Network Project",
    employmentType: "Contract of Service SG 14–18",
    compensation: "Up to PHP 64,581.60",
    summary:
      "Contract of Service role for the Seismic Network Project focused on APIs, data pipelines, and backend services.",
    materialSrc: backEndDeveloperSeismicNetwork2026,
    status: "closed",
    applyHref: APPLICATION_FORM_URL,
  }),
  createOpportunity({
    id: "front-end-developer-seismic-network-2026",
    title: "Front-end Developer",
    project: "Seismic Network Project",
    employmentType: "Contract of Service SG 14–18",
    compensation: "Up to PHP 64,581.60",
    summary:
      "Contract of Service role for the Seismic Network Project focused on dashboards, visualization tools, and user interfaces.",
    materialSrc: frontEndDeveloperSeismicNetwork2026,
    status: "closed",
    applyHref: APPLICATION_FORM_URL,
  }),
  createOpportunity({
    id: "human-resource-management-head-public-relations-2026",
    title: "Human Resource Management Head",
    project: "Public Relations",
    employmentType: "Contract of Service SG 10",
    compensation: "PHP 32,300.40",
    summary:
      "Contract of Service role for Public Relations focused on people coordination, documentation, and team support.",
    materialSrc: humanResourceManagementHeadPublicRelations2026,
    status: "closed",
    applyHref: APPLICATION_FORM_URL,
  }),
]
