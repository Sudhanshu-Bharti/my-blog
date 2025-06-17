import { type MDXFileData } from "@/lib/blog"
import Link from "next/link"

type PostItemProps = {
  post: MDXFileData
  isSelected?: boolean
}

export function PostItem({ post, isSelected }: PostItemProps) {
  return (
    <div
      className={`relative group p-4 rounded-lg transition-all duration-200 hover:bg-zinc-900/60 backdrop-blur-sm border border-transparent hover:border-zinc-700/50 ${
        isSelected
          ? "bg-gradient-to-r from-accent/10 to-transparent border-l-2 border-l-accent/50"
          : ""
      }`}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-zinc-800/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 relative z-10">
        <div className="flex-1">
          <Link
            href={`/blog/${post.slug}`}
            prefetch={true}
            className="text-zinc-100 font-medium hover:text-accent transition-colors duration-200 group-hover:underline decoration-accent/30 decoration-1 underline-offset-4"
          >
            {(post.metadata?.title || "Untitled Post").toLowerCase()}
          </Link>

          {post.metadata?.description && (
            <p className="text-sm text-zinc-400 mt-1 line-clamp-1 hidden sm:block">
              {post.metadata.description}
            </p>
          )}
        </div>

        <div className="flex items-center text-xs text-zinc-500 shrink-0 bg-zinc-800/50 px-3 py-1 rounded-full">
          <span>
            {post.metadata?.date
              ? new Date(post.metadata.date)
                  .toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                  .toLowerCase()
              : "no date"}
          </span>
        </div>
      </div>
    </div>
  )
}
