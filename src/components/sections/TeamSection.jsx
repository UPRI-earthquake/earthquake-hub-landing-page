import SectionLayout from "./SectionLayout"

const members = [
  { name: "Dr. Alfredo Mahar Francisco A. Lagmay", role: "Project Leader" },
  { name: "Engr. Christopher Jeff A. Sanchez", role: "Software Engineer, Team Lead" },
  { name: "Engr. John Christian C. Cabang", role: "Software Engineer, Team Lead" },
  { name: "Lyward Manuel S. Tongzon", role: "Software Engineer, 2024-intern" },
  { name: "Alyssa Patricia Ocampo", role: "2023-Intern" },
  { name: "Kim Nique", role: "2024-Intern" },
  { name: "Rebecca Yap", role: "2025-Intern" },
  { name: "John Rhey Bayotlang", role: "2026-Intern" },
  { name: "Samuel Chinguangco", role: "2026-Intern" },
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
