"use client"

import { useEffect } from "react"

export function SectionScrollHandler() {
  // Handle section scrolling after navigation
  useEffect(() => {
    // Check if there's a stored section selector
    const scrollToSection = localStorage.getItem("scrollToSection")
    if (scrollToSection) {
      // Wait for the DOM to be fully loaded and components to render
      const timer = setTimeout(() => {
        const element = document.querySelector(scrollToSection)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
          console.log(`Scrolling to section: ${scrollToSection}`)
        } else {
          console.log(`Section not found: ${scrollToSection}`)
        }
        // Clear the stored section
        localStorage.removeItem("scrollToSection")
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [])

  // This is a utility component that doesn't render anything
  return null
}
