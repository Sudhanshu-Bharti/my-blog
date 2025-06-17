import { ScrambleText } from "@/components/scramble-text"
import { PostsList } from "@/components/posts-list"
import { getPosts } from "@/lib/blog"
import { Metadata } from "next"

const posts = getPosts().sort((a, b) => {
  try {
    const dateA = a?.metadata?.date ? new Date(a.metadata.date).getTime() : 0
    const dateB = b?.metadata?.date ? new Date(b.metadata.date).getTime() : 0
    return dateB - dateA
  } catch (error) {
    return 0
  }
})

export default async function BlogPage() {
  return (
    <main className="animate-fade-in-up relative">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4 text-zinc-100">
          <span className="text-accent mr-2">{"<"}</span>
          <ScrambleText text="Blog" />
          <span className="text-accent mr-2">{">"}</span>
        </h1>
        <p className="text-zinc-400 max-w-2xl">
          I write about programming, computer science, and other topics that
          interest me. and yeah i do some typos so bear with me.
        </p>
      </div>

      <div className="bg-zinc-900/30 backdrop-blur-sm p-4 rounded-lg border border-zinc-800/50 mb-8">
        <div className="flex items-center gap-2 text-zinc-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <p className="hidden sm:block text-sm">
            press{" "}
            <kbd className="px-1.5 py-0.5 text-xs bg-zinc-800 border border-zinc-700 rounded text-zinc-300">
              /
            </kbd>{" "}
            to search • navigate with{" "}
            <kbd className="px-1.5 py-0.5 text-xs bg-zinc-800 border border-zinc-700 rounded text-zinc-300">
              ↑
            </kbd>{" "}
            <kbd className="px-1.5 py-0.5 text-xs bg-zinc-800 border border-zinc-700 rounded text-zinc-300">
              ↓
            </kbd>{" "}
            • press{" "}
            <kbd className="px-1.5 py-0.5 text-xs bg-zinc-800 border border-zinc-700 rounded text-zinc-300">
              enter
            </kbd>{" "}
            to select
          </p>
        </div>
      </div>

      <div className="bg-zinc-900/20 backdrop-blur-sm border border-zinc-800/40 rounded-xl p-6">
        <PostsList posts={posts} />
      </div>
    </main>
  )
}

export const metadata: Metadata = {
  title: "Blog",
  description: "Writings on programming, computer science, and more.",
  openGraph: {
    images: [
      {
        url: "https://www.alchemist.vercel.app/og/home?title=blog",
      },
    ],
  },
}
