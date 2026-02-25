import banner from './assets/qqbanner.JPG'

const navItems = ['Projects', 'Teams', 'Station View', 'Products', 'Contact Us']

const Hero = () => {
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

      <nav className="hero__nav" aria-label="Main navigation">
        <div className="hero__logo">SEISMO</div>
        <ul>
          {navItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Hero
