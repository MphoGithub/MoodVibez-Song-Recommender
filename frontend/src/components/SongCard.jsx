import { useAlbumArt } from '../hooks/useAlbumArt'

const SongCard = ({ song, index }) => {
  const art = useAlbumArt(song.artist, song.title)

  return (
    <div className="card card-side bg-base-100 shadow-sm">
      {/* The grey box keeps the layout steady while the image loads */}
      <figure className="w-24 shrink-0 bg-base-300">
        {art && (
          <img
            src={art}
            alt={`${song.title} album art`}
            className="h-24 w-24 object-cover"
            loading="lazy"
          />
        )}
      </figure>
      <div className="card-body py-4 justify-center">
        <h2 className="card-title">
          {index}. {song.artist} - {song.title}
        </h2>
      </div>
    </div>
  )
}

export default SongCard