const SectionLayout = ({ id, label, variant, title, children }) => {
  return (
    <section
      id={id}
      className={`content-section content-section--${variant}`}
      aria-label={label}
    >
      <div className="content-section__inner">
        {title ? <h2 className="content-section__title">{title}</h2> : null}
        {children || <div className="content-section__slot" />}
      </div>
    </section>
  )
}

export default SectionLayout
