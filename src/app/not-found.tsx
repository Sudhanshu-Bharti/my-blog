import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex items-center justify-center">
      <div className="space-y-6 text-center">
        <h1>
          <span className="text-6xl font-bold text-accent">404</span>
          <br />
          Page Not Found
        </h1>
        <p className="text-gray-400">
          a typo? wrong link? or maybe the page was removed?
        </p>
        <Link
          href="/"
          className="inline-block text-gray-400 underline-offset-2 underline hover:text-accent transition-colors"
        >
          return home
        </Link>
      </div>
    </div>
  )
}
