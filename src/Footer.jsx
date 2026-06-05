import useScrollReveal from "./hooks/useScrollReveal"
import upSeal from './assets/UP-Seal.avif'
import upriLogo from './assets/UPRI-logo.avif'

const importantLinks = [
  {
    label: 'Seismic Network',
    href: 'https://earthquake.science.upd.edu.ph/',
    external: true,
  },
  {
    label: 'Official Documentation',
    href: 'https://upri-earthquake.github.io/',
    external: true,
  },
  {
    label: 'UP Resilience Institute',
    href: 'https://resilience.up.edu.ph/',
    external: true,
  },
]

const contactDetails = [
  {
    label: 'Email',
    value: 'earthquake@science.upd.edu.ph',
    href: 'mailto:earthquake@science.upd.edu.ph',
  },
  {
    label: 'Phone',
    value: '(02) 8981-8500 loc. 3771',
    href: 'tel:+63289818500',
  },
  {
    label: 'Address',
    value: 'UPRI, Magsaysay Ave. cor. Apacible St., UP Diliman, Quezon City, Philippines',
  },
]

const socialLinks = [
  {
    label: 'UP Resilience Institute',
    href: 'https://www.facebook.com/UPResilienceInstitute',
  },
  {
    label: 'Earthquake Citizen Science Philippines',
    href: 'https://www.facebook.com/groups/728109561898546',
  },
  {
    label: 'Quake Quest',
    href: 'https://www.facebook.com/quakequest/',
  },
]

const FooterIcon = ({ type }) => {
  if (type === 'email') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.24-8 5-8-5V6l8 5 8-5v2.24Z" />
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

  if (type === 'location') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13.5 21v-7h2.3l.4-2.8h-2.7V9.4c0-.8.2-1.4 1.4-1.4h1.4V5.5c-.2 0-1-.1-2-.1-2 0-3.3 1.2-3.3 3.5v2.3H8.7V14H11v7h2.5Z" />
    </svg>
  )
}

const Footer = () => {
  const { setRevealRef, visibleItems } = useScrollReveal(3)

  const getContactIconType = (label) => {
    if (label === 'Email') {
      return 'email'
    }

    if (label === 'Phone') {
      return 'phone'
    }

    return 'location'
  }

  return (
    <footer id="contact-us" className="footer motion-group motion-group--ready">
      <div className="footer__inner">
        <section
          ref={setRevealRef(0)}
          data-reveal-index="0"
          className={`footer__identity motion-reveal${visibleItems[0] ? " is-visible" : ""}`}
          style={{ "--motion-order": 0 }}
          aria-labelledby="footer-brand"
        >
          <div className="footer__logos" aria-label="Institutional logos">
            <img
              className="footer__institution-logo"
              src={upriLogo}
              alt="UP Resilience Institute"
              loading="lazy"
              decoding="async"
            />
            <img
              className="footer__institution-logo"
              src={upSeal}
              alt="University of the Philippines"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div>
            <p className="footer__eyebrow">UP Resilience Institute</p>
            <h2 id="footer-brand" className="footer__brand">
              UPRI Seismo Team
            </h2>
          </div>

          <p className="footer__description">
            Advancing citizen science, seismic networks, and community resilience
            through research, technology, and education.
          </p>

          <address className="footer__contact-list" aria-label="Contact details">
            {contactDetails.map((item) => (
              <p className="footer__contact-item" key={item.label}>
                <span className="footer__icon" aria-hidden="true">
                  <FooterIcon type={getContactIconType(item.label)} />
                </span>
                <span>
                  <span className="footer__contact-label">{item.label}</span>
                  {item.href ? <a href={item.href}>{item.value}</a> : <span>{item.value}</span>}
                </span>
              </p>
            ))}
          </address>
        </section>

        <nav
          ref={setRevealRef(1)}
          data-reveal-index="1"
          className={`footer__nav motion-reveal${visibleItems[1] ? " is-visible" : ""}`}
          style={{ "--motion-order": 1 }}
          aria-labelledby="footer-links-title"
        >
          <h2 id="footer-links-title" className="footer__title">
            Important Links
          </h2>
          <ul className="footer__link-list">
            {importantLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section
          ref={setRevealRef(2)}
          data-reveal-index="2"
          className={`footer__connect motion-reveal${visibleItems[2] ? " is-visible" : ""}`}
          style={{ "--motion-order": 2 }}
          aria-labelledby="footer-connect-title"
        >
          <h2 id="footer-connect-title" className="footer__title">
            Connect With Us
          </h2>
          <ul className="footer__social-list">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  <span className="footer__social-icon" aria-hidden="true">
                    <FooterIcon type="facebook" />
                  </span>
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <a
            className="footer__partner-link"
            href="mailto:earthquake@science.upd.edu.ph?subject=SEISMO%20Partnership%20Inquiry"
          >
            Partner with SEISMO
          </a>
        </section>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <p>© 2026 University of the Philippines Resilience Institute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
