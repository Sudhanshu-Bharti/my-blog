"use client"

import React, { useState } from "react"
import { GitCommit, GitBranch, User, Calendar } from "lucide-react"

export type SkillCategory = {
    name: string
    icon: React.ReactNode
    skills: string[]
    color: string
}

type CommitData = {
    hash: string
    category: string
    skill: string
    message: string
    date: string
    author: string
    color: string
    iconUrl: string
}

export function GitCommitSkills({ categories }: { categories: SkillCategory[] }) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    // Icon URLs for technologies
    const getIconUrl = (skill: string): string => {
        const customIcons: Record<string, string> = {
            "Zustand": "https://user-images.githubusercontent.com/958486/218346783-72be5ae3-b953-4dd7-b239-788a882fdad6.svg",
            "Shadcn UI": "https://images.seeklogo.com/logo-png/51/1/shadcn-ui-logo-png_seeklogo-519786.png",
            "Drizzle ORM": "https://raw.githubusercontent.com/drizzle-team/drizzle-orm/50a8b163e6209e7dbd72e370556d0a87ec01fd8f/misc/readme/logo-github-sq-dark.svg",
            "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
            "Nextjs": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
            "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
            "Nodejs": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
            "FramerMotion": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg",
            "TailwindCSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
            "Cplusplus": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
        }

        if (customIcons[skill]) return customIcons[skill]

        const skillLower = skill.toLowerCase()
        return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skillLower}/${skillLower}-original.svg`
    }

    // Generate commit data from categories
    const commits: CommitData[] = []

    // Skill-specific dates based on when you learned them
    const skillDates: Record<string, string> = {
        // 2022 - Basics
        "JavaScript": "2022-08",
        "C": "2022-06",
        "Java": "2022-09",

        // 2023 - Core web development
        "React": "2023-03",
        "Nodejs": "2023-05",
        "Node.js": "2023-05",
        "Express": "2023-06",
        "MongoDB": "2023-07",
        "MySQL": "2023-08",
        "mysql": "2023-08",

        // 2024 - Advanced & Modern stack
        "TypeScript": "2024-01",
        "Cplusplus": "2024-02",
        "Next.js": "2024-03",
        "Nextjs": "2024-03",
        "TailwindCSS": "2024-04",
        "PostgreSQL": "2024-05",
        "Prisma": "2024-06",
        "Drizzle ORM": "2024-07",
        "Redux": "2024-08",
        "Zustand": "2024-09",

        // 2024-2025 - Latest tools & frameworks
        "Shadcn UI": "2024-10",
        "FramerMotion": "2024-11",
        "Redis": "2024-12",
        "Python": "2024-12",
        "Figma": "2025-01",
        "UI/UX": "2025-01",
    }

    categories.forEach((category) => {
        category.skills.forEach((skill) => {
            const hash = Math.random().toString(36).substring(2, 9)
            // Use specific date if available, otherwise default to 2024-06
            const date = skillDates[skill] || "2024-06"

            commits.push({
                hash,
                category: category.name,
                skill,
                message: `feat: added ${skill} to stack`,
                date: date,
                author: "sudhanshu bharti",
                color: category.color,
                iconUrl: getIconUrl(skill),
            })
        })
    })

    // Reverse to show newest first
    const sortedCommits = commits.reverse()

    const filteredCommits = selectedCategory
        ? sortedCommits.filter((c) => c.category === selectedCategory)
        : sortedCommits

    return (
        <div className="w-full">
            {/* Git log header */}
            <div className="flex items-center gap-2 mb-4 text-sm font-mono text-zinc-400">
                <GitBranch className="w-4 h-4" />
                <span>main</span>
                <span className="text-zinc-600">•</span>
                <span className="text-accent">{commits.length} commits</span>
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2 mb-6">
                <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-3 py-1 text-xs font-mono rounded-md transition-all duration-200 ${selectedCategory === null
                        ? "bg-accent/20 text-accent border border-accent/30"
                        : "bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 hover:border-zinc-600"
                        }`}
                >
                    all
                </button>
                {categories.map((category) => (
                    <button
                        key={category.name}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`px-3 py-1 text-xs font-mono rounded-md transition-all duration-200 ${selectedCategory === category.name
                            ? "bg-accent/20 text-accent border border-accent/30"
                            : "bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 hover:border-zinc-600"
                            }`}
                    >
                        {category.name.toLowerCase()}
                    </button>
                ))}
            </div>

            {/* Commit list */}
            <div className="space-y-0 bg-zinc-900/40 backdrop-blur-sm rounded-lg border border-zinc-800/50 overflow-hidden">
                {filteredCommits.map((commit, index) => (
                    <div
                        key={commit.hash}
                        className="group relative border-b border-zinc-800/30 last:border-0 hover:bg-zinc-800/30 transition-colors duration-200"
                    >
                        {/* Commit line */}
                        <div className="flex items-start gap-3 p-4">
                            {/* Commit indicator */}
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-2 h-2 rounded-full bg-accent group-hover:ring-4 group-hover:ring-accent/20 transition-all duration-200"></div>
                            </div>

                            {/* Commit content */}
                            <div className="flex-1 min-w-0">
                                {/* Commit message with icon */}
                                <div className="flex items-start justify-between gap-4 mb-2">
                                    <div className="flex-1 flex items-center gap-3">
                                        {/* Technology Icon */}
                                        <div className="flex-shrink-0">
                                            <img
                                                src={commit.iconUrl}
                                                alt={commit.skill}
                                                className="w-6 h-6 object-contain"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = "none"
                                                }}
                                            />
                                        </div>
                                        <p className="text-sm text-zinc-300 font-mono group-hover:text-white transition-colors">
                                            {commit.message}
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono bg-zinc-800/80 text-zinc-400 rounded border border-zinc-700/50">
                                            {commit.skill}
                                        </span>
                                    </div>
                                </div>

                                {/* Commit metadata */}
                                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 font-mono">
                                    <div className="flex items-center gap-1">
                                        <GitCommit className="w-3 h-3" />
                                        <span className="text-accent">{commit.hash}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <User className="w-3 h-3" />
                                        <span>{commit.author}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        <span>{commit.date}</span>
                                    </div>
                                    <div>
                                        <span className="text-zinc-600">•</span>
                                        <span className="ml-1.5 text-zinc-600">{commit.category}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Connecting line */}
                        {index < filteredCommits.length - 1 && (
                            <div className="absolute left-[26px] top-[36px] w-[2px] h-[calc(100%-20px)] bg-zinc-800/50"></div>
                        )}
                    </div>
                ))}
            </div>

            {/* Git log footer */}
            <div className="mt-4 flex items-center justify-between text-xs font-mono text-zinc-500">
                <div className="flex items-center gap-2">
                    <span>showing {filteredCommits.length} of {commits.length} commits</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="text-zinc-600">$</span>
                    <span className="text-zinc-500">git log --oneline</span>
                </div>
            </div>
        </div>
    )
}
