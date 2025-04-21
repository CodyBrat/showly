import { useState } from 'react'
import './App.css'
import ShowlyTitle from './components/ShowlyTitle'
import DecryptedText from './components/DecryptedText'
import CircularGallery from './components/CircularGallery'
import TiltedCard from './components/TiltedCard'

function App() {
  const [count, setCount] = useState(0)

  const categoryItems = [
    { image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', text: 'Movies' },
    { image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', text: 'Food' },
    { image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', text: 'Concerts' },
    { image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', text: 'Music' },
    { image: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', text: 'Comedy' },
    { image: 'https://images.unsplash.com/photo-1579710039144-85d6bdffddc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', text: 'Sports' }
  ]

  const movies = [
    {
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      title: "Inception 2",
      caption: "Coming Soon • Dec 2024"
    },
    {
      image: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      title: "The Matrix Resurrection",
      caption: "Premiere • Nov 2024"
    },
    {
      image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      title: "Interstellar 2",
      caption: "Early Access • Oct 2024"
    },
    {
      image: "https://images.unsplash.com/photo-1604975701397-6365ccbd028a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      title: "Dune: Part Three",
      caption: "Pre-booking • Jan 2025"
    }
  ]

  return (
    <>
      <div className="navbar-container">
        <nav className="navbar">
          <div className="navbar-logo"></div>
          <ul className="navbar-links">
            <li><a href="#" className="navbar-link">Home</a></li>
            <li><a href="#" className="navbar-link">Integrations</a></li>
            <li><a href="#" className="navbar-link">Pricing</a></li>
            <li><a href="#" className="navbar-link">Logs</a></li>
            <li><a href="#" className="navbar-link">Contact</a></li>
          </ul>
          <div className="navbar-actions">
            <button className="signup-button">Get Template</button>
          </div>
        </nav>
      </div>
      <div className="app-container">
        <ShowlyTitle/>
      </div>
      <div className='browse-category'>
        <h1>
          <DecryptedText 
            text="Browse category" 
            animateOn="view"
            sequential={true}
            speed={80}
            maxIterations={20}
            className="decrypted"
            encryptedClassName="encrypted"
            parentClassName="decryption-animation"
          />
        </h1>
        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-value">1,200+</span>
            <span className="stat-label">Events</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-value">6</span>
            <span className="stat-label">Categories</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-value">24/7</span>
            <span className="stat-label">Support</span>
          </div>
        </div>
        <div className="gallery-wrapper" style={{ height: '480px', position: 'relative', maxWidth: '90%', margin: '0 auto' }}>
          <div className="category-badge badge-explore">Explore All Categories</div>
          <div className="category-badge badge-trending">Trending Events</div>
          <div className="icon-grid"></div>
          <CircularGallery 
            items={categoryItems}
            bend={3} 
            textColor="#ffffff" 
            borderRadius={0.05} 
            font="bold 26px DM Sans"
          />
        </div>
      </div>
      <div className='browse-category'>
        <h1>
        <DecryptedText 
            text="Upcoming Events" 
            animateOn="view"
            sequential={true}
            speed={80}
            maxIterations={20}
            className="decrypted"
            encryptedClassName="encrypted"
            parentClassName="decryption-animation"
          />
        </h1>
        
        <div className="event-category">
          <h2>Movies</h2>
          <div className="movie-grid">
            {movies.map((movie, index) => (
              <div className="movie-card" key={index}>
                <div className="movie-image">
                  <TiltedCard
                    imageSrc={movie.image}
                    altText={movie.title}
                    captionText={movie.title}
                    containerHeight="360px"
                    containerWidth="90%"
                    imageHeight="360px"
                    imageWidth="100%"
                    rotateAmplitude={12}
                    scaleOnHover={1.05}
                    showMobileWarning={false}
                    showTooltip={true}
                    displayOverlayContent={true}
                    overlayContent={
                      <div className="movie-overlay-content">
                        <h3>{movie.title}</h3>
                        <p>{movie.caption}</p>
                      </div>
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
