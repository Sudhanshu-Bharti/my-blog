"use client"

import { useEffect, useState, useRef } from "react"
import { Disc3, Loader2, Music, Volume2, Pause, Play } from "lucide-react"
import { AnimatedBackground } from "./motion-primitives/animated-background"

import { getNowPlaying } from "@/lib/spotify_getNowPlaying"

type SpotifyData = {
  isPlaying: boolean
  title: string
  artist: string
  albumImageUrl: string
  songUrl: string
  timePlayed?: number
  timeTotal?: number
}

type PlayerState = "PLAYING" | "PAUSED" | "OFFLINE" | "ERROR"

export function SpotifyPlayer() {
  const [data, setData] = useState<SpotifyData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [playerState, setPlayerState] = useState<PlayerState>("OFFLINE")
  const [lastPlayedTrack, setLastPlayedTrack] = useState<SpotifyData | null>(
    null
  )
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }
  // Load last played track from localStorage on component mount
  useEffect(() => {
    try {
      const savedTrack = localStorage.getItem("lastPlayedTrack")
      if (savedTrack) {
        const parsedTrack = JSON.parse(savedTrack)
        setLastPlayedTrack(parsedTrack)
      }
    } catch (error) {
      console.error(
        "Failed to load last played track from localStorage:",
        error
      )
    }
  }, [])

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await getNowPlaying()

        if (typeof response === "object" && response !== null) {
          const spotifyData: SpotifyData = {
            isPlaying: response.isPlaying,
            title: response.title,
            artist: response.artist,
            albumImageUrl: response.albumImageUrl,
            songUrl: response.songUrl,
            timePlayed: response.timePlayed,
            timeTotal: response.timeTotal,
          }

          try {
            localStorage.setItem("lastPlayedTrack", JSON.stringify(spotifyData))
          } catch (error) {
            console.error("Failed to save track to localStorage:", error)
          }

          setData(spotifyData)
          setLastPlayedTrack(spotifyData)
          setPlayerState(spotifyData.isPlaying ? "PLAYING" : "PAUSED")
        } else if (response === "Currently Not Playing") {
          setData(null)
          setPlayerState("OFFLINE")
        } else {
          setData(null)
          setPlayerState("ERROR")
        }
      } catch (error) {
        console.error("Failed to fetch Spotify data:", error)
        setData(null)
        setPlayerState("ERROR")
      } finally {
        setLoading(false)
      }
    }

    fetchNowPlaying()

    intervalRef.current = setInterval(() => {
      fetchNowPlaying()
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  if (loading) {
    return (
      <div className="rounded-xl bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 p-4 flex items-center justify-center h-20">
        <Loader2 className="w-5 h-5 text-green-500 animate-spin" />
        <span className="ml-2 text-sm text-zinc-400">
          Loading music data...
        </span>
      </div>
    )
  }
  if (!data || playerState === "OFFLINE") {
    if (lastPlayedTrack) {
      return (
        <div className="rounded-xl bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 p-4 flex items-center h-20">
          <div className="relative flex-shrink-0 mr-4">
            {lastPlayedTrack.albumImageUrl ? (
              <img
                src={lastPlayedTrack.albumImageUrl}
                alt={`${lastPlayedTrack.title} album art`}
                className="w-12 h-12 rounded-lg object-cover shadow-lg opacity-80"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-zinc-800/50 flex items-center justify-center">
                <Music className="w-6 h-6 text-zinc-500" />
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 bg-zinc-600 rounded-full p-1 shadow-lg">
              <Disc3 className="w-3 h-3 text-black" />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-300">Last played</p>
            <a
              href={lastPlayedTrack.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <p className="text-xs text-zinc-400 font-medium hover:text-green-400 transition-colors">
                {lastPlayedTrack.title} - {lastPlayedTrack.artist}
              </p>
            </a>
          </div>
        </div>
      )
    }

    return (
      <div className="rounded-xl bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 p-4 flex items-center h-20">
        <div className="w-12 h-12 rounded-lg bg-zinc-800/50 flex items-center justify-center mr-4">
          <Music className="w-6 h-6 text-zinc-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-300">
            {playerState === "OFFLINE" ? "Sudhanshu is" : "Not playing :("}
          </p>
          <p className="text-xs text-zinc-500">
            {playerState === "OFFLINE"
              ? "currently offline"
              : "anything right now"}
          </p>
        </div>
      </div>
    )
  }

  if (playerState === "ERROR") {
    return (
      <div className="rounded-xl bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 p-4 flex items-center h-20">
        <div className="w-12 h-12 rounded-lg bg-red-900/20 flex items-center justify-center mr-4">
          <Music className="w-6 h-6 text-red-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-red-300">Failed to</p>
          <p className="text-xs text-red-400">fetch song</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-zinc-900/80 border border-zinc-800/50 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.01] hover:shadow-2xl">
      <a
        href={data.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-id="spotify-card"
        className="block group"
      >
        <div className="p-4 flex items-center gap-4">
          <div className="relative flex-shrink-0">
            {data.albumImageUrl ? (
              <img
                src={data.albumImageUrl || "/placeholder.svg"}
                alt={`${data.title} album art`}
                className="w-12 h-12 rounded-lg object-cover shadow-lg"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-zinc-800/50 flex items-center justify-center">
                <Music className="w-6 h-6 text-zinc-500" />
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 shadow-lg">
              {data.isPlaying ? (
                <Volume2 className="w-3 h-3 text-black" />
              ) : (
                <Pause className="w-3 h-3 text-black" />
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-medium">
                {data.isPlaying ? "Now playing" : "Recently played"}
              </span>
            </div>
            <p className="text-sm font-semibold text-white truncate group-hover:text-green-400 transition-colors duration-200">
              {data.title}
            </p>
            <p className="text-xs text-zinc-400 truncate mb-2">{data.artist}</p>

            {data.timePlayed !== undefined && data.timeTotal !== undefined && (
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span>{formatTime(data.timePlayed)}</span>
                <div className="flex-1 h-1 bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all duration-1000"
                    style={{
                      width: `${(data.timePlayed / data.timeTotal) * 100}%`,
                    }}
                  />
                </div>
                <span>{formatTime(data.timeTotal)}</span>
              </div>
            )}
          </div>

          <div className="flex-shrink-0">
            {data.isPlaying ? (
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <Play className="w-4 h-4 text-green-400 fill-current" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-zinc-700/50 flex items-center justify-center">
                <Disc3 className="w-4 h-4 text-zinc-400" />
              </div>
            )}
          </div>
        </div>
      </a>
    </div>
  )
}
