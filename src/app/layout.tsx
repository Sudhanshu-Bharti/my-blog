import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"
import "./globals.css"
import { Navbar } from "../components/navbar"
import { CommandPalette } from "@/components/command-palette"

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nexxel.dev"),
  title: {
    default: "Sudhanshu Bharti",
    template: "%s | Sudhanshu Bharti",
  },
  description: "A developer who builds what might help, knowing it may not.",
  openGraph: {
    title: "Sudhanshu Bharti",
    description: "A developer who builds what might help, knowing it may not.",
    url: "",
    siteName: "Sudhanshu Bharti",
    locale: "en_US",
    type: "website",
    images: ["/og/home"],
  },
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  twitter: {
    title: "Sudhanshu Bharti",
    card: "summary_large_image",
    creator: "@nexxeln",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {" "}
      <body
        className={`${geistMono.variable} antialiased min-h-screen font-mono custom-scrollbar`}
      >
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Navbar />
          {children}
        </div>
        <CommandPalette />
      </body>
    </html>
  )
}
