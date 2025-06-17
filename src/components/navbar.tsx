"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { CommandPaletteButton } from "./command-palette-button"

const listofLinks = [
  { href: "/", keylabel: "[h]", label: "home" },
  { href: "/blog", keylabel: "[b]", label: "blog" },
  { href: "/projects", keylabel: "[p]", label: "projects" },
]

export function Navbar() {
  const router = useRouter()

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Don't trigger if any input elements are focused or if event target is an input
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        event.target instanceof HTMLInputElement
      ) {
        return
      }

      switch (event.key.toLowerCase()) {
        case "h":
          router.push("/")
          break
        case "b":
          router.push("/blog")
          break
        case "p":
          router.push("/projects")
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [router])
  return (
    <nav className="flex items-center justify-between mb-12 text-md">
      <CommandPaletteButton />

      <div className="flex space-x-4">
        {listofLinks.map((link) => (
          <Link
            key={link.keylabel}
            href={link.href}
            className="hover:text-accent transition-colors duration-200"
          >
            <span>
              <span className="text-neutral-400 ">{link.keylabel}</span>{" "}
              {link.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
