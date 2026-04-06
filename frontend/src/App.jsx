import React from 'react'
import { Route,Routes } from 'react-router'
import HomePage from './pages/HomePage'
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import RecommendationsPage from './pages/RecommendationsPage'
import ProfilePage from './pages/ProfilePage'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' 
        element={
          <ProtectedRoute>
          <HomePage />
          </ProtectedRoute>
          }/>
          <Route path='/profile'
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }/>
        <Route path='/register' element={<RegistrationPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/recommendations' element={<RecommendationsPage />} />
      </Routes>
    </>
  )
}

export default App
