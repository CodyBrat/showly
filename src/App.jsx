import React, { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const textRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement for the variable proximity effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate distortion effect for each letter
  useEffect(() => {
    const text = textRef.current;
    if (!text) return;
    
    const letters = text.querySelectorAll('.letter');
    const sensitivity = 100; // Adjust sensitivity of the effect
    const maxDistortion = 50; // Max distortion amount
    
    letters.forEach((letter) => {
      const rect = letter.getBoundingClientRect();
      const letterX = rect.left + rect.width / 2;
      const letterY = rect.top + rect.height / 2;
      
      // Calculate distance between mouse and letter
      const distanceX = mousePosition.x - letterX;
      const distanceY = mousePosition.y - letterY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      // Calculate distortion based on proximity
      const distortion = Math.max(0, 1 - distance / sensitivity);
      const letterDistortion = distortion * maxDistortion;
      
      // Apply transformations
      letter.style.transform = `translate(${distortion * -distanceX * 0.1}px, ${distortion * -distanceY * 0.1}px) scale(${1 + distortion * 0.1})`;
      letter.style.filter = `blur(${letterDistortion * 0.05}px)`;
      letter.style.opacity = 1 - (distortion * 0.2);
      letter.style.transition = 'transform 0.1s ease-out, filter 0.1s ease-out, opacity 0.1s ease-out';
    });
  }, [mousePosition]);

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <span className="logo-text">showly</span>
          </div>
          
          <div className="navbar-links-desktop">
            <a href="#" className="nav-link">Home</a>
            <a href="#" className="nav-link">Events</a>
            <a href="#" className="nav-link">Artists</a>
            <a href="#" className="nav-link">Venues</a>
            <a href="#" className="nav-link">Pricing</a>
          </div>
          
          <div className="navbar-buttons">
            <button className="login-btn">Log In</button>
            <button className="signup-btn">Get Started</button>
            <button 
              className={`menu-toggle ${isNavOpen ? 'active' : ''}`} 
              onClick={() => setIsNavOpen(!isNavOpen)}
              aria-label="Toggle navigation menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={`navbar-mobile ${isNavOpen ? 'open' : ''}`}>
          <div className="navbar-links-mobile">
            <a href="#" className="nav-link">Home</a>
            <a href="#" className="nav-link">Events</a>
            <a href="#" className="nav-link">Artists</a>
            <a href="#" className="nav-link">Venues</a>
            <a href="#" className="nav-link">Pricing</a>
            <div className="mobile-buttons">
              <button className="login-btn">Log In</button>
              <button className="signup-btn">Get Started</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Background with circles */}
      <div className="background">
        <div className="circle circle-1">
          <div className="speaker-ring speaker-ring-1"></div>
          <div className="speaker-ring speaker-ring-2"></div>
          <div className="speaker-ring speaker-ring-3"></div>
          <div className="speaker-center"></div>
          <div className="speaker-dust dust-1"></div>
          <div className="speaker-dust dust-2"></div>
          <div className="speaker-dust dust-3"></div>
          <div className="speaker-dust dust-4"></div>
          <div className="speaker-dust dust-5"></div>
          <div className="speaker-dust dust-6"></div>
          <div className="speaker-dust dust-7"></div>
          <div className="speaker-dust dust-8"></div>
        </div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
        <div className="speaker-dust"></div>
        <div className="light-effect"></div>
        
        {/* Music elements */}
        <div className="music-element guitar"></div>
        <div className="music-element vinyl"></div>
        <div className="music-element ticket"></div>
        <div className="music-element music-note note-1"></div>
        <div className="music-element music-note note-2"></div>
        <div className="music-element music-note note-3"></div>
        <div className="music-element headphones"></div>
        <div className="music-element microphone"></div>
        <div className="music-element drums"></div>
        
        {/* Top right elements */}
        <div className="music-element top-right equalizer"></div>
        <div className="music-element top-right mixer"></div>
        <div className="music-element top-right music-note note-4"></div>
        <div className="music-element top-right dj-controller"></div>
      </div>

      {/* Main container */}
      <div className="container">
        {/* Brand section */}
        <section className="brand-section">
          <h1 className="brand proximity-text" ref={textRef}>
            <span className="letter">s</span>
            <span className="letter">h</span>
            <span className="letter">o</span>
            <span className="letter">w</span>
            <span className="letter">l</span>
            <span className="letter">y</span>
          </h1>
          <p className="tagline">LET'S DO IT TOGETHER</p>
        </section>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <div className="arrows">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="copyright">ALL RIGHTS RESERVED</div>
          <div className="company">SHOWLY AGENCY © 2025</div>
        </footer>
      </div>
    </div>
  )
}

export default App
