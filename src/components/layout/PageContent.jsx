import { lazy, Suspense } from "react"
import ComeWorkWithUsSection from "../sections/ComeWorkWithUsSection"
import ProjectsSection from "../sections/ProjectsSection"
import TeamSection from "../sections/TeamSection"
import WhatWeAreSection from "../sections/WhatWeAreSection"

const EarthquakeHubSection = lazy(() => import("../sections/EarthquakeHubSection"))
const ProductsSection = lazy(() => import("../sections/ProductsSection"))
const CommunitySection = lazy(() => import("../sections/CommunitySection"))
const PublicationsSection = lazy(() => import("../sections/PublicationsSection"))

const SectionFallback = ({ id, label, variant = "light" }) => (
  <section
    id={id}
    className={`content-section content-section--${variant} content-section--slide`}
    aria-label={`Loading ${label}`}
  >
    <div className="content-section__inner">
      <h2 className="content-section__title">{label}</h2>
    </div>
  </section>
)

const PageContent = () => {
  return (
    <main className="page-content">
      <WhatWeAreSection />
      <ProjectsSection />
      <TeamSection />
      <ComeWorkWithUsSection />
      <Suspense fallback={<SectionFallback id="community" label="Community" variant="dark" />}>
        <CommunitySection />
      </Suspense>
      <Suspense fallback={<SectionFallback id="publications" label="Publications" variant="green-alt" />}>
        <PublicationsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback id="earthquake-hub" label="Earthquake Hub" />}>
        <EarthquakeHubSection />
      </Suspense>
      <Suspense fallback={<SectionFallback id="shake-table-prototypes" label="Shake Tables" variant="green" />}>
        <ProductsSection />
      </Suspense>
    </main>
  )
}

export default PageContent
