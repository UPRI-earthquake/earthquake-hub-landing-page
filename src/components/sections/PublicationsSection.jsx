import SectionLayout from "./SectionLayout"
import publications from "../../data/publications"

const PublicationsSection = () => {
  return (
    <SectionLayout
      id="publications"
      label="Publications"
      variant="green-alt"
      className="publications-section"
    >
      <div className="publications-wrap">
        <h2 className="publications-wrap__title">Publications</h2>
        <div className="publications-cards">
          {publications.map((publication, index) => (
            <article
              key={`${publication.year}-${index}`}
              className="publication-card"
            >
              <header className="publication-card__header">
                <h3 className="publication-card__title">{publication.title}</h3>
                <span className="publication-card__year">{publication.year}</span>
              </header>
              <p className="publication-card__citation">{publication.citation}</p>
            </article>
          ))}
        </div>
      </div>
    </SectionLayout>
  )
}

export default PublicationsSection
