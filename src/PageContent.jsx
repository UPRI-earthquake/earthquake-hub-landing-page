import { lazy, Suspense } from "react"
import ComeWorkWithUsSection from "./components/sections/ComeWorkWithUsSection"
import ProjectsSection from "./components/sections/ProjectsSection"
import TeamSection from "./components/sections/TeamSection"
import WhatWeAreSection from "./components/sections/WhatWeAreSection"

const StationViewSection = lazy(() => import("./components/sections/StationViewSection"))
const ProductsSection = lazy(() => import("./components/sections/ProductsSection"))
const CommunitySection = lazy(() => import("./components/sections/CommunitySection"))
const PublicationsSection = lazy(() => import("./components/sections/PublicationsSection"))

const SectionFallback = ({ label }) => (
  <section className="content-section content-section--light" aria-label={`Loading ${label}`}>
    <div className="content-section__inner">
      <h2 className="content-section__title">{label}</h2>
      <div className="content-section__slot" />
    </div>
  </section>
)

const PageContent = () => {
  return (
    <main className="page-content">
      <Suspense fallback={<SectionFallback label="Station View" />}>
        <StationViewSection />
      </Suspense>
      <Suspense fallback={<SectionFallback label="Products" />}>
        <ProductsSection />
      </Suspense>
      <ProjectsSection />
      <Suspense fallback={<SectionFallback label="Community" />}>
        <CommunitySection />
      </Suspense>
      <WhatWeAreSection />
      <TeamSection />
      <ComeWorkWithUsSection />
      <Suspense fallback={<SectionFallback label="Publications" />}>
        <PublicationsSection />
      </Suspense>
    </main>
  )
}

export default PageContent
