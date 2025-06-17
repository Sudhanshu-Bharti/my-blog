import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
export const SPOTIFY_CLIENT_SECRET =
  process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
export const SPOTIFY_REFRESH_TOKEN =
  process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN
export const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`
export const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
