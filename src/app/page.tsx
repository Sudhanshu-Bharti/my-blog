import { Header } from "@/components/header"
import { AboutMe } from "@/components/about-me"
import { WorkExperienceSection } from "@/components/work-experience-section"
import { BlogSection } from "@/components/blog-section"
import { LinksSection } from "@/components/links-section"
import { SectionScrollHandler } from "@/components/section-scroll-handler"
import { GitCommitSkills } from "@/components/git-commit-skills"
import { skillCategories } from "@/lib/skills"
export default function HomePage() {
  return (
    <>
      <SectionScrollHandler />
      <Header />
      <WorkExperienceSection />
      <GitCommitSkills categories={skillCategories} />

      <AboutMe />
      <BlogSection />
      <LinksSection />
    </>
  )
}
