const contactItems = [
  { label: 'Contact No:', value: '123-456-7890' },
  { label: 'Website:', value: 'www.something.com' },
  { label: 'Email:', value: 'seismo.edu.ph' },
]

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <section className="footer__left" aria-label="Contact details">
          <div className="footer__brand">
            <p className="footer__brand-top">Resilience Institute</p>
            <p className="footer__brand-main">SEISMO</p>
          </div>

          <h2>Contact Us</h2>

          <ul className="footer__contacts">
            {contactItems.map((item) => (
              <li key={item.label}>
                <span className="footer__dot" aria-hidden="true" />
                <span>
                  <strong>{item.label}</strong> {item.value}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <p className="footer__cta">Reach out to us today</p>
      </div>
    </footer>
  )
}

export default Footer
