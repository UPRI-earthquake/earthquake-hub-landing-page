import SectionLayout from "./SectionLayout"
import useScrollReveal from "../../hooks/useScrollReveal"

const members = [
  { name: "Dr. Alfredo Mahar Francisco A. Lagmay", role: "UPRI Executive Director" },
  { name: "Engr. Christopher Jeff A. Sanchez", role: "Software Engineer, Team Consultant" },
  { name: "Engr. John Christian C. Cabang", role: "Software Engineer, Team Lead" },
  { name: "Lyward Manuel S. Tongzon", role: "Software Engineer" },
  { name: "Alyssa Patricia Ocampo", role: "2023-Intern" },
  { name: "Kim Nique", role: "2024-Intern" },
  { name: "Rebecca Yap", role: "2025-Intern" },
  { name: "John Rhey Bayotlang", role: "2026-Intern" },
  { name: "Samuel Chinguangco", role: "2026-Intern" },
]

const projectLeader = members.find((member) => member.role === "UPRI Executive Director")

const projectDevelopers = members.filter(
  (member) =>
    member !== projectLeader &&
    (
      member.role.toLowerCase().includes("team lead") ||
      member.role.toLowerCase().includes("team consultant") ||
      member.name === "Lyward Manuel S. Tongzon"
    )
)

const interns = members.filter(
  (member) => member !== projectLeader && !projectDevelopers.includes(member)
)

const getInitials = (name) =>
  name
    .replace(/^(Dr\.|Engr\.)\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()

const formatRole = (role) =>
  role
    .replace(/(\d{4})-(intern)/gi, (_, year, label) => `${year} ${label}`)
    .replace(/\bintern\b/gi, "Intern")

const splitRole = (role) => {
  const parts = formatRole(role).split(",").map((part) => part.trim()).filter(Boolean)

  return {
    primary: parts[0] ?? "",
    secondary: parts[1] ?? "",
  }
}

const renderMemberCard = (member, { featured = false } = {}) => {
  const { primary, secondary } = splitRole(member.role)

  return (
    <article
      className={`team-card${featured ? " team-card--featured" : ""}`}
      role="listitem"
      key={member.name}
    >
      <div className="team-card__top">
        <div className="team-card__avatar" aria-hidden="true">{getInitials(member.name)}</div>
      </div>

      <div className="team-card__body">
        <h3>{member.name}</h3>
        <p className="team-card__role">
          <span>{primary}</span>
          {secondary ? <span className="team-card__detail">{secondary}</span> : null}
        </p>
      </div>
    </article>
  )
}

const TeamSection = () => {
  const { setRevealRef, visibleItems } = useScrollReveal(4)

  return (
    <SectionLayout id="team" label="Team" variant="dark">
      <div className="team motion-group motion-group--ready">
        <div
          ref={setRevealRef(0)}
          data-reveal-index="0"
          className={`team__panel motion-reveal${visibleItems[0] ? " is-visible" : ""}`}
          style={{ "--motion-order": 0 }}
        >
          <header className="team__header">
            <h2 className="team__title">Meet the Team</h2>
            <p className="team__subtitle">
              Leadership, project development, and internship support behind SEISMO.
            </p>
          </header>

          <div className="team__roster">
            <section
              ref={setRevealRef(1)}
              data-reveal-index="1"
              className={`team__group motion-reveal${visibleItems[1] ? " is-visible" : ""}`}
              style={{ "--motion-order": 1 }}
              aria-labelledby="team-leadership-heading"
            >
              <div className="team__group-header">
                <h3 id="team-leadership-heading" className="team__group-title">Leadership</h3>
                <p className="team__group-copy">Research direction and oversight.</p>
              </div>

              <div className="team__leadership-grid" role="list" aria-label="Leadership team">
                {projectLeader ? renderMemberCard(projectLeader, { featured: true }) : null}
              </div>
            </section>

            <section
              ref={setRevealRef(2)}
              data-reveal-index="2"
              className={`team__group motion-reveal${visibleItems[2] ? " is-visible" : ""}`}
              style={{ "--motion-order": 2 }}
              aria-labelledby="team-developers-heading"
            >
              <div className="team__group-header">
                <h3 id="team-developers-heading" className="team__group-title">Project Developers</h3>
                <p className="team__group-copy">
                  Active engineering and delivery support.
                </p>
              </div>

              <div className="team__contributors-grid" role="list" aria-label="Project developers">
                {projectDevelopers.map((member) => renderMemberCard(member))}
              </div>
            </section>

            <section
              ref={setRevealRef(3)}
              data-reveal-index="3"
              className={`team__group motion-reveal${visibleItems[3] ? " is-visible" : ""}`}
              style={{ "--motion-order": 3 }}
              aria-labelledby="team-contributors-heading"
            >
              <div className="team__group-header">
                <h3 id="team-contributors-heading" className="team__group-title">Intern Contributors</h3>
                <p className="team__group-copy">
                  Internship contributors across recent cohorts.
                </p>
              </div>

              <div className="team__contributors-grid" role="list" aria-label="Intern contributors">
                {interns.map((member) => renderMemberCard(member))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}

export default TeamSection
