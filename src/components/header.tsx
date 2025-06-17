import { ScrambleText } from "@/components/scramble-text"
import { MapPin, Code2 } from "lucide-react"

export function Header() {
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
        {/* <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4" />
          full stack developer
        </div> */}
      </div>
      {/* <p className="leading-relaxed animate-fade-in-up text-lg text-gray-300">
        A 20-year-old CS undergrad who builds what might help, knowing it may
        not. I craft elegant web solutions with modern technologies and have a
        passion for creating meaningful developer experiences.
      </p> */}
      {/* <div className="flex flex-wrap gap-3 mt-2">
        <span className="px-3 py-1 text-sm bg-accent/20 text-accent rounded-full">
          TypeScript
        </span>
        <span className="px-3 py-1 text-sm bg-accent/20 text-accent rounded-full">
          React
        </span>
        <span className="px-3 py-1 text-sm bg-accent/20 text-accent rounded-full">
          Next.js
        </span>
        <span className="px-3 py-1 text-sm bg-accent/20 text-accent rounded-full">
          tRPC
        </span>
        <span className="px-3 py-1 text-sm bg-accent/20 text-accent rounded-full">
          Tailwind CSS
        </span>
      </div> */}
    </header>
  )
}
