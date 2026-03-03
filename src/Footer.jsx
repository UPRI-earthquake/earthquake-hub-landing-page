const contactItems = [
  { type: 'phone', label: '', value: '123-456-7890' },
  { type: 'website', label: '', value: 'www.something.com' },
  { type: 'email', label: '', value: 'seismo.edu.ph' },
]

const ContactIcon = ({ type }) => {
  if (type === 'phone') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24a11.36 11.36 0 0 0 3.57.57c.56 0 1 .44 1 1V20a1 1 0 0 1-1 1C10.52 21 3 13.48 3 4a1 1 0 0 1 1-1h3.49c.56 0 1 .44 1 1 0 1.24.2 2.43.57 3.57.11.35.03.74-.25 1.02l-2.19 2.2Z" />
      </svg>
    )
  }

  if (type === 'website') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.92 9h-3.05a15.88 15.88 0 0 0-1.47-5.07A8.02 8.02 0 0 1 18.92 11Zm-6.92 9a13.9 13.9 0 0 1-2.12-5h4.24A13.9 13.9 0 0 1 12 20Zm-2.53-7a13.9 13.9 0 0 1 0-2h5.06a13.9 13.9 0 0 1 0 2H9.47ZM4.08 13h3.05c.1 1.75.62 3.49 1.47 5.07A8.02 8.02 0 0 1 4.08 13Zm3.05-2H4.08a8.02 8.02 0 0 1 4.52-5.07A15.88 15.88 0 0 0 7.13 11ZM12 4a13.9 13.9 0 0 1 2.12 5H9.88A13.9 13.9 0 0 1 12 4Zm2.4 14.07A15.88 15.88 0 0 0 15.87 13h3.05a8.02 8.02 0 0 1-4.52 5.07Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.24-8 5-8-5V6l8 5 8-5v2.24Z" />
    </svg>
  )
}

const Footer = () => {
  return (
    <footer id="contact-us" className="footer">
      <div className="footer__inner">
        <section className="footer__left" aria-label="Contact details">
          <div className="footer__brand">
            <p className="footer__brand-top">Resilience Institute</p>
            <p className="footer__brand-main">SEISMO</p>
          </div>

          <h2>Contact Us</h2>

          <ul className="footer__contacts">
            {contactItems.map((item) => (
              <li key={`${item.type}-${item.value}`}>
                <span className="footer__icon" aria-hidden="true">
                  <ContactIcon type={item.type} />
                </span>
                <span>
                  {item.label ? <strong>{item.label} </strong> : null}
                  {item.value}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <p className="footer__cta">Your Gateway to Seismic Resilience</p>
      </div>
    </footer>
  )
}

export default Footer
