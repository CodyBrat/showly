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
      image: "https://m.media-amazon.com/images/M/MV5BZWU4NDY0ODktOGI3OC00NWE1LWIwYmQtNmJiZWU3NmZlMDhkXkEyXkFqcGc@._V1_.jpg",
      title: "Until Dawn",
      caption: "25th April 2025"
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/95/Kesari_Chapter_2.jpg/250px-Kesari_Chapter_2.jpg",
      title: "Kesari Chapter 2",
      caption: "In Cinemas • 18th April 2025"
    },
    {
      image: "https://m.media-amazon.com/images/M/MV5BNjIwZWY4ZDEtMmIxZS00NDA4LTg4ZGMtMzUwZTYyNzgxMzk5XkEyXkFqcGc@._V1_.jpg",
      title: "Sinner",
      caption: "In Cinemas • 18th April 2025"
    },
    {
      image: "https://image.tmdb.org/t/p/original/iPPTGh2OXuIv6d7cwuoPkw8govp.jpg",
      title: "Minecraft: The Movie",
      caption: "In Cinemas • 4th April 2025"
    },
    {
      image: "https://s3.amazonaws.com/nightjarprod/content/uploads/sites/130/2025/02/03190714/rzfqeLdHIysJGrspMICyedpqDqt-scaled.jpg",
      title: "Paddington in Peru",
      caption: "In Cinemas • 18th April 2025"
    },
    {
      image: "https://m.media-amazon.com/images/M/MV5BYjhkZjM3ZWYtMjUxMS00YzhlLTkxZWYtMzhkMzFhOTQ1NjRkXkEyXkFqcGc@._V1_.jpg",
      title: "Amateur",
      caption: "In Cinemas • 11th April 2025"
    },
    {
      image: "https://dx35vtwkllhj9.cloudfront.net/the-chosen-inc/the-chosen-last-supper/images/gallery/image1.jpg",
      title: "The Chosen: Last Supper",
      caption: "In Cinemas • 17th April 2025"
    },
    {
      image: "https://stat5.bollywoodhungama.in/wp-content/uploads/2023/10/Chhaava.jpg",
      title: "Chhaava",
      caption: "In Cinemas • 14th April 2025"
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
