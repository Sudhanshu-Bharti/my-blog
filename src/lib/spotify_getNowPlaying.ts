import { getAccessToken } from "./spotify_getToken"
import { NOW_PLAYING_ENDPOINT } from "./utils"

export const getNowPlaying = async () => {
    try {
      const { access_token } = await getAccessToken()

      const response = await fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })

      if (response.status > 400) {
        throw new Error("Unable to Fetch Song")
      } else if (response.status === 204) {
        throw new Error("Currently Not Playing")
      }


      const song = await response.json()
      const albumImageUrl = song.item.album.images[0].url
      const artist = song.item.artists.map((artist: { name: any }) => artist.name).join(", ")
      const isPlaying = song.is_playing
      const songUrl = song.item.external_urls.spotify
      const title = song.item.name
      const timePlayed = song.progress_ms
      const timeTotal = song.item.duration_ms
      const artistUrl = song.item.album.artists[0].external_urls.spotify

      //Returning the song details
      return {
        albumImageUrl,
        artist,
        isPlaying,
        songUrl,
        title,
        timePlayed,
        timeTotal,
        artistUrl,
      }
    } catch (error) {
      console.error("Error fetching currently playing song: ", error)
      return error instanceof Error ? error.message : 'An unknown error occurred'
    }
}