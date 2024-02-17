import './App.css'
import Home from './components/Home'
import Profile from './components/Profile'
import Navbar from './components/Navbar'
import Login from './components/Login';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
