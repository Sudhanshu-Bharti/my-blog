"use client"

import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from "react"
import { useRouter } from "next/navigation"
import { Command, X } from "lucide-react"

// Create a context for the command palette
type CommandPaletteContextType = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isMobileDevice: boolean
}

const CommandPaletteContext = createContext<
  CommandPaletteContextType | undefined
>(undefined)

// Provider component
export function CommandPaletteProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobileDevice, setIsMobileDevice] = useState(false)

  // Check if device is touch-enabled on mount
  useEffect(() => {
    setIsMobileDevice(
      "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0
    )
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      } else if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const value = {
    isOpen,
    setIsOpen,
    isMobileDevice,
  }

  return (
    <CommandPaletteContext.Provider value={value}>
      {children}
    </CommandPaletteContext.Provider>
  )
}

// Hook to use the command palette context
export function useCommandPalette() {
  const context = useContext(CommandPaletteContext)
  if (context === undefined) {
    throw new Error(
      "useCommandPalette must be used within a CommandPaletteProvider"
    )
  }
  return context
}

type CommandItem = {
  id: string
  name: string
  description?: string
  icon?: React.ReactNode
  onSelect: () => void
  keywords?: string[]
  category: string
}

export function CommandPalette() {
  const { isOpen, setIsOpen, isMobileDevice } = useCommandPalette()
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const selectedItemRef = useRef<HTMLDivElement>(null)

  // Navigation items
  const pages = [
    { id: "home", name: "Home", path: "/" },
    { id: "blog", name: "Blog", path: "/blog" },
    { id: "projects", name: "Projects", path: "/projects" },
  ]

  // Sections to jump to
  const sections = [
    { id: "about", name: "About Me", selector: "section.about-me" },
    {
      id: "blog-section",
      name: "Blog Posts",
      selector: "section.blog-section",
    },
    { id: "links", name: "Social Links", selector: "section.links-section" },
  ]

  // Theme actions
  const actions = [
    {
      id: "source",
      name: "View Source Code",
      url: "https://github.com/sudhanshu-bharti/my-blogs",
    },
    { id: "contact", name: "Contact Me", url: "mailto:itsmeshubbb@gmail.com" },
  ]

  // Combine all items into commands
  const commands: CommandItem[] = [
    ...pages.map((page) => ({
      id: `page-${page.id}`,
      name: page.name,
      description: `Go to ${page.name} page`,
      icon: <Command className="w-4 h-4" />,
      onSelect: () => {
        router.push(page.path)
        setIsOpen(false)
      },
      keywords: [page.name.toLowerCase(), "navigate", "page", "go"],
      category: "Pages",
    })),
    ...sections.map((section) => ({
      id: `section-${section.id}`,
      name: section.name,
      description: `Jump to ${section.name} section`,
      icon: <Command className="w-4 h-4" />,
      onSelect: () => {
        // First check if we're on the homepage
        const isHomePage =
          window.location.pathname === "/" ||
          window.location.pathname === "/index" ||
          window.location.pathname === ""

        if (!isHomePage) {
          // If not on homepage, navigate there first and then scroll after page load
          router.push("/")
          // Use localStorage to indicate which section to scroll to after navigation
          localStorage.setItem("scrollToSection", section.selector)
        } else {
          // If already on homepage, scroll directly
          const element = document.querySelector(section.selector)
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        }
        setIsOpen(false)
      },
      keywords: [section.name.toLowerCase(), "section", "scroll", "jump"],
      category: "Sections",
    })),
    ...actions.map((action) => ({
      id: `action-${action.id}`,
      name: action.name,
      onSelect: () => {
        if (action.url) {
          window.open(action.url, "_blank")
          setIsOpen(false)
        }
      },
      keywords: [action.name.toLowerCase(), "action"],
      category: "Actions",
    })),
  ]

  // Filter commands based on search query
  const filteredCommands =
    query === ""
      ? commands
      : commands.filter(
          (command) =>
            command.name.toLowerCase().includes(query.toLowerCase()) ||
            command.description?.toLowerCase().includes(query.toLowerCase()) ||
            command.keywords?.some((keyword) =>
              keyword.includes(query.toLowerCase())
            )
        )

  // Group commands by category
  const groupedCommands = filteredCommands.reduce<
    Record<string, CommandItem[]>
  >((acc, command) => {
    if (!acc[command.category]) {
      acc[command.category] = []
    }
    acc[command.category].push(command)
    return acc
  }, {})

  // Flatten grouped commands for selection
  const flattenedFilteredCommands = filteredCommands

  useEffect(() => {
    // Reset selected index when query changes
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    const scrollToSection = localStorage.getItem("scrollToSection")
    if (scrollToSection) {
      const timer = setTimeout(() => {
        const element = document.querySelector(scrollToSection)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }
        localStorage.removeItem("scrollToSection")
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [])
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    if (selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      })
    }
  }, [selectedIndex])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prevIndex) =>
          prevIndex < flattenedFilteredCommands.length - 1
            ? prevIndex + 1
            : prevIndex
        )
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        )
        break
      case "Enter":
        e.preventDefault()
        if (flattenedFilteredCommands.length > 0) {
          flattenedFilteredCommands[selectedIndex].onSelect()
        }
        break
      case "Escape":
        e.preventDefault()
        setIsOpen(false)
        break
      default:
        break
    }
  }

  // Touch event handlers for mobile devices
  const handleTouchStart = (index: number) => {
    setSelectedIndex(index)
  }

  const handleTouchEnd = (item: CommandItem) => {
    item.onSelect()
  }

  if (!isOpen) return null
  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-zinc-900/50 backdrop-blur-sm flex items-start justify-center"
      onClick={() => setIsOpen(false)}
    >
      <div
        className={`relative w-full ${
          isMobileDevice ? "max-w-full h-full" : "max-w-md mt-16 sm:mt-20"
        }`}
        style={{ maxWidth: "100vw" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`bg-zinc-900 border border-zinc-700/50 shadow-2xl overflow-hidden ${
            isMobileDevice ? "h-full rounded-none" : "rounded-xl"
          }`}
        >
          {/* Search input */}
          <div className="relative p-3 sm:p-4 border-b border-zinc-800">
            <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 bg-zinc-800/50 rounded-lg focus-within:ring-1 focus-within:ring-accent/30 transition-all duration-200">
              <Command className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-zinc-200 placeholder-zinc-500 text-sm sm:text-base"
                placeholder="Search commands..."
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
              />
              {isMobileDevice ? (
                <button
                  className="p-1.5 text-zinc-400 hover:text-zinc-200 focus:outline-none"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsOpen(false)
                  }}
                >
                  <X className="w-5 h-5" />
                </button>
              ) : (
                <kbd className="hidden sm:flex px-2 py-0.5 text-xs bg-zinc-800 border border-zinc-700 rounded text-zinc-400">
                  ESC
                </kbd>
              )}
            </div>
          </div>{" "}
          {/* Results */}
          <div
            className={`
            ${
              isMobileDevice
                ? "h-[calc(100vh-9rem)]"
                : "max-h-[60vh] sm:max-h-[70vh]"
            } 
            overflow-y-auto py-2 custom-scrollbar
          `}
          >
            {Object.entries(groupedCommands).length > 0 ? (
              Object.entries(groupedCommands).map(([category, items]) => (
                <div key={category} className="px-2 mb-2">
                  <div className="text-xs text-zinc-500 font-medium px-3 py-1.5 uppercase tracking-wider">
                    {category}
                  </div>
                  <div className="mt-1">
                    {items.map((item, index) => {
                      const isSelected =
                        filteredCommands.indexOf(item) === selectedIndex
                      return (
                        <div
                          key={item.id}
                          ref={isSelected ? selectedItemRef : null}
                          onClick={() => item.onSelect()}
                          className={`
                            flex items-center gap-2 sm:gap-3 
                            ${
                              isMobileDevice
                                ? "px-3 py-3.5"
                                : "px-2 sm:px-3 py-2 sm:py-2.5"
                            } 
                            rounded-lg cursor-pointer
                            ${
                              isSelected
                                ? "bg-accent/10 text-accent"
                                : "text-zinc-300 hover:bg-zinc-800/50 active:bg-zinc-800"
                            }
                            transition-colors duration-100
                            ${isMobileDevice ? "touch-manipulation" : ""}
                          `}
                        >
                          {/* Left icon */}
                          <div
                            className={`w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-md border ${
                              isSelected
                                ? "border-accent/20 bg-accent/5 text-accent"
                                : "border-zinc-700 bg-zinc-800 text-zinc-400"
                            }`}
                          >
                            {item.icon || <Command className="w-3.5 h-3.5" />}{" "}
                          </div>
                          {/* Command content */}
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">
                              {item.name}
                            </div>
                            {item.description && (
                              <div
                                className={`text-xs truncate ${
                                  isSelected
                                    ? "text-accent/70"
                                    : "text-zinc-500"
                                }`}
                              >
                                {item.description}
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-zinc-500">
                <p>No results found</p>
                <p className="text-sm mt-1">Try searching for something else</p>
              </div>
            )}{" "}
          </div>{" "}
          {/* Footer */}
          {!isMobileDevice ? (
            <div className="p-3 border-t border-zinc-800 bg-zinc-900/80 text-center text-xs text-zinc-500">
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <div className="flex items-center">
                  <kbd className="px-1.5 py-0.5 text-xs bg-zinc-800 border border-zinc-700 rounded text-zinc-300 mr-1">
                    ↑
                  </kbd>
                  <kbd className="px-1.5 py-0.5 text-xs bg-zinc-800 border border-zinc-700 rounded text-zinc-300 mr-1">
                    ↓
                  </kbd>
                  <span>to navigate</span>
                </div>
                <div className="flex items-center">
                  <kbd className="px-1.5 py-0.5 text-xs bg-zinc-800 border border-zinc-700 rounded text-zinc-300 mr-1">
                    enter
                  </kbd>
                  <span>to select</span>
                </div>
                <div className="flex items-center">
                  <kbd className="px-1.5 py-0.5 text-xs bg-zinc-800 border border-zinc-700 rounded text-zinc-300 mr-1">
                    esc
                  </kbd>
                  <span>to close</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="sticky bottom-0 p-4 border-t border-zinc-800 bg-zinc-900/95 backdrop-blur-sm text-center">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 text-zinc-200 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
