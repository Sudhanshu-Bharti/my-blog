import Link from "next/link"

const links = [
  { title: "email", href: "mailto:itsmeshubbb@gmail.com" },
  { title: "x.com", href: "https://x.com/its_me_shubbb" },
  { title: "github", href: "https://github.com/sudhanshu-bharti" },
  {
    title: "linkedin",
    href: "https://www.linkedin.com/in/sudhanshu-bharti-877889261",
  },
]

export function LinksSection() {
  return (
    <section className="animate-fade-in-up">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
        <span className="text-accent mr-2">{"~"}</span> socials:
      </h2>
      <div className="flex flex-wrap gap-4 text-sm">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="text-gray-400 hover:text-accent transition-colors duration-200"
          >
            {link.title}
          </Link>
        ))}
      </div>
    </section>
  )
}
