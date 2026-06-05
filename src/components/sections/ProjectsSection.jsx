import SectionLayout from "./SectionLayout"
import { useEffect, useRef, useState } from "react"
import { projects } from "../../data/projects"
import { scrollToSection } from "../../utils/scroll"

const ProjectsSection = () => {
  const revealRefs = useRef([])
  const [visibleItems, setVisibleItems] = useState({})
  const [selectedId, setSelectedId] = useState(projects[0]?.id ?? null)

  useEffect(() => {
    const nodes = revealRefs.current.filter(Boolean)
    if (nodes.length === 0) {
      return undefined
    }

    if (!("IntersectionObserver" in window)) {
      setVisibleItems(
        nodes.reduce((acc, _, index) => {
          acc[index] = true
          return acc
        }, {}),
      )
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          const index = Number(entry.target.getAttribute("data-reveal-index"))
          if (Number.isNaN(index)) {
            return
          }

          setVisibleItems((prev) => {
            if (prev[index]) {
              return prev
            }

            return { ...prev, [index]: true }
          })

          observer.unobserve(entry.target)
        })
      },
      {
        threshold: [0.18],
        rootMargin: "0px 0px -8% 0px",
      },
    )

    nodes.forEach((node) => observer.observe(node))

    return () => {
      observer.disconnect()
    }
  }, [])

  const handleProjectSelect = (projectId) => {
    setSelectedId(projectId)
  }

  const handleActionClick = (e, action) => {
    if (action.isDisabled) {
      e.preventDefault()
      return
    }

    if (action.isInternal) {
      e.preventDefault()
      const element = document.querySelector(action.href)
      if (element) {
        scrollToSection(element)
        window.history.pushState(null, "", action.href)
      }
    }
  }

  const selectedProject =
    projects.find((project) => project.id === selectedId) ?? projects[0]

  const selectedIndex = projects.findIndex((project) => project.id === selectedProject?.id)

  const handleSelectorKeyDown = (event, projectIndex) => {
    const navigationKeys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"]

    if (!navigationKeys.includes(event.key)) {
      return
    }

    event.preventDefault()

    let nextIndex = projectIndex

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (projectIndex + 1) % projects.length
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (projectIndex - 1 + projects.length) % projects.length
    } else if (event.key === "Home") {
      nextIndex = 0
    } else if (event.key === "End") {
      nextIndex = projects.length - 1
    }

    const nextProject = projects[nextIndex]
    if (!nextProject) {
      return
    }

    setSelectedId(nextProject.id)

    const nextTab = document.getElementById(`project-tab-${nextProject.id}`)
    nextTab?.focus()
  }

  return (
    <SectionLayout
      id="projects"
      label="Projects"
      variant="light"
      title="Projects"
    >
      <div className="projects-showcase projects-showcase--ready">
        <div
          ref={(node) => {
            revealRefs.current[0] = node
          }}
          data-reveal-index="0"
          className={`projects-showcase__header projects-showcase__reveal projects-showcase__reveal--intro ${visibleItems[0] ? "projects-showcase__reveal--visible" : ""}`}
        >
          <p className="projects-showcase__intro">
            Research tools, public infrastructure, and learning experiences built to make earthquake
            science tangible.
          </p>
        </div>

        <div className="projects-showcase__body">
          <div
            ref={(node) => {
              revealRefs.current[1] = node
            }}
            data-reveal-index="1"
            className={`projects-selector projects-showcase__reveal projects-showcase__reveal--selector ${visibleItems[1] ? "projects-showcase__reveal--visible" : ""}`}
            role="tablist"
            aria-label="Project selector"
          >
            {projects.map((project, index) => {
              const isSelected = selectedProject.id === project.id

              return (
                <button
                  key={project.id}
                  id={`project-tab-${project.id}`}
                  type="button"
                  className={`projects-selector__item ${isSelected ? "is-active" : ""}`}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`project-panel-${project.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => handleProjectSelect(project.id)}
                  onKeyDown={(event) => handleSelectorKeyDown(event, index)}
                >
                  <span className="projects-selector__index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="projects-selector__content">
                    <span className="projects-selector__title">{project.title}</span>
                    <span className="projects-selector__keywords">{project.keywords}</span>
                  </span>
                </button>
              )
            })}
          </div>

          {selectedProject && (
            <article
              key={selectedProject.id}
              id={`project-panel-${selectedProject.id}`}
              ref={(node) => {
                revealRefs.current[2] = node
              }}
              data-reveal-index="2"
              className={`projects-spotlight projects-showcase__reveal projects-showcase__reveal--spotlight ${visibleItems[2] ? "projects-showcase__reveal--visible" : ""}`}
              role="tabpanel"
              aria-labelledby={`project-tab-${selectedProject.id}`}
              tabIndex={0}
            >
              <div className="projects-spotlight__media">
                <div className="projects-spotlight__image-shell">
                  <img
                    src={selectedProject.images}
                    alt={selectedProject.title}
                    className="projects-spotlight__image"
                  />
                </div>

                <div className="projects-spotlight__meta">
                  <span className="projects-spotlight__tag">Featured project</span>
                  <span className="projects-spotlight__count">
                    {String(selectedIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </span>
                </div>
              </div>

              <div className="projects-spotlight__content">
                <div className="projects-spotlight__heading">
                  <p className="projects-spotlight__eyebrow">{selectedProject.keywords}</p>
                  <h3 className="projects-spotlight__title">{selectedProject.title}</h3>
                </div>
                <p className="projects-spotlight__description">{selectedProject.description}</p>
                <div className="projects-spotlight__actions">
                  {selectedProject.actions?.map((action) => {
                    const className = `projects-spotlight__link ${action.variant === "secondary" ? "projects-spotlight__link--secondary" : ""} ${action.isDisabled ? "projects-spotlight__link--disabled" : ""}`.trim()

                    if (action.isDisabled) {
                      return (
                        <span
                          key={`${selectedProject.id}-${action.text}`}
                          className={className}
                          aria-disabled="true"
                        >
                          {action.text} <span aria-hidden="true">→</span>
                        </span>
                      )
                    }

                    return (
                      <a
                        key={`${selectedProject.id}-${action.text}`}
                        href={action.href}
                        className={className}
                        target={action.isInternal ? "_self" : "_blank"}
                        rel={action.isInternal ? "" : "noopener noreferrer"}
                        onClick={(e) => handleActionClick(e, action)}
                      >
                        {action.text} <span aria-hidden="true">→</span>
                      </a>
                    )
                  })}
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </SectionLayout>
  )
}

export default ProjectsSection
