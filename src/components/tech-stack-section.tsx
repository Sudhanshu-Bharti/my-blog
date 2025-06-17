"use client"

import Link from "next/link"
import { AnimatedBackground } from "@/components/motion-primitives/animated-background"
import { ArrowUpRight, Calendar, Code2, ExternalLink } from "lucide-react"

export type ProjectItem = {
  title: string
  href: string
  techStack?: string[]
  period?: string
  description?: string
  image?: string
}

type ProjectList = {
  title: string
  items: ProjectItem[]
  viewAllHref?: string
  viewAllText?: string
}

export function ProjectSection({
  title,
  items,
  viewAllHref,
  viewAllText,
}: ProjectList) {
  return (
    <section className="mb-16 animate-fade-in-up">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
        <span className="text-accent mr-2">{"~"}</span> {title}
      </h2>
      <div className="space-y-8">
        <AnimatedBackground
          className="bg-zinc-800/50 backdrop-blur-sm -m-3"
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 0.6,
          }}
          enableHover
        >
          {items.map((item, index) => (
            <div
              key={index}
              data-id={`tech-card-${index}`}
              className="group p-4 rounded-lg"
            >
              <Link href={item.href} target="_blank" className="block">
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <h3 className="text-xl font-semibold text-white select-none group-hover:text-accent transition-colors duration-200 flex items-center">
                    {item.title}
                    <ExternalLink className="w-4 h-4 ml-1 inline opacity-50 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  {item.period && (
                    <div className="flex items-center text-sm text-gray-400 mt-1 md:mt-0">
                      <Calendar className="w-3 h-3 mr-1" />
                      {item.period}
                    </div>
                  )}
                </div>

                {item.description && (
                  <p className="text-gray-300 mb-3">{item.description}</p>
                )}

                {item.techStack && item.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2 items-center mt-2">
                    <Code2 className="w-3 h-3 text-accent" />
                    {item.techStack.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs px-2 py-1 rounded-md bg-zinc-700/70 text-gray-300 hover:bg-zinc-600/70 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </div>
          ))}
        </AnimatedBackground>
      </div>

      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-1 mt-6 text-accent hover:underline group"
        >
          {viewAllText}{" "}
          <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      )}
    </section>
  )
}
