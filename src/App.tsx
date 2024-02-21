import '@/index.css'
import '@/App.css'
import { ThemeProvider } from "@/components/ThemeProvider"
import Home from './components/Home'
import Profile from './components/Profile'
import Campaigns from './components/campaigns/Campaigns'
import Fights from './components/Fights'
import Navbar from './components/Navbar'
import Login from './components/Login'
import RequireAuth from './components/RequireAuth'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <div className="container mx-auto px-8">
            <Navbar />
            <Routes>
              <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
              <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
              <Route path="/campaigns" element={<RequireAuth><Campaigns /></RequireAuth>} />
              <Route path="/fights" element={<RequireAuth><Fights /></RequireAuth>} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}

export default App
