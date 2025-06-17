"use client"

import React, { useState } from "react"

export type SkillCategory = {
  name: string
  icon: React.ReactNode
  skills: string[]
  color: string
  weight?: number
}

export type TreemapSkillItem = {
  name: string
  size: number
  color: string
  iconUrl?: string
  category: string
  allCategories?: string[]
}

// TreemapSkills Component
export function TreemapSkills({ categories }: { categories: SkillCategory[] }) {
  const skillsData: TreemapSkillItem[] = []

  // Adjusted weights to reflect your full-stack developer profile
  const categoryWeights: Record<string, number> = {
    Frontend: 1.4, // Strong frontend skills
    Backend: 1.4, // Strong backend skills
    Database: 0.9, // Decent database knowledge
    Design: 1.1, // Good UI/UX skills
    Languages: 1.0, // Base level for programming languages
  }

  // Skill-specific weights based on your expertise
  const skillWeights: Record<string, number> = {
    React: 1.9, // Core frontend skill
    "Next.js": 1.9,
    TailwindCSS: 1.7,
    TypeScript: 1.9, // Strong typing knowledge
    JavaScript: 1.6,
    "Node.js": 1.7, // Backend strength
    Express: 1.6,
    "C++": 1.2, // Decent knowledge as mentioned
    PostgreSQL: 1.3, // Database skills
    MongoDB: 1.2,
    Zustand: 1.4,
    "Shadcn UI": 1.5, // UI/UX component library
    "Drizzle ORM": 1.3,
    Figma: 1.2, // Design tool
    "UI/UX": 1.3, // Design skills
    C: 0.8, // Lower weight for C
    Java: 0.7, // Lower weight for Java
  }

  const customIcons: Record<string, string> = {
    Zustand:
      "https://user-images.githubusercontent.com/958486/218346783-72be5ae3-b953-4dd7-b239-788a882fdad6.svg",
    "Shadcn UI":
      "https://images.seeklogo.com/logo-png/51/1/shadcn-ui-logo-png_seeklogo-519786.png",
    "Drizzle ORM":
      "https://raw.githubusercontent.com/drizzle-team/drizzle-orm/50a8b163e6209e7dbd72e370556d0a87ec01fd8f/misc/readme/logo-github-sq-dark.svg",
    "Next.js":
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    "Node.js":
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  }

  const skillMap = new Map<
    string,
    {
      categories: string[]
      size: number
      color: string
      iconUrl: string
    }
  >()
  categories.forEach((category) => {
    const categoryWeight = categoryWeights[category.name] || 1

    category.skills.forEach((skill) => {
      // Handle possible null/undefined values
      const safeSkill = skill || ""
      const skillWeight = skillWeights[safeSkill] || 1
      const size = Math.floor(
        skillWeight * categoryWeight * 100 + Math.random() * 50
      )

      // Safely convert skill to string to prevent toLowerCase errors
      const formattedSkill =
        typeof safeSkill === "string" ? safeSkill : String(safeSkill)
      const iconUrl =
        customIcons[formattedSkill] ||
        (formattedSkill
          ? `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${formattedSkill.toLowerCase()}/${formattedSkill.toLowerCase()}-original.svg`
          : "")

      if (skillMap.has(skill)) {
        const existing = skillMap.get(skill)!

        if (!existing.categories.includes(category.name)) {
          existing.categories.push(category.name)
          existing.size = Math.max(existing.size, size) * 1.15
        }
      } else {
        skillMap.set(skill, {
          categories: [category.name],
          size,
          color: category.color,
          iconUrl,
        })
      }
    })
  })

  skillMap.forEach((info, skillName) => {
    const primaryCategory = info.categories[0]
    const categoryDisplay =
      info.categories.length > 1
        ? `${primaryCategory}${info.categories.length > 2 ? "+" : ""}`
        : primaryCategory

    skillsData.push({
      name: skillName,
      size: info.size,
      color: info.color,
      iconUrl: info.iconUrl,
      category: categoryDisplay,
      allCategories: info.categories,
    })
  })

  return (
    <div className="w-full overflow-hidden">
      <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-3 sm:p-4 md:p-6 shadow-lg backdrop-blur-sm">
        {/* Portfolio header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-zinc-700/50">
          <div className="text-gray-400 font-mono text-xs">
            {skillsData.length} Technologies
          </div>
        </div>

        <TreemapLayout data={skillsData} />
      </div>
    </div>
  )
}

function TreemapLayout({ data }: { data: TreemapSkillItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Add useEffect to check for mobile screens and handle resizing
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    // Initial check
    checkMobile()

    // Debounced resize handler
    let resizeTimer: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(checkMobile, 200)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  const sortedData = [...data].sort((a, b) => b.size - a.size)
  const categoryColors: Record<string, string> = {
    Frontend: "from-blue-500/10 to-cyan-500/20 border-blue-500/30",
    Backend: "from-green-500/10 to-emerald-500/20 border-green-500/30",
    Database: "from-purple-500/10 to-violet-500/20 border-purple-500/30",
    Design: "from-pink-500/10 to-rose-500/20 border-pink-500/30",
    Languages: "from-orange-500/10 to-yellow-500/20 border-orange-500/30",
    default: "from-zinc-600/10 to-zinc-700/20 border-zinc-600/30",
  }
  const getPerformanceIndicator = (size: number) => {
    if (size > 200)
      return { symbol: "▲", color: "text-accent", bg: "bg-accent/20" }
    if (size > 150)
      return { symbol: "▲", color: "text-accent/80", bg: "bg-accent/10" }
    if (size > 100)
      return { symbol: "●", color: "text-gray-400", bg: "bg-zinc-700/50" }
    return { symbol: "▼", color: "text-gray-500", bg: "bg-zinc-800/50" }
  }

  const handleItemClick = (item: TreemapSkillItem) => {
    if (item.allCategories && item.allCategories.length > 0) {
      const primaryCategory = item.allCategories[0]
      setSelectedCategory(
        selectedCategory === primaryCategory ? null : primaryCategory
      )
    }
  }

  const isItemHighlighted = (item: TreemapSkillItem) => {
    if (!selectedCategory) return false
    return item.allCategories?.includes(selectedCategory) || false
  }

  const isItemDimmed = (item: TreemapSkillItem) => {
    if (!selectedCategory) return false
    return !isItemHighlighted(item)
  }
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-1.5 sm:gap-2 auto-rows-fr min-h-[350px] sm:min-h-[400px]">
      {sortedData.map((item, index) => {
        // Adjust size calculation for mobile - smaller sizes on mobile
        const baseSize = Math.max(1, Math.min(3, Math.ceil(item.size / 140)))
        // We'll use responsive classes instead of JS detection to handle the sizing
        const size = baseSize

        const performance = getPerformanceIndicator(item.size)
        const isHighlighted = isItemHighlighted(item)
        const isDimmed = isItemDimmed(item)
        const isHovered = hoveredItem === item.name

        let sizeClass = ""
        if (size >= 3) {
          sizeClass = "col-span-2 row-span-2"
        } else if (size >= 2) {
          // On mobile, larger items should still fit better in the grid
          sizeClass = "col-span-2 row-span-1"
        } else {
          sizeClass = "col-span-1 row-span-1"
        }

        const colorClass =
          categoryColors[item.allCategories?.[0] || "default"] ||
          categoryColors.default

        return (
          <div
            key={`${item.name}-${index}`}
            className={`
              ${sizeClass} 
              relative p-2 sm:p-3 rounded-md border 
              bg-gradient-to-br ${colorClass}
              transition-all duration-200 ease-out
              flex flex-col justify-between
              group cursor-pointer
              min-h-[70px] sm:min-h-[80px]
              backdrop-blur-sm
              ${
                isHighlighted
                  ? "ring-2 ring-accent/60 shadow-lg shadow-accent/20 scale-105 z-20"
                  : ""
              }
              ${isDimmed ? "opacity-40 scale-95" : ""}
              ${isHovered ? "z-30" : ""}
              hover:shadow-lg hover:scale-[1.02] hover:z-10
              active:scale-95 touch-manipulation
            `}
            onClick={() => handleItemClick(item)}
            onMouseEnter={() => setHoveredItem(item.name)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {" "}
            <div className="flex items-start justify-between mb-1 sm:mb-2">
              <div
                className={`flex items-center space-x-1 px-1 sm:px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono ${
                  performance.bg
                } ${isHighlighted ? "ring-1 ring-emerald-400/40" : ""}`}
              >
                <span className={performance.color}>{performance.symbol}</span>
                <span className="text-slate-300">{Math.floor(item.size)}</span>
              </div>

              <div
                className={`w-1.5 h-1.5 rounded-full bg-current opacity-40 ${
                  item.allCategories && item.allCategories.length > 1
                    ? "animate-pulse"
                    : ""
                }`}
              ></div>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 space-y-1 sm:space-y-2">
              {" "}
              {item.allCategories && item.allCategories.length > 1 && (
                <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-accent animate-pulse shadow-lg"></div>
              )}
              {item.iconUrl && (
                <div className="relative">
                  <img
                    src={item.iconUrl}
                    alt={item.name}
                    className={`w-5 h-5 sm:w-6 sm:h-6 object-contain transition-all duration-200 ${
                      isHighlighted
                        ? "opacity-100 drop-shadow-lg"
                        : "opacity-90 group-hover:opacity-100"
                    }`}
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).style.display = "none"
                    }}
                  />
                </div>
              )}{" "}
              <div className="text-center">
                <div
                  className={`font-mono text-[10px] sm:text-xs font-medium leading-tight transition-colors duration-200 ${
                    isHighlighted ? "text-accent" : "text-white"
                  }`}
                >
                  {item.name}
                </div>{" "}
                {/* Only show category on medium size tiles and up */}
                {size >= 2 && (
                  <div className="text-[8px] sm:text-[10px] text-gray-400 font-mono mt-0.5 sm:mt-1 opacity-70">
                    {item.allCategories && item.allCategories.length > 1
                      ? `${item.allCategories.length} STACKS`
                      : (
                          item.allCategories?.[0] ||
                          item.category ||
                          ""
                        ).toUpperCase()}
                  </div>
                )}
              </div>
            </div>{" "}
            {size >= 2 && (
              <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-gray-500 mt-1 sm:mt-2 pt-1 sm:pt-2 border-t border-zinc-600/20">
                <span>
                  {item.allCategories && item.allCategories.length > 1
                    ? "CAT"
                    : "EXP"}
                </span>
                <span
                  className={`${performance.color} ${
                    isHighlighted ? "text-accent" : ""
                  }`}
                >
                  {item.allCategories && item.allCategories.length > 1
                    ? `${item.allCategories.length}`
                    : `${(item.size / 10).toFixed(1)}%`}
                </span>
              </div>
            )}
            {/* Enhanced glow effect */}
            <div
              className={`absolute inset-0 rounded bg-gradient-to-t from-white/0 via-white/5 to-white/0 transition-opacity duration-300 pointer-events-none ${
                isHighlighted
                  ? "opacity-70"
                  : "opacity-0 group-hover:opacity-20"
              }`}
            ></div>{" "}
            {isHighlighted && (
              <div className="absolute inset-0 rounded-md border-2 border-accent/20 animate-ping pointer-events-none"></div>
            )}
          </div>
        )
      })}

      {selectedCategory && (
        <div
          className="fixed inset-0 z-10 cursor-pointer"
          onClick={() => setSelectedCategory(null)}
        />
      )}
    </div>
  )
}

export function TreemapCSSVariables() {
  return (
    <style jsx global>{`
      :root {
        --blue-500: #3b82f6;
        --cyan-500: #06b6d4;
        --green-500: #10b981;
        --emerald-500: #10b981;
        --purple-500: #8b5cf6;
        --violet-500: #8b5cf6;
        --pink-500: #ec4899;
        --rose-500: #f43f5e;
        --orange-500: #f97316;
        --yellow-500: #eab308;
        --red-500: #ef4444;
        --accent: #10b981;
      }

      .treemap-container {
        font-family: "JetBrains Mono", "Fira Code", "Monaco", monospace;
      }
    `}</style>
  )
}
