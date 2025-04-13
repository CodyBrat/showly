import React from 'react'
import './App.css'

function App() {
  return (
    <div className="landing-page">
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
          <h1 className="brand">showly</h1>
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
