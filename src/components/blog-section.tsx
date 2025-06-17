import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { getPosts } from "@/lib/blog"

const posts = getPosts()
  .sort((a, b) => {
    try {
      const dateA = a?.metadata?.date ? new Date(a.metadata.date).getTime() : 0
      const dateB = b?.metadata?.date ? new Date(b.metadata.date).getTime() : 0
      return dateB - dateA
    } catch (error) {
      return 0
    }
  })
  .slice(0, 4)

export function BlogSection() {
  return (
    <section className="mb-16 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center text-zinc-100">
          <span className="text-accent mr-2">{"~"}</span>
          blog
        </h2>
        <Link
          href="/blog"
          className="flex items-center gap-1 text-sm text-zinc-400 hover:text-accent group transition-colors duration-200"
        >
          <span>all posts</span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <div className="relative bg-zinc-900/40 backdrop-blur-sm rounded-lg p-4 border border-zinc-800/50">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-lg opacity-30"></div>

        <div className="space-y-4 relative z-10">
          {posts.map((post, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center group py-2 border-b border-zinc-800/30 last:border-0"
            >
              <div className="flex items-center">
                <div className="w-1 h-1 rounded-full bg-accent/60 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-zinc-300 hover:text-accent transition-colors duration-200"
                >
                  {post && post.metadata && post.metadata.title
                    ? post.metadata.title.toLowerCase()
                    : "Untitled Post"}
                </Link>
              </div>

              <span className="text-xs text-zinc-500 mt-1 sm:mt-0 bg-zinc-800/50 px-2 py-0.5 rounded-full">
                {post?.metadata?.date
                  ? formatDate(post.metadata.date)
                  : "no date"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function formatDate(dateString: string) {
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return "invalid date"
    }
    return date
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      .toLowerCase()
  } catch (error) {
    return "invalid date"
  }
}
