import { useEffect, useRef, useState } from 'react'
import banner from './assets/HEROBG.png'
import seismoLogo from './assets/SEISMOFAVICON.png'

const navItems = [
  { label: 'Projects', targetId: 'projects' },
  { label: 'Community', targetId: 'community' },
  { label: 'Publications', targetId: 'publications' },
  { label: 'Station View', targetId: 'station-view' },
  { label: 'Products', targetId: 'products' },
  { label: 'Contact Us', targetId: 'contact-us' },
]

const teamsSubmenuItems = [
  { label: 'Team', targetId: 'team' },
  { label: 'Careers', targetId: 'come-work-with-us' },
]

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isTeamsSubmenuOpen, setIsTeamsSubmenuOpen] = useState(false)
  const [scrollRequest, setScrollRequest] = useState(null)
  const navRef = useRef(null)

  const toggleMenu = () => {
    setIsMenuOpen((open) => !open)
  }

  const toggleTeamsSubmenu = () => {
    setIsTeamsSubmenuOpen((open) => !open)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    setIsTeamsSubmenuOpen(false)
  }

  const handleNavClick = (targetId) => {
    setScrollRequest({ targetId, requestedAt: Date.now() })
    closeMenu()
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!navRef.current || navRef.current.contains(event.target)) {
        return
      }
      setIsTeamsSubmenuOpen(false)
      setIsMenuOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (!scrollRequest) {
      return
    }

    const target = document.getElementById(scrollRequest.targetId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [scrollRequest])

  return (
    <header className="hero">
      <figure className="hero__figure">
        <img className="hero__image" src={banner} alt="Seismo team banner" />
      </figure>

      <div className="hero__body">
        <div className="hero__logo-col">
          <img src={seismoLogo} alt="Seismo" className="hero__brand-logo" />
        </div>
        <div className="hero__caption">
          <h1>
            Empowering Citizen Science for{' '}
            <span className="hero__highlight">Seismic Resilience</span>
          </h1>
          <p>
            UPRI&apos;s Seismo Engineering Team enhances community driven earthquake
            monitoring and education through science, innovation, and collaboration.
          </p>
          <button
            type="button"
            className="hero__cta"
            onClick={() => handleNavClick('what-we-are')}
          >
            Learn More
          </button>
        </div>
      </div>

      <div className="hero__explore">
        <button
          type="button"
          className="hero__explore-btn"
          onClick={() => handleNavClick('projects')}
        >
          Explore Our Work
        </button>
        <div className="hero__scroll-indicator" aria-hidden="true">
          <span />
          <span />
        </div>
      </div>

      <nav
        ref={navRef}
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
          <li>
            <button
              type="button"
              className="hero__nav-link"
              onClick={() => handleNavClick(navItems[0].targetId)}
            >
              {navItems[0].label}
            </button>
          </li>
          <li className="hero__nav-item hero__nav-item--has-submenu">
            <button
              type="button"
              className="hero__nav-link"
              aria-expanded={isTeamsSubmenuOpen}
              aria-controls="teams-submenu"
              onClick={toggleTeamsSubmenu}
            >
              Teams
            </button>
            <ul
              id="teams-submenu"
              className={`hero__submenu ${isTeamsSubmenuOpen ? 'is-open' : ''}`}
              aria-label="Teams submenu"
            >
              {teamsSubmenuItems.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    className="hero__submenu-link"
                    onClick={() => handleNavClick(item.targetId)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </li>
          {navItems.slice(1).map((item) => (
            <li key={item.label}>
              <button
                type="button"
                className="hero__nav-link"
                onClick={() => handleNavClick(item.targetId)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Hero
