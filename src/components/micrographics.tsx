"use client"

import { cn } from "@/lib/utils"

type MicrographicVariant = "corner" | "band" | "signal"

export function Micrographic({
  className,
  variant = "corner",
}: {
  className?: string
  variant?: MicrographicVariant
}) {
  if (variant === "band") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 220 64"
        className={cn("pointer-events-none absolute text-white/10", className)}
        fill="none"
      >
        <path
          d="M4 44H62L78 28H126L146 48H216"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M4 56H44L58 42H104"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.55"
        />
        <circle cx="62" cy="44" r="2" fill="currentColor" />
        <circle cx="126" cy="28" r="2" fill="currentColor" />
        <circle cx="146" cy="48" r="2" fill="currentColor" />
      </svg>
    )
  }

  if (variant === "signal") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 180 40"
        className={cn("pointer-events-none absolute text-white/12", className)}
        fill="none"
      >
        <path
          d="M2 26H34L44 14H78L92 30H122L134 18H178"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="34" cy="26" r="1.8" fill="currentColor" />
        <circle cx="78" cy="14" r="1.8" fill="currentColor" />
        <circle cx="122" cy="30" r="1.8" fill="currentColor" />
        <circle cx="134" cy="18" r="1.8" fill="currentColor" />
      </svg>
    )
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 160 120"
      className={cn("pointer-events-none absolute text-white/10", className)}
      fill="none"
    >
      <path
        d="M158 14H106L90 30V56H56L42 70V106H2"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M158 42H118L102 58"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.45"
      />
      <circle cx="106" cy="14" r="2" fill="currentColor" />
      <circle cx="90" cy="56" r="2" fill="currentColor" />
      <circle cx="42" cy="106" r="2" fill="currentColor" />
    </svg>
  )
}
