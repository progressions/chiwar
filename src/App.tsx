import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Fights from './components/Fights';

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/fights">Fights</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fights" element={<Fights />} />
        <Route path="/fights/:id" element={<Fights />} />
      </Routes>
    </div>
  );
}

export default App;
