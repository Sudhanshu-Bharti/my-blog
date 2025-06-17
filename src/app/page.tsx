import { Header } from "@/components/header"
import {AboutMe} from "@/components/about-me"
import { BlogSection } from "@/components/blog-section"
import { LinksSection } from "@/components/links-section"

export default function HomePage() {
  return (
    <>
      <Header />
      <AboutMe />
      <BlogSection />
      <LinksSection />
    </>
  )
}
