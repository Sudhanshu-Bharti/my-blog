"use client"

import Link from "next/link"
import { ArrowUpRight, EyeOff } from "lucide-react"
import { useState } from "react"

type ProjectCardProps = {
  title: string
  description: string
  role: string
  period?: string
  achievements: string[]
  technologies: string[]
  href: string
  nsfw?: boolean
}

export function ProjectCard({
  title,
  description,
  role,
  period,
  achievements,
  technologies,
  href,
  nsfw = false,
}: ProjectCardProps) {
  const [isBlurred, setIsBlurred] = useState(nsfw)

  return (
    <div className="group relative bg-zinc-900/60 backdrop-blur-sm border border-zinc-700/50 rounded-lg p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
      {/* Subtle gradient background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-zinc-800/30 to-transparent rounded-lg opacity-30 group-hover:opacity-60 transition-opacity duration-300" />

      <div className="relative z-10">
        {/* NSFW Tag */}
        {nsfw && (
          <div className="absolute -top-2 -right-2 z-20">
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold bg-red-500/90 text-white rounded-md border border-red-400/50 shadow-lg">
              <EyeOff className="w-3 h-3" />
              NSFW
            </span>
          </div>
        )}

        {/* Blur overlay with click to reveal */}
        {isBlurred && (
          <div
            onClick={() => setIsBlurred(false)}
            className="absolute inset-0 z-10 backdrop-blur-3xl bg-zinc-900/95 rounded-lg flex items-center justify-center cursor-pointer group/blur transition-all duration-300 hover:bg-zinc-900/90"
          >
            {/* Additional blur layer */}
            <div className="absolute inset-0 backdrop-blur-3xl bg-black/40"></div>

            <div className="text-center space-y-3 relative z-10">
              <div className="flex justify-center">
                <div className="p-4 bg-red-500/10 rounded-full border-2 border-red-500/30 group-hover/blur:border-red-500/50 transition-colors">
                  <EyeOff className="w-8 h-8 text-red-500" />
                </div>
              </div>
              <div>
                <p className="text-white font-semibold text-lg">NSFW Content</p>
                <p className="text-zinc-400 text-sm mt-1">Click to reveal</p>
              </div>
            </div>
          </div>
        )}

        <Link href={href} target="_blank" className="group/link">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-zinc-100 group-hover/link:text-accent transition-colors duration-200">
              {title}
            </h2>
            <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover/link:text-accent transition-colors duration-200" />
          </div>
        </Link>

        <p className="text-sm text-zinc-400 mb-4">
          {role} {period && `(${period})`}
        </p>

        <p className="text-zinc-300 mb-6">{description}</p>
      </div>

      <div className="space-y-6 relative z-10">
        <div>
          <h3 className="text-zinc-100 font-semibold mb-2 text-sm uppercase tracking-wide">
            Description
          </h3>
          <ul className="list-disc list-inside space-y-1 text-zinc-400">
            {achievements.map((achievement, index) => (
              <li key={index} className="text-sm">
                {achievement}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-zinc-100 font-semibold mb-2 text-sm uppercase tracking-wide">
            Technologies
          </h3>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs text-zinc-300 bg-zinc-800/80 border border-zinc-700/50 rounded-md transition-colors duration-200 hover:border-accent/30 hover:bg-zinc-800"
              >
                {tech ? tech.toLowerCase() : ""}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
