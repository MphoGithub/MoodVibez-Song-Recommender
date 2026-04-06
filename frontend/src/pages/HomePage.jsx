import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import LoadingSpinner from '../components/LoadingSpinner'
import { useState } from 'react';
import toast from 'react-hot-toast'
import authService from '../services/auth';
import {useNavigate} from 'react-router'
import Footer from '../components/Footer';

const HomePage = () => {
  const [mood, setMood] = useState('');
  const [region, setRegion] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  
  useEffect(() => {
    document.title = "Home - MoodVibez";
  },[]);
  const handleSubmit =async (e) => {
    e.preventDefault();
    if (!mood || !region) {
      toast.error("You need to select a mood and a region");
      return;
    }

    setLoading(true);
  

    try {
      const results = await authService.getRecommendations(mood,region);
            navigate('/recommendations', { state: { songs: results.songs, mood, region } });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 
        'Failed to get response from Gemini AI. Please try again.');
    }finally
    {
      setLoading(false);
    }

  }


  if (loading) return <LoadingSpinner />
  return (

    <>
      <Navbar />
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold"
            style={{ fontFamily: "'Chewy', cursive" }}>MoodVibez</h1>
            <p className="py-6">
              Welcome to MoodVibez – the app that helps you discover
              music that matches how you feel.
              Whether you're happy, relaxed, sad, or full of energy,
              MoodVibez recommends songs that fit your mood instantly.
            </p>
      <form className="flex flex-col gap-4 items-center"
       onSubmit={handleSubmit}>
        <label>Select a mood</label>
        <select 
        value={mood} 
        onChange={(e) => setMood(e.target.value)}
        className="select select-primary">
          <option value="" disabled>Select a mood</option>
          <option>Happy</option>
          <option>Sad</option>
          <option>Relaxed / Calm</option>
          <option>Romantic</option>
          <option>Angry</option>
          <option>Focused</option>
          <option>Celebratory</option>
        </select>

        <label>Select a region</label>
        <select value={region} 
        onChange={(e) => setRegion(e.target.value)}
        className="select select-secondary">
          <option value="" disabled>Select a region</option>
          <option>South Africa 🇿🇦</option>
          <option>Botswana 🇧🇼</option>
          <option>Namibia 🇳🇦</option>
          <option>Zimbabwe 🇿🇼</option>
          <option>Zambia 🇿🇲</option>
          <option>Mozambique 🇲🇿</option>
          <option>Lesotho 🇱🇸</option>
        </select>
        <button type="submit" className="btn btn-outline btn-accent">
          Get Recommendations
        </button>

      </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default HomePage
