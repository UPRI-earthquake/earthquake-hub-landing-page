import SectionLayout from "./SectionLayout"

const careers = []

const ComeWorkWithUsSection = () => {
  return (
    <SectionLayout id="come-work-with-us" label="Come Work With Us" variant="light">
      <div className="careers">
        <header className="careers__header">
          <h2 className="careers__title">Come work with us</h2>
          <p className="careers__subtitle">Opportunities await</p>
        </header>

        {careers.length > 0 ? (
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
        ) : (
          <p className="careers__empty">
            There are no job openings at the moment. Please check back soon.
          </p>
        )}
      </div>
    </SectionLayout>
  )
}

export default ComeWorkWithUsSection
