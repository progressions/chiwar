import React from 'react';
import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Fights from './components/Fights';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/fights">Fights</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fights" element={<Fights />} />
        <Route path="/fights/:id" element={<Fights />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
