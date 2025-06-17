import { ScrambleText } from "@/components/scramble-text"
import { ProjectCard } from "@/components/project-card"
import { Metadata } from "next"

const projects = [
  {
    title: "PandaView",
    description:
      "a modern SQL/PostgreSQL schema visualization and analysis tool",
    role: "creator and maintainer",
    period: "April 2025 - present",
    achievements: [
      "#9 in the Peerlist Week'24 Product launch ",
      "developed a powerful, user-friendly interface for visualizing complex database schemas",
      "implemented advanced features like schema comparison, query analysis, and performance optimization",
    ],
    technologies: [
      "typescript",
      "next.js",
      "drizzle",
      "tailwind css",
      "postgreSQL",
    ],
    href: "https://pandaview.site",
  },
  {
    title: "Nuevette",
    description: "a easy-to-use, open-source learning path generator",
    role: "creator",
    period: "Feb 2025",
    achievements: [
      "built a tool that generates personalized learning paths based on user preferences and goals",
    ],
    technologies: ["nextjs", "typescript", "tailwind css", "gemini"],
    href: "https://nuevette.vercel.app",
  },
  {
    title: "tilewm",
    description:
      "an open source scratchable and easy to use tiling window manager",
    role: "creator and maintainer",
    period: "March 2025",
    achievements: [
      "developed a lightweight, customizable tiling window manager for windows",
      "implemented a flexible configuration system for easy customization",
    ],
    technologies: ["c++", "Win32 API", "windows", "cmake"],
    href: "https://github.com/sudhanshu-bharti/tilewm",
  },
  {
    title: "hanime hub",
    description: "an open source hentai anime streaming platform without ads",
    role: "creator",
    period: "dec 2024",
    achievements: [
      "built a platform that allows users to stream hentai anime without any ads",
      "because of too many legal issues, the project is currently archived",
    ],
    technologies: ["python", "typescript", "next.js", "tailwind css", "ffmpeg"],
    href: "https://github.com/sudhanshu-bharti/hanime-frontend",
  },
]

export default function ProjectsPage() {
  return (
    <main className="animate-fade-in-up">
      <h1 className="text-4xl font-bold mb-8 text-zinc-100">
        <span className="text-accent mr-2">{"<"}</span>
        <ScrambleText text="Projects" />
        <span className="text-accent mr-2">{">"}</span>
      </h1>

      <p className="text-zinc-400 mb-12 leading-relaxed">
        so here are some of the projects I've worked on and are currently
        working on.
        <br />
      </p>

      <div className="space-y-12">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </main>
  )
}

export const metadata: Metadata = {
  title: "Projects",
  description: "Some of the projects I've worked on.",
  openGraph: {
    images: [
      {
        url: "https://www.nexxel.dev/og/home?title=projects",
      },
    ],
  },
}
