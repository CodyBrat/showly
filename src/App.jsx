import { useState } from 'react'
import './App.css'
import ShowlyTitle from './components/ShowlyTitle'
import DecryptedText from './components/DecryptedText'
import CircularGallery from './components/CircularGallery'

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
        <div style={{ height: '600px', position: 'relative', maxWidth: '90%', margin: '0 auto' }}>
          <CircularGallery 
            items={categoryItems}
            bend={3} 
            textColor="#ffffff" 
            borderRadius={0.05} 
            font="bold 30px DM Sans"
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
            <div className="movie-card">
              <div className="movie-image">
                <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Movie 1" />
              </div>
              <div className="movie-info">
                <h3>Inception 2</h3>
                <p>Coming Soon • Dec 2024</p>
              </div>
            </div>
            <div className="movie-card">
              <div className="movie-image">
                <img src="https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Movie 2" />
              </div>
              <div className="movie-info">
                <h3>The Matrix Resurrection</h3>
                <p>Premiere • Nov 2024</p>
              </div>
            </div>
            <div className="movie-card">
              <div className="movie-image">
                <img src="https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Movie 3" />
              </div>
              <div className="movie-info">
                <h3>Interstellar 2</h3>
                <p>Early Access • Oct 2024</p>
              </div>
            </div>
            <div className="movie-card">
              <div className="movie-image">
                <img src="https://images.unsplash.com/photo-1604975701397-6365ccbd028a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Movie 4" />
              </div>
              <div className="movie-info">
                <h3>Dune: Part Three</h3>
                <p>Pre-booking • Jan 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
