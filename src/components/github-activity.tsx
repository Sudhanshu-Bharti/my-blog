"use client"

import { useEffect, useState } from "react"
import { Calendar, Github, Loader2 } from "lucide-react"

type ContributionDay = {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

type ContributionResponse = {
  contributions: ContributionDay[]
  total: Record<string, number>
}

type FormattedContributionData = {
  weeks: ContributionDay[][]
  totalContributions: number
  months: { name: string; index: number }[]
}

export function GitHubActivity({ username = "sudhanshu-bharti" }) {
  const [data, setData] = useState<FormattedContributionData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    const fetchGitHubData = async () => {
      setLoading(true)
      setError(false)
      try {
        const currentYear = new Date().getFullYear()
        const previousYear = currentYear - 1

        // Fetch data from both current and previous year to get full rolling 52 weeks
        const [currentYearResponse, previousYearResponse] = await Promise.all([
          fetch(
            `https://github-contributions-api.jogruber.de/v4/${username}?y=${currentYear}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          ),
          fetch(
            `https://github-contributions-api.jogruber.de/v4/${username}?y=${previousYear}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          ),
        ])

        if (!currentYearResponse.ok || !previousYearResponse.ok) {
          throw new Error("Failed to fetch data")
        }

        const [currentYearData, previousYearData] = await Promise.all([
          currentYearResponse.json(),
          previousYearResponse.json(),
        ])

        // Combine contributions from both years
        const allContributions = [
          ...previousYearData.contributions,
          ...currentYearData.contributions,
        ].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        )

        // Get today's date
        const today = new Date()

        // Calculate exactly 52 weeks (364 days) ago from today
        const startDate = new Date(today)
        startDate.setDate(today.getDate() - 364)

        // Filter contributions to last 52 weeks
        const filteredContributions = allContributions.filter((day) => {
          const dayDate = new Date(day.date)
          return dayDate >= startDate && dayDate <= today
        })

        // Create a map for quick lookup
        const contributionMap = new Map(
          filteredContributions.map((day) => [day.date, day])
        )

        // Process into weeks starting from the first Sunday of our range
        const weeks: ContributionDay[][] = []
        const months: { name: string; index: number }[] = []

        // Find the first Sunday on or before our start date
        const firstSunday = new Date(startDate)
        while (firstSunday.getDay() !== 0) {
          firstSunday.setDate(firstSunday.getDate() - 1)
        }

        let lastMonth = -1

        // Generate weeks until we reach today
        let weekIndex = 0
        const currentWeekStart = new Date(firstSunday)

        while (currentWeekStart <= today) {
          const week: ContributionDay[] = []

          for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
            const currentDate = new Date(currentWeekStart)
            currentDate.setDate(currentWeekStart.getDate() + dayIndex)

            // Only include days up to today
            if (currentDate <= today) {
              const dateString = currentDate.toISOString().split("T")[0]
              const contributionDay = contributionMap.get(dateString)

              if (contributionDay) {
                week.push(contributionDay)
              } else if (currentDate >= startDate) {
                // Only create empty days within our 52-week range
                week.push({
                  date: dateString,
                  count: 0,
                  level: 0,
                })
              }
            }
          }

          // Only add weeks that have days
          if (week.length > 0) {
            weeks.push(week)

            // Track months for header
            const firstDay = new Date(week[0].date)
            const month = firstDay.getMonth()

            // Show month label at the beginning of each month
            if (month !== lastMonth && firstDay.getDate() <= 7) {
              months.push({
                name: firstDay.toLocaleDateString("en-US", { month: "short" }),
                index: weekIndex,
              })
              lastMonth = month
            }
          }

          weekIndex++
          currentWeekStart.setDate(currentWeekStart.getDate() + 7)
        }

        // Calculate total contributions in the 52-week period
        const totalContributions = filteredContributions.reduce(
          (sum, day) => sum + day.count,
          0
        )

        setData({
          weeks,
          totalContributions,
          months,
        })
      } catch (error) {
        console.error("Error fetching GitHub data:", error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [username])

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  const getContributionColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-zinc-700/80"
      case 1:
        return "bg-emerald-900/80"
      case 2:
        return "bg-emerald-700/80"
      case 3:
        return "bg-emerald-600/80"
      case 4:
        return "bg-emerald-500/80"
      default:
        return "bg-zinc-700/80"
    }
  }

  if (loading) {
    return (
      <div className="rounded-lg bg-zinc-800/50 p-6 flex items-center justify-center min-h-[200px]">
        <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
        <span className="ml-2 text-sm text-gray-400">
          Loading GitHub activity...
        </span>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="rounded-lg bg-zinc-800/50 p-6 flex items-center justify-center min-h-[200px]">
        <Github className="w-5 h-5 text-gray-400 mr-2" />
        <span className="text-sm text-gray-400">
          Couldn't load GitHub activity
        </span>
      </div>
    )
  }

  return (
    <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg">
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="p-6">

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-1">
          <span className="text-sm text-gray-400">
            {data.totalContributions} contributions in the last year
          </span>
        </div>

        <div className="overflow-x-auto scrollbar-hide">
          <div className="min-w-[700px]">
            <div className="flex mb-2">
              {data.months.map((month, index) => (
                <div
                  key={index}
                  className="text-xs text-gray-400 flex-shrink-0"
                  style={{
                    marginLeft:
                      index === 0
                        ? "14px"
                        : `${
                            (month.index -
                              (data.months[index - 1]?.index || 0)) *
                            12
                          }px`,
                    width: "24px",
                  }}
                >
                  {month.name}
                </div>
              ))}
            </div>

            <div className="flex">
              <div className="flex flex-col mr-2 text-xs text-gray-400">
                <div className="h-3 mb-1"></div> {/* Spacer for alignment */}
                <div className="h-3 mb-1">Mon</div>
                <div className="h-3 mb-1"></div>
                <div className="h-3 mb-1">Wed</div>
                <div className="h-3 mb-1"></div>
                <div className="h-3 mb-1">Fri</div>
                <div className="h-3 mb-1"></div>
              </div>

              <div className="flex gap-1">
                {data.weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {Array.from({ length: 7 }, (_, dayIndex) => {
                      const day = week.find(
                        (d) => new Date(d.date).getDay() === dayIndex
                      )
                      return (
                        <div
                          key={dayIndex}
                          className={`w-3 h-3 rounded-sm transition-all hover:ring-1 hover:ring-white/30 cursor-pointer ${
                            day
                              ? getContributionColor(day.level)
                              : "bg-transparent"
                          }`}
                          title={
                            day
                              ? `${day.count} contribution${
                                  day.count !== 1 ? "s" : ""
                                } on ${formatDate(day.date)}`
                              : ""
                          }
                        >
                          <span className="sr-only">
                            {day
                              ? `${day.count} contributions on ${formatDate(
                                  day.date
                                )}`
                              : "No data"}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  )
}
