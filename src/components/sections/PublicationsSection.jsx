import SectionLayout from "./SectionLayout"
import publications from "../../data/publications"
import useScrollReveal from "../../hooks/useScrollReveal"

const sortedPublications = [...publications].sort((left, right) => {
  if (right.year !== left.year) {
    return right.year - left.year
  }

  return left.title.localeCompare(right.title)
})

const publicationGroups = sortedPublications.reduce((groups, publication) => {
  const yearKey = String(publication.year)

  if (!groups[yearKey]) {
    groups[yearKey] = []
  }

  groups[yearKey].push(publication)
  return groups
}, {})

const publicationYears = Object.entries(publicationGroups)
const latestPublication = sortedPublications[0] ?? null
const shouldUseScrollableTimeline = sortedPublications.length >= 4

const PublicationsSection = () => {
  const { setRevealRef, visibleItems } = useScrollReveal(publicationYears.length + 1)

  return (
    <SectionLayout
      id="publications"
      label="Publications"
      variant="green-alt"
      className="publications-section"
    >
      <div className="publications-archive motion-group motion-group--ready">
        <div
          ref={setRevealRef(0)}
          data-reveal-index="0"
          className={`publications-archive__header motion-reveal${visibleItems[0] ? " is-visible" : ""}`}
          style={{ "--motion-order": 0 }}
        >
          <div className="publications-archive__heading">
            <p className="publications-archive__eyebrow">Research contributions</p>
            <h2 className="publications-archive__title">Publications</h2>
            <p className="publications-archive__subtitle">
              Peer-reviewed outputs, conference papers, and research contributions from the SEISMO team.
            </p>
          </div>
        </div>

        <div
          className={`publications-timeline ${shouldUseScrollableTimeline ? "publications-timeline--scrollable" : ""}`}
          aria-label={shouldUseScrollableTimeline ? "Scrollable publication timeline archive" : "Publication timeline archive"}
          tabIndex={shouldUseScrollableTimeline ? 0 : undefined}
        >
          {publicationYears.map(([year, items], index) => (
            <section
              key={year}
              ref={setRevealRef(index + 1)}
              data-reveal-index={index + 1}
              className={`publications-year-group motion-reveal${visibleItems[index + 1] ? " is-visible" : ""}`}
              style={{ "--motion-order": index + 1 }}
              aria-labelledby={`publications-year-${year}`}
            >
              <div className="publications-year-group__header">
                <div className="publications-year-group__heading">
                  <h3 id={`publications-year-${year}`} className="publications-year-group__year">
                    {year}
                  </h3>
                  {latestPublication && year === String(latestPublication.year) ? (
                    <span className="publications-year-group__label">Latest publication</span>
                  ) : null}
                </div>
                <p className="publications-year-group__count">
                  {items.length} {items.length === 1 ? "publication" : "publications"}
                </p>
              </div>

              <div className="publications-year-group__entries">
                {items.map((publication, index) => {
                  const isLatest = publication === latestPublication

                  return (
                    <a
                      key={`${publication.title}-${index}`}
                      className={`publication-entry ${isLatest ? "publication-entry--latest" : ""}`}
                      href={publication.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="publication-entry__rail" aria-hidden="true">
                        <span className="publication-entry__marker" />
                      </div>

                      <article className="publication-entry__card">
                        <div className="publication-entry__topline">
                          <span className="publication-entry__type">{publication.type}</span>
                          {publication.status ? (
                            <span className="publication-entry__status">{publication.status}</span>
                          ) : null}
                        </div>

                        <h4 className="publication-entry__title">{publication.title}</h4>
                        <p className="publication-entry__authors">{publication.authors}</p>

                        <dl className="publication-entry__meta">
                          <div>
                            <dt>Venue</dt>
                            <dd>{publication.venue}</dd>
                          </div>
                          {publication.location ? (
                            <div>
                              <dt>Location</dt>
                              <dd>{publication.location}</dd>
                            </div>
                          ) : null}
                          {publication.pages ? (
                            <div>
                              <dt>Pages</dt>
                              <dd>{publication.pages}</dd>
                            </div>
                          ) : null}
                        </dl>

                        <span className="publication-entry__cta">
                          {publication.ctaLabel ?? "View Publication"}
                          <span aria-hidden="true">↗</span>
                        </span>
                      </article>
                    </a>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </SectionLayout>
  )
}

export default PublicationsSection
