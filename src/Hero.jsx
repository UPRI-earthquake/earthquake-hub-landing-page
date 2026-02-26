import { useState } from 'react'
import banner from './assets/qqbanner.JPG'

const navItems = ['Projects', 'Teams', 'Station View', 'Products', 'Contact Us']

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen((open) => !open)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="hero">
      <figure className="hero__figure">
        <img className="hero__image" src={banner} alt="Seismo team banner" />
        <figcaption className="hero__caption">
          <h1>Empowering Citizen Science for Seismic Resilience</h1>
          <p>
            UPRI&apos;s Seismo Engineering Team enhances community driven earthquake
            monitoring and education through science, innovation, and collaboration.
          </p>
          <button type="button" className="hero__cta">
            Learn More
          </button>
        </figcaption>
      </figure>

      <nav
        className={`hero__nav ${isMenuOpen ? 'is-open' : ''}`}
        aria-label="Main navigation"
      >
        <div className="hero__logo">SEISMO</div>
        <button
          type="button"
          className="hero__menu-toggle"
          aria-expanded={isMenuOpen}
          aria-controls="hero-mobile-menu"
          onClick={toggleMenu}
        >
          Menu
        </button>

        <ul id="hero-mobile-menu">
          {navItems.map((item) => (
            <li key={item}>
              <button type="button" className="hero__nav-link" onClick={closeMenu}>
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Hero
