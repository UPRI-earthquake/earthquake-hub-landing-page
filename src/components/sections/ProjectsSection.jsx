import SectionLayout from "./SectionLayout"
import { useState } from "react"
import { projects } from "../../data/projects"

const ProjectsSection = () => {
  const [selectedId, setSelectedId] = useState(null)

  const handleCardClick = (projectId) => {
    setSelectedId(projectId)
  }

  const handleBackClick = (e) => {
    e.stopPropagation()
    setSelectedId(null)
  }

  const handleLinkClick = (e, project) => {
    e.stopPropagation()
    if (project.isInternalLink) {
      e.preventDefault()
      const element = document.querySelector(project.linkHref)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <SectionLayout
      id="projects"
      label="Projects"
      variant="light"
      title="Projects"
    >
      <div className={`projects-container ${selectedId ? "has-selection" : ""}`}>
        {selectedId && (
          <button
            className="project-back-btn"
            onClick={handleBackClick}
            aria-label="Back to projects"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {projects.map((project) => {
          const isSelected = selectedId === project.id
          const isHidden = selectedId && !isSelected

          return (
            <div
              key={project.id}
              className={`project-card-item ${isSelected ? "project-card-item--expanded" : ""} ${isHidden ? "project-card-item--hidden" : ""}`}
              onClick={() => !isSelected && handleCardClick(project.id)}
              role="button"
              tabIndex={isHidden ? -1 : 0}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && !isSelected) {
                  handleCardClick(project.id)
                }
              }}
            >
              <div className="project-card-header">
                <div className="project-card-image-container">
                  <img
                    src={project.images}
                    alt={project.title}
                    className="project-card-image"
                  />
                </div>
                <h3 className="project-card-title">
                  {isSelected ? `What is ${project.title}?` : project.title}
                </h3>
              </div>

              {!isSelected && (
                <p className="project-card-keywords">{project.keywords}</p>
              )}

              {isSelected && (
                <div className="project-card-details">
                  <p className="project-card-description">
                    {project.description}
                  </p>
                  <a
                    href={project.linkHref}
                    className="project-card-link"
                    target={project.isInternalLink ? "_self" : "_blank"}
                    rel={project.isInternalLink ? "" : "noopener noreferrer"}
                    onClick={(e) => handleLinkClick(e, project)}
                  >
                    {project.linkText} <span className="link-arrow">→</span>
                  </a>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </SectionLayout>
  )
}

export default ProjectsSection
