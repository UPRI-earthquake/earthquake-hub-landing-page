import ComeWorkWithUsSection from "./components/sections/ComeWorkWithUsSection"
import CommunitySection from "./components/sections/CommunitySection"
import ProductsSection from "./components/sections/ProductsSection"
import ProjectsSection from "./components/sections/ProjectsSection"
import PublicationsSection from "./components/sections/PublicationsSection"
import StationViewSection from "./components/sections/StationViewSection"
import TeamSection from "./components/sections/TeamSection"
import WhatWeAreSection from "./components/sections/WhatWeAreSection"

const PageContent = () => {
  return (
    <main className="page-content">
      <WhatWeAreSection />
      <StationViewSection />
      <ProjectsSection />
      <ProductsSection />
      <CommunitySection />
      <TeamSection />
      <ComeWorkWithUsSection />
      <PublicationsSection />
    </main>
  )
}

export default PageContent
