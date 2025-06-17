import { Header } from "@/components/header"
import { AboutMe } from "@/components/about-me"
import { BlogSection } from "@/components/blog-section"
import { LinksSection } from "@/components/links-section"
import { SectionScrollHandler } from "@/components/section-scroll-handler"

export default function HomePage() {
  return (
    <>
      <SectionScrollHandler />
      <Header />
      <AboutMe />
      <BlogSection />
      <LinksSection />
    </>
  )
}
