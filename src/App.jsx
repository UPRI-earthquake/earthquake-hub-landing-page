import './App.css'
// Preserve the existing cascade while keeping later section refinements separate.
import './styles/polish.css'
import './styles/hero.css'
import './styles/institutional.css'
import './styles/slide-layouts.css'
import './styles/section-foundation.css'
import './styles/projects.css'
import './styles/team.css'
import './styles/opportunities.css'
import './styles/community-hub.css'
import './styles/products.css'
import './styles/hub-products.css'
import './styles/motion-footer.css'
import Hero from './components/layout/Hero'
import PageContent from './components/layout/PageContent'
import Footer from './components/layout/Footer'
import ScrollToTopButton from './components/layout/ScrollToTopButton'

function App() {
  return (
    <>
      <Hero />
      <PageContent />
      <Footer />
      <ScrollToTopButton />
    </>
  )
}

export default App
