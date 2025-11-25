"use client"
import { ScrambleText } from "@/components/scramble-text"
import { MapPin, FileText } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export function Header() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "r" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        // Prevent if user is typing in an input (though none exist currently)
        if (
          document.activeElement?.tagName === "INPUT" ||
          document.activeElement?.tagName === "TEXTAREA"
        ) {
          return
        }
        window.open(
          "https://drive.google.com/file/d/1NzGhemYC099_I0vO0z2UaeHrgjs9rXy1/view?usp=sharing",
          "_blank",
        )
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <header className="mb-16 space-y-6">
      <h1 className="text-4xl font-bold mb-4 animate-fade-in text-white">
        <span className="inline-block">
          <ScrambleText text="sudhanshu bharti" />
        </span>
      </h1>
      <div className="flex flex-col md:flex-row md:items-center gap-4 text-gray-400">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          gandhinagar, india
        </div>

      </div>
      <div className="flex items-center gap-2">
        <Link
          href="https://drive.google.com/file/d/1NzGhemYC099_I0vO0z2UaeHrgjs9rXy1/view?usp=sharing"
          target="_blank"
          className="flex items-center gap-2 hover:text-accent transition-colors"
        >
          <FileText className="w-4 h-4" />
          resume
        </Link>
      </div>
    </header>
  )
}
