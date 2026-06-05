import { useEffect, useRef, useState } from 'react'
import upSeal from './assets/UP-Seal.avif'
import upriLogo from './assets/UPRI-logo.avif'
import showcaseSlide01 from './assets/hero-showcase/slide-01.jpg'
import showcaseSlide02 from './assets/hero-showcase/slide-02.jpg'
import showcaseSlide03 from './assets/hero-showcase/slide-03.jpg'
import { scrollToSection } from './utils/scroll'

const navItems = [
  { label: 'Projects', targetId: 'projects' },
  { label: 'Community', targetId: 'community' },
  { label: 'Publications', targetId: 'publications' },
  { label: 'Earthquake Hub', targetId: 'earthquake-hub' },
  { label: 'Shake Tables', targetId: 'shake-table-prototypes' },
  { label: 'Contact Us', targetId: 'contact-us' },
]

const teamsSubmenuItems = [
  { label: 'Team', targetId: 'team' },
  { label: 'Opportunities', targetId: 'come-work-with-us' },
]

const heroShowcaseSlides = [
  {
    src: showcaseSlide01,
    alt: 'Concept presentation for the proposed Earthquake Hub in UP Diliman',
    caption: 'Proposed Earthquake Hub for advanced earthquake studies in UP Diliman',
  },
  {
    src: showcaseSlide02,
    alt: 'SEISMO representatives presenting research work during WCEE 2024',
    caption: 'SEISMO research presentation at WCEE 2024',
  },
  {
    src: showcaseSlide03,
    alt: 'SEISMO exhibit setup presented at the House of Representatives',
    caption: 'House of Representatives exhibit on earthquake science and public resilience',
  },
]

const scrollToTarget = (targetId, { updateHash = false, smooth = true } = {}) => {
  const target = document.getElementById(targetId)
  if (!target) {
    return
  }

  scrollToSection(target, { smooth })

  if (updateHash) {
    window.history.pushState(null, '', `#${targetId}`)
  }
}

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isTeamsSubmenuOpen, setIsTeamsSubmenuOpen] = useState(false)
  const [isNavScrolled, setIsNavScrolled] = useState(false)
  const [activeShowcaseSlide, setActiveShowcaseSlide] = useState(0)
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
    closeMenu()
    scrollToTarget(targetId, { updateHash: true })
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
    const handleScroll = () => {
      setIsNavScrolled(window.scrollY > 12)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const scrollToHash = () => {
      const targetId = window.location.hash.slice(1)
      if (!targetId) {
        return
      }

      window.requestAnimationFrame(() => {
        scrollToTarget(targetId, { smooth: false })
      })
    }

    scrollToHash()
    window.addEventListener('hashchange', scrollToHash)
    return () => {
      window.removeEventListener('hashchange', scrollToHash)
    }
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      return undefined
    }

    const slideTimer = window.setInterval(() => {
      setActiveShowcaseSlide((slide) => (slide + 1) % heroShowcaseSlides.length)
    }, 6000)

    return () => {
      window.clearInterval(slideTimer)
    }
  }, [])

  return (
    <header className="hero">
      <div className="hero__body">
        <div className="hero__caption">
          <div className="hero__institution" aria-label="Institutional partners">
            <span className="hero__institution-line" aria-hidden="true" />
            <span className="hero__institution-logos">
              <img src={upSeal} alt="University of the Philippines" />
              <img src={upriLogo} alt="University of the Philippines Resilience Institute" />
            </span>
            <span className="hero__institution-copy">University-backed research</span>
          </div>
          <h1>
            Earthquake science for safer{' '}
            <span className="hero__highlight">communities</span>
          </h1>
          <p>
            UPRI&apos;s Seismo Engineering Team connects seismic networks, engineering,
            education, and local participation to strengthen earthquake awareness
            across the Philippines.
          </p>
          <div className="hero__actions" aria-label="Hero actions">
            <button
              type="button"
              className="hero__cta hero__cta--primary"
              onClick={() => handleNavClick('about-us')}
            >
              Learn More
            </button>
            <button
              type="button"
              className="hero__cta hero__cta--secondary"
              onClick={() => handleNavClick('community')}
            >
              Community Work
            </button>
          </div>
        </div>

        <figure className="hero__visual" aria-label="Project showcase for communities and events">
          <div className="hero__photo-frame">
            {heroShowcaseSlides.map((slide, index) => (
              <img
                key={slide.src}
                src={slide.src}
                alt={slide.alt}
                className={`hero__photo ${index === activeShowcaseSlide ? 'is-active' : ''}`}
                aria-hidden={index === activeShowcaseSlide ? undefined : 'true'}
              />
            ))}
            <figcaption className="hero__photo-caption">
              <span>{heroShowcaseSlides[activeShowcaseSlide].caption}</span>
              <span className="hero__showcase-controls" aria-label="Select showcase slide">
                {heroShowcaseSlides.map((slide, index) => (
                  <button
                    key={slide.caption}
                    type="button"
                    className={`hero__showcase-dot ${index === activeShowcaseSlide ? 'is-active' : ''}`}
                    aria-label={`Show slide ${index + 1}`}
                    aria-current={index === activeShowcaseSlide}
                    onClick={() => setActiveShowcaseSlide(index)}
                  />
                ))}
              </span>
            </figcaption>
          </div>
        </figure>
      </div>

      <div className="hero__field-note" aria-hidden="true">
        <span>Monitoring</span>
        <span>Research</span>
        <span>Preparedness</span>
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
        className={`hero__nav ${isMenuOpen ? 'is-open' : ''} ${isNavScrolled ? 'is-scrolled' : ''}`}
        aria-label="Main navigation"
      >
        <div className="hero__logo">SEISMO</div>
        <button
          type="button"
          className="hero__menu-toggle"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="hero-mobile-menu"
          onClick={toggleMenu}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
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
              aria-haspopup="true"
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
