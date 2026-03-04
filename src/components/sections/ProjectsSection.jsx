import SectionLayout from "./SectionLayout"
import { useState } from "react"
import { projects } from "../../data/projects"

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null)

  const handleCardClick = (project) => {
    setSelectedProject(project)
  }

  const handleBackClick = () => {
    setSelectedProject(null)
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
      {selectedProject ? (
        <div className="projects-expanded">
          <button
            className="projects-back-btn"
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

          <div className="project-expanded-card">
            <div className="project-expanded-header">
              <img
                src={selectedProject.images}
                alt={selectedProject.title}
                className="project-expanded-image"
              />
              <h3 className="project-expanded-title">
                What is {selectedProject.title}?
              </h3>
            </div>
            <p className="project-expanded-description">
              {selectedProject.description}
            </p>
            <a
              href={selectedProject.linkHref}
              className="project-expanded-link"
              target={selectedProject.isInternalLink ? "_self" : "_blank"}
              rel={selectedProject.isInternalLink ? "" : "noopener noreferrer"}
              onClick={(e) => handleLinkClick(e, selectedProject)}
            >
              {selectedProject.linkText} <span className="link-arrow">→</span>
            </a>
          </div>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card-item"
              onClick={() => handleCardClick(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleCardClick(project)
                }
              }}
            >
              <div className="project-card-image-container">
                <img
                  src={project.images}
                  alt={project.title}
                  className="project-card-image"
                />
              </div>
              <h3 className="project-card-title">{project.title}</h3>
              <p className="project-card-keywords">{project.keywords}</p>
            </div>
          ))}
        </div>
      )}
    </SectionLayout>
  )
}

export default ProjectsSection
