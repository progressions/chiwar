import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Fights from './components/Fights';
import Profile from './components/Profile';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/auth'

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fights" element={<Fights />} />
          <Route path="/fights/:id" element={<Fights />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
