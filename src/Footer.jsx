const contactGroups = [
  {
    title: 'UPRI Seismo Team',
    items: [
      { type: 'facebook', value: 'Facebook' },
      { type: 'phone', value: '1234567890' },
      { type: 'email', value: 'seismo.edu.ph' },
    ],
  },
  {
    title: 'University of the Philippines',
    items: [
      {
        type: 'facebook',
        value: 'Facebook',
        href: 'https://www.facebook.com/upsystem',
      },
      { type: 'phone', value: '289818500' },
    ],
  },
  {
    title: 'UP Resilience Institute',
    items: [
      {
        type: 'facebook',
        value: 'Facebook',
        href: 'https://www.facebook.com/UPResilienceInstitute',
      },
      { type: 'phone', value: '289818500' },
    ],
  },
]

const ContactIcon = ({ type }) => {
  if (type === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13.5 21v-7h2.3l.4-2.8h-2.7V9.4c0-.8.2-1.4 1.4-1.4h1.4V5.5c-.2 0-1-.1-2-.1-2 0-3.3 1.2-3.3 3.5v2.3H8.7V14H11v7h2.5Z" />
      </svg>
    )
  }

  if (type === 'phone') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24a11.36 11.36 0 0 0 3.57.57c.56 0 1 .44 1 1V20a1 1 0 0 1-1 1C10.52 21 3 13.48 3 4a1 1 0 0 1 1-1h3.49c.56 0 1 .44 1 1 0 1.24.2 2.43.57 3.57.11.35.03.74-.25 1.02l-2.19 2.2Z" />
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
          {contactGroups.map((group, index) => (
            <article
              className={`footer__column ${
                index === 2 ? 'footer__column--bottom-right' : ''
              }`}
              key={group.title}
            >
              <h2>{group.title}</h2>
              <ul className="footer__contacts">
                {group.items.map((item) => (
                  <li key={`${group.title}-${item.type}-${item.value}`}>
                    <span className="footer__icon" aria-hidden="true">
                      <ContactIcon type={item.type} />
                    </span>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noreferrer">
                        {item.value}
                      </a>
                    ) : (
                      <span>{item.value}</span>
                    )}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="footer__right" aria-label="Brand">
          <div className="footer__logo-card">
            <p className="footer__brand-top">Resilience Institute</p>
            <p className="footer__brand-main">SEISMO</p>
          </div>
          <p className="footer__cta">Your Gateway To Seismic Resilience</p>
        </section>
      </div>
    </footer>
  )
}

export default Footer
