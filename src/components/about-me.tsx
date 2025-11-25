"use client"

import type React from "react"

import { Code2, Layers, Cpu, Terminal, PenTool, FileText } from "lucide-react"
import { AnimatedBackground } from "./motion-primitives/animated-background"
import { SpotifyPlayer } from "./spotify-player"
import { GitHubActivity } from "./github-activity"
import {
  TreemapSkills,
  TreemapCSSVariables,
  type SkillCategory,
} from "./treemap-skills"

export function AboutMe() {
  const skillCategories: SkillCategory[] = [
    {
      name: "Frontend",
      icon: <Layers className="w-5 h-5" />,
      color: "from-blue-500/10 to-cyan-500/10",
      skills: [
        "React",
        "Nextjs",
        "TailwindCSS",
        "FramerMotion",
        "Redux",
        "Zustand",
        "Shadcn UI",
      ].filter(Boolean), // Filter out any null values
    },
    {
      name: "Backend",
      icon: <Cpu className="w-5 h-5" />,
      color: "from-green-500/10 to-emerald-500/10",
      skills: [
        "Nodejs",
        "Express",
        "TypeScript",
        "mysql",
        "PostgreSQL",
        "MongoDB",
        "Prisma",
        "Drizzle ORM",
        "Redis",
      ].filter(Boolean),
    },
    {
      name: "Database",
      icon: <Terminal className="w-5 h-5" />,
      color: "from-purple-500/10 to-violet-500/10",
      skills: [
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "Prisma",
        "Drizzle ORM",
        "Redis",
      ].filter(Boolean),
    },
    {
      name: "Design",
      icon: <PenTool className="w-5 h-5" />,
      color: "from-pink-500/10 to-rose-500/10",
      skills: ["Figma", "UI/UX"].filter(Boolean),
    },
    {
      name: "Languages",
      icon: <Code2 className="w-5 h-5" />,
      color: "from-orange-500/10 to-yellow-500/10",
      skills: [
        "JavaScript",
        "TypeScript",
        "Python",
        "C",
        "Cplusplus",
        "mysql",
        "Java",
      ].filter(Boolean),
    },
  ]

  const username = "sudhanshu-bharti"
  return (
    <section className="mb-16 animate-fade-in-up space-y-8 about-me">
      <TreemapCSSVariables />

      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center text-white">
          <span className="text-accent mr-2">{"~"}</span> about me
        </h2>
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent rounded-lg blur-lg" />
            <div className="relative bg-zinc-800/50 backdrop-blur-sm rounded-lg p-6 border border-zinc-700/50">
              <p className="text-gray-300 leading-relaxed mb-4">
                A 20-year-old CS undergrad who builds what might help, knowing
                it may not. With expertise in web development, I like to build
                stuff that matters. I love to try out every new tech, like
                literally installing it right away to check how cool it is.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <span>For any collaboration, reach out to me on</span>
                  <a
                    href="https://discord.com/users/sudhanshu_bharti"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Discord
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">

          <h3 className="text-xl font-semibold flex items-center text-white">
            <span className="text-accent mr-2">{">"}</span>
            skills & expertise
          </h3>{" "}
          <div className="space-y-3 sm:space-y-4 -mx-2 sm:mx-0">
            <TreemapSkills categories={skillCategories} />{" "}
            <p className="flex flex-wrap gap-2 text-xs text-gray-400 mt-2 px-2 sm:px-0">
              Tech stack visualized as a treemap - took the inspiration from
              stock market ui :)
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center text-white">
            <span className="text-accent mr-2">{">"}</span>
            current focus
          </h3>

          <AnimatedBackground
            className="bg-zinc-800/30 backdrop-blur-sm rounded-lg border border-zinc-700/50"
            transition={{
              type: "spring",
              bounce: 0.2,
              duration: 0.6,
            }}
            enableHover
          >
            <div
              data-id="current-focus"
              className="relative p-6 rounded-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/3 to-transparent rounded-lg" />
              <div className="relative z-10">
                <div className="flex items-start gap-3">
                  <div className="space-y-3">
                    <p className="text-gray-300 leading-relaxed">
                      I was kinda bored with the web so I started to learn more
                      about C++ and its capability and yeah I knew how powerful
                      it is so I decided to dive deeper into it. It's amazing
                      how much you can do with it. So I decided to start
                      learning about low level stuff.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedBackground>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center text-white">
            <span className="text-accent mr-2">{">"}</span>
            now playing
          </h3>
          <div className="max-w-md">
            <SpotifyPlayer />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            music is a great way to relax and focus, I love listening to music
            while coding.
          </p>
        </div>{" "}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center text-white">
            <span className="text-accent mr-2">{">"}</span>
            github activity
          </h3>
          <div className="rounded-lg">
            <GitHubActivity username="sudhanshu-bharti" />
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-emerald-500 hover:underline flex items-center"
            >
              @{username}
            </a>
          </div>{" "}
        </div>
      </div>
    </section>
  )
}
