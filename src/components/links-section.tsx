import Link from "next/link"

const links = [
  { title: "email", href: "mailto:sudhanshubharti.dev@gmail.com" },
  { title: "x.com", href: "https://x.com/alchemist6u" },
  { title: "github", href: "https://github.com/sudhanshu-bharti" },
  {
    title: "linkedin",
    href: "https://www.linkedin.com/in/sudhanshu-bharti-877889261",
  },
]

export function LinksSection() {
  return (
    <section className="mb-16 animate-fade-in-up links-section">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
        <span className="text-accent mr-2">{"~"}</span> socials
      </h2>

      <div className="relative bg-zinc-900/40 backdrop-blur-sm rounded-lg p-6 border border-zinc-800/50">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-lg opacity-30"></div>

        <div className="flex flex-wrap gap-4 text-sm relative z-10">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-accent transition-colors duration-200 flex items-center gap-1.5 group"
            >
              <span className="w-1 h-1 rounded-full bg-accent/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
