"use client"

import { Search, Command } from "lucide-react"
import { useCommandPalette } from "./command-palette"

export function CommandPaletteButton() {
  const { setIsOpen } = useCommandPalette()

  return (
    <button
      onClick={() => setIsOpen(true)}
      className="flex items-center gap-2 px-3 py-2 text-zinc-400 hover:text-zinc-100 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20"
      aria-label="Open command palette"
    >
      <Command className="w-4 h-4" />
      <span className="text-sm hidden sm:inline">Command</span>
      <div className="flex items-center ml-2 border-l border-zinc-700/50 pl-2">
        <kbd className="px-1.5 py-0.5 text-xs bg-zinc-800 border border-zinc-700 rounded text-zinc-400">
          ⌘
        </kbd>
        <kbd className="px-1.5 py-0.5 ml-1 text-xs bg-zinc-800 border border-zinc-700 rounded text-zinc-400">
          K
        </kbd>
      </div>
    </button>
  )
}
