import { useEffect, useState } from 'react'

// Remembers results, so the same song is never fetched twice
const cache = new Map()

export const useAlbumArt = (artist, title) => {
  const key = `${artist} ${title}`
  const [art, setArt] = useState(cache.get(key) ?? null)

  useEffect(() => {
    if (cache.has(key)) {
      setArt(cache.get(key))
      return
    }
    const controller = new AbortController()

    fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(key)}&entity=song&limit=1`,
      { signal: controller.signal }
    )
      .then((res) => res.json())
      .then((data) => {
        // artworkUrl100 is small, so ask for a bigger version
        const url = data.results?.[0]?.artworkUrl100?.replace('100x100bb', '300x300bb') ?? null
        cache.set(key, url)
        setArt(url)
      })
      .catch(() => {}) // no art is fine, the card still works

    return () => controller.abort()
  }, [key])

  return art
}