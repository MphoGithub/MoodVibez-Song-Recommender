import React from 'react'

const SongCard = ({song,index}) => {
    return (
        <div className="card lg:card-side bg-base-100 shadow-sm">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
                    alt="Album" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {index}. {song.artist} - {song.title}</h2>
                </div>
            </div>
    )
}

export default SongCard
