import SectionLayout from "./SectionLayout"
import { useEffect, useState } from "react"
import { projects } from "../../data/projects"

const ProjectsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleNext = () => {
  if (currentIndex === projects.length - 1) {
    setCurrentIndex(0);
  } else {
    setCurrentIndex(currentIndex + 1);
  }
};

  const currentProject = projects[currentIndex]
  const projectImages = currentProject.images?.length
    ? currentProject.images
    : currentProject.image
      ? [currentProject.image]
      : []

  useEffect(() => {
    setCurrentImageIndex(0)
  }, [currentIndex])

  useEffect(() => {
    if (projectImages.length <= 1) {
      return
    }

    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % projectImages.length)
    }, 2500)

    return () => clearInterval(intervalId)
  }, [projectImages.length])

  return (
    <SectionLayout
      id="projects"
      label="Projects"
      variant="light"
      title="Projects"
    >
      <div className="project-card">
        <img
          src={projectImages[currentImageIndex]}
          alt={currentProject.title}
          className="project-image"
        />

        <div className="project-content">
          <h3 className="project-title">{currentProject.title}</h3>
          <p className="project-description">{currentProject.description}</p>
        </div>

        <button onClick={handleNext} className="next-btn" aria-label="Next project">
          &#10095;
        </button>

      </div>

    </SectionLayout>
  )
}

export default ProjectsSection
