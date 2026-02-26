import SectionLayout from "./SectionLayout"

const careers = [
  {
    title: "Career 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Career 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageLabel: "career picture here",
  },
  {
    title: "Career 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
]

const ComeWorkWithUsSection = () => {
  return (
    <SectionLayout id="come-work-with-us" label="Come Work With Us" variant="light">
      <div className="careers">
        <header className="careers__header">
          <h2 className="careers__title">Come work with us</h2>
          <p className="careers__subtitle">Opportunities await</p>
        </header>

        <div className="careers__grid">
          {careers.map((career) => (
            <article className="career-card" key={career.title}>
              <div className="career-card__image">{career.imageLabel || null}</div>
              <div className="career-card__body">
                <h3>{career.title}</h3>
                <p>{career.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionLayout>
  )
}

export default ComeWorkWithUsSection
