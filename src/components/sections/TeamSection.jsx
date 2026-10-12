import SectionLayout from "./SectionLayout"
import useScrollReveal from "../../hooks/useScrollReveal"
import { members, teamGroups } from "../../data/team"

const memberProfileImages = import.meta.glob(
  "../../assets/team/*/profile.{avif,webp,png,jpg,jpeg}",
  { eager: true, import: "default" },
)

const profileImageBySlug = Object.fromEntries(
  Object.entries(memberProfileImages).map(([path, src]) => {
    const match = path.match(/\/team\/([^/]+)\/profile\.[^/.]+$/)
    return match ? [match[1], src] : null
  }).filter(Boolean),
)

const getInitials = (name) =>
  name
    .replace(/^(Dr\.|Engr\.)\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .filter((_, index, parts) => index === 0 || index === parts.length - 1)
    .map((part) => part[0])
    .join("")
    .toUpperCase()

const splitRole = (role) => {
  const parts = role.split(",").map((part) => part.trim()).filter(Boolean)

  return {
    primary: parts[0] ?? "",
    secondary: parts[1] ?? "",
  }
}

const renderMemberCard = (member, { featured = false } = {}) => {
  const { primary, secondary } = splitRole(member.role)
  const profileImage = profileImageBySlug[member.slug]

  return (
    <article
      className={`team-card${featured ? " team-card--featured" : ""}`}
      role="listitem"
      key={member.name}
    >
      <div className="team-card__top">
        <div className="team-card__avatar" aria-hidden={profileImage ? undefined : "true"}>
          {profileImage ? (
            <img
              className="team-card__avatar-image"
              src={profileImage}
              alt={member.name}
              loading="lazy"
            />
          ) : (
            getInitials(member.name)
          )}
        </div>
      </div>

      <div className="team-card__body">
        <h4>{member.name}</h4>
        <p className="team-card__role">
          <span>{primary}</span>
          {secondary ? <span className="team-card__detail">{secondary}</span> : null}
        </p>
      </div>
    </article>
  )
}

const TeamSection = () => {
  const { setRevealRef, visibleItems } = useScrollReveal(teamGroups.length + 1)

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
              Leadership, project teams, and administration behind SEISMO.
            </p>
          </header>

          <div className="team__roster">
            {teamGroups.map((group, index) => {
              const groupMembers = members.filter((member) => member.group === group.id)
              const revealIndex = index + 1
              const isLeadership = group.id === "leadership"

              return (
                <section
                  key={group.id}
                  ref={setRevealRef(revealIndex)}
                  data-reveal-index={revealIndex}
                  className={`team__group motion-reveal${visibleItems[revealIndex] ? " is-visible" : ""}`}
                  style={{ "--motion-order": revealIndex }}
                  aria-labelledby={`team-${group.id}-heading`}
                >
                  <div className="team__group-header">
                    <h3 id={`team-${group.id}-heading`} className="team__group-title">{group.label}</h3>
                    {group.description ? <p className="team__group-copy">{group.description}</p> : null}
                  </div>

                  <div
                    className={isLeadership ? "team__leadership-grid" : "team__contributors-grid"}
                    role="list"
                    aria-label={group.label}
                  >
                    {groupMembers.map((member) => renderMemberCard(member, { featured: isLeadership }))}
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}

export default TeamSection
