import './App.css'
import Hero from './Hero'
import PageContent from './PageContent'
import Footer from './Footer'
import ScrollToTopButton from './ScrollToTopButton'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <>
      <Hero />
      <PageContent />
      <Footer />
      <ScrollToTopButton />
      <Analytics />
    </>
  )
}

export default App
