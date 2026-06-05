import electricalEngineerShakeTable2026 from "../assets/opportunities/electrical-engineer-shake-table-2026.png"
import electronicsControlsEngineerShakeTable2026 from "../assets/opportunities/electronics-controls-engineer-shake-table-2026.png"
import embeddedSystemsDeveloperShakeTable2026 from "../assets/opportunities/embedded-systems-developer-shake-table-2026.png"
import mechanicalEngineerShakeTable2026 from "../assets/opportunities/mechanical-engineer-shake-table-2026.png"
import backEndDeveloperSeismicNetwork2026 from "../assets/opportunities/back-end-developer-seismic-network-2026.png"
import frontEndDeveloperSeismicNetwork2026 from "../assets/opportunities/front-end-developer-seismic-network-2026.png"
import serverEngineerSeismicNetwork2026 from "../assets/opportunities/server-engineer-seismic-network-2026.png"
import uiUxDesignerSeismicNetwork2026 from "../assets/opportunities/ui-ux-designer-seismic-network-2026.png"
import humanResourceManagementHeadPublicRelations2026 from "../assets/opportunities/human-resource-management-head-public-relations-2026.png"
import scienceCommunicatorPublicRelations2026 from "../assets/opportunities/science-communicator-public-relations-2026.png"
import projectCoordinatorQuakeQuest2026 from "../assets/opportunities/project-coordinator-quake-quest-2026.png"
import communicationsCommitteeHeadQuakeQuest2026 from "../assets/opportunities/communications-committee-head-quake-quest-2026.png"
import creativesCommitteeHeadQuakeQuest2026 from "../assets/opportunities/creatives-committee-head-quake-quest-2026.png"
import logisticsCommitteeHeadQuakeQuest2026 from "../assets/opportunities/logistics-committee-head-quake-quest-2026.png"

const createOpportunity = ({
  id,
  title,
  project,
  employmentType,
  compensation,
  summary,
  materialSrc,
}) => ({
  id,
  title,
  project,
  employmentType,
  compensation,
  summary,
  materialSrc,
  materialType: "image",
  materialAlt: `Official hiring poster for the ${title} role under ${project}`,
  status: "Open",
  applyLabel: "Apply",
  applyHref: null,
})

export const opportunities = [
  createOpportunity({
    id: "electrical-engineer-shake-table-2026",
    title: "Electrical Engineer",
    project: "Shake Table Project",
    employmentType: "Contract of Service SG 15",
    compensation: "PHP 50,613.60",
    summary:
      "Contract of Service role for the Shake Table Project focused on electrical design, power distribution, and system commissioning.",
    materialSrc: electricalEngineerShakeTable2026,
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
  }),
  createOpportunity({
    id: "back-end-developer-seismic-network-2026",
    title: "Back-end Developer",
    project: "Seismic Network Project",
    employmentType: "Contract of Service SG 18",
    compensation: "PHP 64,581.60",
    summary:
      "Contract of Service role for the Seismic Network Project focused on APIs, data pipelines, and backend services.",
    materialSrc: backEndDeveloperSeismicNetwork2026,
  }),
  createOpportunity({
    id: "front-end-developer-seismic-network-2026",
    title: "Front-end Developer",
    project: "Seismic Network Project",
    employmentType: "Contract of Service SG 18",
    compensation: "PHP 64,581.60",
    summary:
      "Contract of Service role for the Seismic Network Project focused on dashboards, visualization tools, and user interfaces.",
    materialSrc: frontEndDeveloperSeismicNetwork2026,
  }),
  createOpportunity({
    id: "server-engineer-seismic-network-2026",
    title: "Server Engineer",
    project: "Seismic Network Project",
    employmentType: "Contract of Service SG 18",
    compensation: "PHP 64,581.60",
    summary:
      "Contract of Service role for the Seismic Network Project focused on servers, infrastructure, deployment, and system reliability.",
    materialSrc: serverEngineerSeismicNetwork2026,
  }),
  createOpportunity({
    id: "ui-ux-designer-seismic-network-2026",
    title: "UI/UX Designer",
    project: "Seismic Network Project",
    employmentType: "Contract of Service SG 18",
    compensation: "PHP 64,581.60",
    summary:
      "Contract of Service role for the Seismic Network Project focused on user-centered interfaces, prototypes, and data usability.",
    materialSrc: uiUxDesignerSeismicNetwork2026,
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
  }),
  createOpportunity({
    id: "project-coordinator-quake-quest-2026",
    title: "Project Coordinator",
    project: "Quake Quest Project",
    employmentType: "Contract of Service SG 11",
    compensation: "PHP 38,046.00",
    summary:
      "Contract of Service role for the Quake Quest Project focused on project planning, team coordination, and competition delivery.",
    materialSrc: projectCoordinatorQuakeQuest2026,
  }),
  createOpportunity({
    id: "communications-committee-head-quake-quest-2026",
    title: "Communications Committee Head",
    project: "Quake Quest Project",
    employmentType: "Contract of Service SG 10",
    compensation: "PHP 32,300.40",
    summary:
      "Contract of Service role for the Quake Quest Project focused on participant communications, partnerships, and promotions.",
    materialSrc: communicationsCommitteeHeadQuakeQuest2026,
  }),
  createOpportunity({
    id: "creatives-committee-head-quake-quest-2026",
    title: "Creatives Committee Head",
    project: "Quake Quest Project",
    employmentType: "Contract of Service SG 10",
    compensation: "PHP 32,300.40",
    summary:
      "Contract of Service role for the Quake Quest Project focused on creative direction, visual materials, and campaign assets.",
    materialSrc: creativesCommitteeHeadQuakeQuest2026,
  }),
  createOpportunity({
    id: "logistics-committee-head-quake-quest-2026",
    title: "Logistics Committee Head",
    project: "Quake Quest Project",
    employmentType: "Contract of Service SG 10",
    compensation: "PHP 32,300.40",
    summary:
      "Contract of Service role for the Quake Quest Project focused on event logistics, registration, operations, and participant support.",
    materialSrc: logisticsCommitteeHeadQuakeQuest2026,
  }),
]
