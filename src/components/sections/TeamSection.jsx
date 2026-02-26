import SectionLayout from "./SectionLayout"

const members = [
  { name: "Full Name Here", role: "Position" },
  { name: "Full Name Here", role: "Position" },
  { name: "Full Name Here", role: "Position" },
  { name: "Full Name Here", role: "Position" },
  { name: "Full Name Here", role: "Position" },
]

const TeamSection = () => {
  return (
    <SectionLayout id="team" label="Team" variant="dark">
      <div className="team">
        <header className="team__header">
          <h2 className="team__title">Meet the Team</h2>
          <p className="team__subtitle">The ones who make it happen</p>
        </header>

        <div className="team__grid" role="list" aria-label="Team members">
          {members.map((member, index) => (
            <article className="team__member" role="listitem" key={index}>
              <div className="team__avatar" aria-hidden="true" />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </article>
          ))}
        </div>
      </div>
    </SectionLayout>
  )
}

export default TeamSection
