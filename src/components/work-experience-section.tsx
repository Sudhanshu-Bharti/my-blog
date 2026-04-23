"use client"

import Link from "next/link"
import { ArrowUpRight, BriefcaseBusiness } from "lucide-react"
import { Micrographic } from "./micrographics"

const experiences = [
  {
    company: "Yatra.com",
    href: "https://www.yatra.com/",
    role: "Data Science Intern",
    period: "Dec - Present",
    description:
      "Working on data-oriented problems and applied workflows in a production environment.",
  },
  {
    company: "Wisematic",
    href: "https://www.wisematic.ca/",
    role: "Software Developer Intern",
    period: "Jan - Jun",
    description:
      "Worked across software development tasks with a focus on building and shipping practical features.",
  },
]

export function WorkExperienceSection() {
  return (
    <section className="mb-16 animate-fade-in-up">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold flex items-center text-white">
          <span className="text-accent mr-2">{"~"}</span>
          work experience
        </h2>
        <div className="hidden items-center gap-2 text-xs text-zinc-500 sm:flex">
          <BriefcaseBusiness className="h-3.5 w-3.5 text-accent" />
          <span>2 roles</span>
        </div>
      </div>

      <div className="relative">
        <Micrographic
          variant="signal"
          className="right-0 top-0 hidden h-8 w-32 text-white/8 md:block"
        />

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <Link
              key={experience.company}
              href={experience.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="grid gap-3 sm:grid-cols-[120px_minmax(0,1fr)] sm:gap-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex flex-col items-center pt-1">
                    <span className="h-2 w-2 rounded-full bg-accent/90" />
                    {index < experiences.length - 1 && (
                      <span className="mt-2 h-full min-h-20 w-px bg-gradient-to-b from-zinc-700 via-zinc-800 to-transparent" />
                    )}
                  </div>
                  <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                    {experience.period}
                  </span>
                </div>

                <div className="border-b border-zinc-800/60 pb-8 last:border-b-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white transition-colors duration-200 group-hover:text-accent">
                        {experience.company}
                      </h3>
                      <p className="mt-1 text-sm text-zinc-400">
                        {experience.role}
                      </p>
                    </div>

                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-zinc-600 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </div>

                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300">
                    {experience.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
