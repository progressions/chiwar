import './App.css'
import Home from './components/Home'
import Profile from './components/Profile'
import Campaigns from './components/Campaigns'
import Navbar from './components/Navbar'
import Login from './components/Login'
import RequireAuth from './components/RequireAuth'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path="/campaigns" element={<RequireAuth><Campaigns /></RequireAuth>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
