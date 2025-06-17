"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { AnimatedBackground } from "@/components/motion-primitives/animated-background"

export type Item = {
  title: string
  href: string
  role: string
  period?: string
  description?: string
}

type SectionListProps = {
  title: string
  items: Item[]
  viewAllHref?: string
  viewAllText?: string
}

export function SectionList({
  title,
  items,
  viewAllHref,
  viewAllText,
}: SectionListProps) {
  return (
    <section className="mb-16 animate-fade-in-up">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
        <span className="text-accent mr-2">{"~"}</span> {title}
      </h2>
      <div className="space-y-8">
        <AnimatedBackground
          className=" bg-zinc-800 backdrop-blur-sm -m-3"
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 0.6,
          }}
          enableHover
        >
          {items.map((item, index) => (
            <div key={index} data-id={`card-${index}`} className="group">
              <Link href={item.href} target="_blank">
                <h3 className="text-xl font-semibold mb-1 text-white select-none group-hover:text-accent transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 mb-2">
                  {item.role} {item.period && `(${item.period})`}
                </p>
                <p className="text-gray-300">{item.description}</p>
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
