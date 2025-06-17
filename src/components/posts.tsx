"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import type { MDXFileData } from "@/lib/blog"
import { PostItem } from "./post-item"

type PostsProps = {
  posts: MDXFileData[]
}

export function Posts({ posts }: PostsProps) {
  const [isSearching, setIsSearching] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()
  const selectedItemRef = useRef<HTMLDivElement>(null)
  const filteredPosts = posts.filter((item) =>
    item?.metadata?.title
      ? item.metadata.title.toLowerCase().includes(searchQuery.toLowerCase())
      : false
  )

  useEffect(() => {
    setSelectedIndex(0)
  }, [searchQuery])

  const scrollSelectedIntoView = () => {
    if (selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !isSearching) {
        e.preventDefault()
        setIsSearching(true)
      } else if (e.key === "Escape" && isSearching) {
        setIsSearching(false)
        setSearchQuery("")
        document.activeElement instanceof HTMLElement &&
          document.activeElement.blur()
      } else if (
        isSearching &&
        (((e.ctrlKey || e.metaKey) && (e.key === "j" || e.key === "k")) ||
          e.key === "ArrowDown" ||
          e.key === "ArrowUp")
      ) {
        e.preventDefault()
        setSelectedIndex((prev) => {
          const isDownward =
            e.key === "ArrowDown" || ((e.ctrlKey || e.metaKey) && e.key === "j")

          const newIndex = isDownward
            ? prev < filteredPosts.length - 1
              ? prev + 1
              : prev
            : prev > 0
            ? prev - 1
            : prev

          scrollSelectedIntoView()
          return newIndex
        })
      } else if (isSearching && e.key === "Enter" && filteredPosts.length > 0) {
        router.push(`/blog/${filteredPosts[selectedIndex].slug}`)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isSearching, filteredPosts, selectedIndex, router])

  return (
    <>
      {" "}
      {isSearching && (
        <div className="fixed bottom-6 left-4 right-4 max-w-2xl mx-auto bg-zinc-900/90 backdrop-blur-lg border border-zinc-700/50 rounded-lg p-4 shadow-lg shadow-black/30 z-50">
          <div className="flex items-center text-zinc-300 bg-zinc-800/50 rounded-md px-3 py-2 border border-zinc-700/30 focus-within:border-accent/30 focus-within:ring-1 focus-within:ring-accent/20 transition-all duration-200">
            <span className="text-accent mr-2 font-mono">/</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-zinc-200"
              autoFocus
              placeholder="Search blog posts..."
              aria-label="Search posts"
              role="searchbox"
              aria-expanded={filteredPosts.length > 0}
              aria-controls="search-results"
              aria-activedescendant={
                isSearching && filteredPosts.length > 0
                  ? `post-${filteredPosts[selectedIndex].slug}`
                  : undefined
              }
            />
            <kbd className="hidden sm:flex px-2 py-0.5 text-xs bg-zinc-800 border border-zinc-700 rounded text-zinc-400 items-center">
              ESC
            </kbd>
          </div>
        </div>
      )}
      <div className="space-y-3">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((item, index) => (
            <div
              key={item.slug}
              ref={
                isSearching && index === selectedIndex ? selectedItemRef : null
              }
            >
              <PostItem
                post={item}
                isSelected={isSearching && index === selectedIndex}
              />
            </div>
          ))
        ) : (
          <div className="p-8 text-center rounded-lg border border-zinc-800/50 bg-zinc-900/20">
            <p className="text-zinc-400">No posts found matching your search</p>
          </div>
        )}
      </div>
    </>
  )
}
