import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import Navbar from '../components/Navbar'
import SongCard from '../components/SongCard'
import LoadingSpinner from '../components/LoadingSpinner'
import Footer from '../components/Footer';

const RecommendationsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(()=>
  {
    document.title = "Recommendations"
  },[])
  if (!state) {
    return <LoadingSpinner />;
  }

  const { songs = [], mood, region } = state;

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">Your Recommendations</h1>
          <p className="text-base-content/60 mt-1">
            {mood} vibes · {region}
          </p>
        </div>

        {songs.length === 0 ? (
          <p className="text-center text-base-content/50">No songs found. Try a different mood or region.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {songs.map((song, i) => (
              <SongCard key={i} song={song} index={i + 1} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            className="btn btn-outline btn-accent"
            onClick={() => navigate('/')}
          >
            Try Another Mood
          </button>
        </div>
      </div>
        <Footer />
    </>
  )
}

export default RecommendationsPage