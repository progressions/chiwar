import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Fights from './components/Fights'
import Campaigns from './components/Campaigns'
import Profile from './components/Profile'
import Login from './components/Login'
import Navbar from './components/Navbar'
import RequireAuth from './components/RequireAuth'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fights" element={<RequireAuth><Fights /></RequireAuth>} />
          <Route path="/fights/:id" element={<RequireAuth><Fights /></RequireAuth>} />
          <Route path="/campaigns" element={<RequireAuth><Campaigns /></RequireAuth>} />
          <Route path="/campaigns/:id" element={<RequireAuth><Campaigns /></RequireAuth>} />
          <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
