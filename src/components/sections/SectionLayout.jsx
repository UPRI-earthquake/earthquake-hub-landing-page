const SectionLayout = ({ id, label, variant, title, className = "", children }) => {
  return (
    <section
      id={id}
      className={`content-section content-section--${variant} content-section--slide ${className}`.trim()}
      aria-label={label}
    >
      <div className="content-section__inner">
        {title ? <h2 className="content-section__title">{title}</h2> : null}
        {children}
      </div>
    </section>
  )
}

export default SectionLayout
