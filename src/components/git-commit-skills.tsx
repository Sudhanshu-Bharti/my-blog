"use client"

import React, { useMemo } from "react"
import { Micrographic } from "./micrographics"

export type SkillCategory = {
  name: string
  icon: React.ReactNode
  skills: string[]
  color: string
}

type SkillItem = {
  name: string
  iconUrl: string
  featured?: boolean
}

const customIcons: Record<string, string> = {
  Zustand:
    "https://user-images.githubusercontent.com/958486/218346783-72be5ae3-b953-4dd7-b239-788a882fdad6.svg",
  "Shadcn UI":
    "https://images.seeklogo.com/logo-png/51/1/shadcn-ui-logo-png_seeklogo-519786.png",
  "Drizzle ORM":
    "https://raw.githubusercontent.com/drizzle-team/drizzle-orm/50a8b163e6209e7dbd72e370556d0a87ec01fd8f/misc/readme/logo-github-sq-dark.svg",
  Nextjs:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  "Next.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  Nodejs:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  "Node.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  TailwindCSS:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  FramerMotion:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg",
  Cplusplus:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
  MySQL:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  mysql:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  MongoDB:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  PostgreSQL:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  React:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  TypeScript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  JavaScript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  Express:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
  Prisma:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
  Redis:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
  Python:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  Java:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  Figma:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
  C:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
}

const featuredSkills = new Set([
  "React",
  "Nextjs",
  "TypeScript",
  "Nodejs",
  "PostgreSQL",
  "TailwindCSS",
  "MongoDB",
  "Prisma",
])

function getIconUrl(skill: string) {
  return (
    customIcons[skill] ??
    `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.toLowerCase()}/${skill.toLowerCase()}-original.svg`
  )
}

export function GitCommitSkills({ categories }: { categories: SkillCategory[] }) {
  const skills = useMemo(() => {
    const seen = new Set<string>()
    const items: SkillItem[] = []

    categories.forEach((category) => {
      category.skills.forEach((skill) => {
        if (!skill || seen.has(skill)) {
          return
        }

        seen.add(skill)
        items.push({
          name: skill,
          iconUrl: getIconUrl(skill),
          featured: featuredSkills.has(skill),
        })
      })
    })

    return items.sort((a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name))
  }, [categories])

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-zinc-800/70 bg-zinc-900/45 p-4 backdrop-blur-sm sm:p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,195,0,0.07),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_34%)]" />
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <Micrographic
        variant="corner"
        className="right-0 top-0 h-28 w-36 text-accent/20"
      />
      <Micrographic
        variant="band"
        className="bottom-3 left-4 h-12 w-44 text-white/8"
      />

      <div className="relative flex flex-wrap gap-2.5 sm:gap-3">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className={`group flex items-center gap-3 rounded-2xl border px-3.5 py-2.5 transition-all duration-200 ${
              skill.featured
                ? "border-zinc-700/80 bg-zinc-950/80"
                : "border-zinc-800/80 bg-zinc-950/45"
            } hover:border-zinc-600/80 hover:bg-zinc-950/80`}
          >
            <img
              src={skill.iconUrl}
              alt={skill.name}
              className="h-5 w-5 shrink-0 object-contain opacity-95"
              onError={(e) => {
                ;(e.target as HTMLImageElement).style.display = "none"
              }}
            />
            <span className="text-sm text-zinc-200">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
