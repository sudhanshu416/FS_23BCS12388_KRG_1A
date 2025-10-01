import { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Signup from './components/Signup';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      {/* Navbar */}
      <nav style={navStyle}>
        <NavLink
          style={linkStyle}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          style={linkStyle}
          to="/about"
        >
          About
        </NavLink>
        <NavLink
          style={linkStyle}
          to="/contact"
        >
          Contact
        </NavLink>
        <NavLink
          style={linkStyle}
          to="/signup"
        >
          Signup
        </NavLink>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

// Navbar container
const navStyle = {
  display: 'flex',
  gap: '15px',
  padding: '12px 20px',
  backgroundColor: '#1e293b', // subtle blue-gray instead of plain black
  borderRadius: '10px',
  justifyContent: 'center',
  margin: '20px',
};

// Navbar links
const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: '600',
  padding: '8px 16px',
  borderRadius: '8px',
  transition: '0.3s',
  backgroundColor: '#334155', // slightly lighter bg
  hover: {
    backgroundColor: '#475569',
  },
};

export default App;
