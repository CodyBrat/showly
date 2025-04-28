import { useState, useRef, useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import './App.css'
import ShowlyTitle from './components/ShowlyTitle'
import DecryptedText from './components/DecryptedText'
import CircularGallery from './components/CircularGallery'
import TiltedCard from './components/TiltedCard'
import Movies from './pages/Movies'
import Concerts from './pages/Concerts'
import Comedy from './pages/Comedy'
import BookingPage from './pages/BookingPage'
import ConcertBookingPage from './pages/ConcertBookingPage'

function HomePage() {
  const concertCarouselRef = useRef(null)
  const [activeConcert, setActiveConcert] = useState(0)

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

  const concerts = [
    {
      image: "https://metalinsider.net/wp-content/uploads/2024/12/GunsNRoses_EU_ME_2025_Tour_Banner.jpg",
      title: "Guns N Roses",
      caption: "Live • Aug 2024"
    },
    {
      image: "https://assets-in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-vilen-india-tour-0-2025-4-8-t-12-59-57.jpg",
      title: "Vilen India Tour",
      caption: "Live • Apr 2025"
    },
    {
      image: "https://assets-in.bmscdn.com/discovery-catalog/events/et00438542-jxttzzdppy-landscape.jpg",
      title: "Electronic Music Fest",
      caption: "Tickets Available • Sep 2024"
    },
    {
      image: "https://assets-in.bmscdn.com/discovery-catalog/events/et00434549-xfeqknjtxt-landscape.jpg",
      title: "Jazz Night Live",
      caption: "Limited Seats • Oct 2024"
    },
    // {
    //   image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    //   title: "Symphony Orchestra",
    //   caption: "Premium Experience • Dec 2024"
    // },
    // {
    //   image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    //   title: "Pop Music Awards",
    //   caption: "Annual Event • Nov 2024"
    // }
  ]

  const comedy = [
    {
      image: "https://assets-in.bmscdn.com/discovery-catalog/events/et00355125-pzenufexta-portrait.jpg",
      title: "Kisi Ko Batana Mat",
      description: "A live stand-up comedy show performed by Indian comedian Anubhav Singh Bassi",
      date: "May 9, 2025",
      time: "7:00 PM",
      venue: "Shri Shanmukhananda Fine Arts Auditorium, Mumbai",
      ticketPrice: "₹999 onwards"
    },
    {
      image: "https://in.bmscdn.com/events/moviecard/ET00329412.jpg",
      title: "Kal Ki Chinta Nahi Karta",
      description: "Forget your problems and laugh out loud with the best comedians in the city",
      date: "April 23, 2025",
      time: "7:00 PM",
      venue: "The Fine Arts Society, Mumbai",
      ticketPrice: "₹799 onwards"
    },
    {
      image: "https://assets-in.bmscdn.com/nmcms/weblisting/et00145294-2025-4-16-t-6-58-1.jpg",
      title: "Jo Bolta Hai Wahi Hota Hai",
      description: "'Jo Bolta Hai Wahi Hota' is a stand-up comedy show done by Harsh Gujral.",
      date: "April 25, 2025",
      time: "7:30 PM",
      venue: "Sophia Auditorium, Mumbai",
      ticketPrice: "₹799 onwards"
    },
    {
      image: "https://in.bmscdn.com/events/moviecard/ET00440526.jpg",
      title: "Pranit More live",
      description: "For Hire Entertainment presents Pranit More live",
      date: "April 26, 2025",
      time: "7:00 PM",
      venue: "Courtyard, R City Mall",
      ticketPrice: "₹799 onwards"
    },
    {
      image: "https://in.bmscdn.com/events/moviecard/ET00433332.jpg",
      title: "Maheep Singh live",
      description: "At the Talkies Kala Chasma presents Maheep Singh live",
      date: "May 24, 2025",
      time: "7:00 PM",
      venue: "Bal Gandharva Rang Mandir, Bandra",
      ticketPrice: "₹699 onwards"
    },
    {
      image: "https://in.bmscdn.com/events/moviecard/ET00434989.jpg",
      title: "Papa Yaar ft Zakir Khan",
      description: "Papa Yaar is a comedy show performed by Indian comedian Zakir Khan",
      date: "April 24, 2025",
      time: "7:00 PM",
      venue: "St Andrew's Auditorium, Mumbai",
      ticketPrice: "₹1,499 onwards"
    }
  ]

  // Auto-scroll effect for the concert carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (concertCarouselRef.current) {
        const scrollAmount = concertCarouselRef.current.offsetWidth * 0.55
        concertCarouselRef.current.scrollLeft += scrollAmount
        
        // Reset scroll position if we've reached the end
        if (concertCarouselRef.current.scrollLeft > (concertCarouselRef.current.scrollWidth - concertCarouselRef.current.offsetWidth - 100)) {
          concertCarouselRef.current.scrollLeft = 0
        }
      }
    }, 4000)
    
    return () => clearInterval(interval)
  }, [concerts.length])

  // Vinyl record rotation effect
  useEffect(() => {
    const vinyl = document.querySelector('.vinyl-disc');
    if (vinyl) {
      vinyl.classList.add('spin-animation');
      
      // Apply initial rotation
      setTimeout(() => {
        setActiveConcert(0);  
      }, 100);
      
      // Setup auto-rotation of concerts
      const interval = setInterval(() => {
        setActiveConcert(prev => (prev + 1) % concerts.length);
        
        // Reset and replay animation
        vinyl.classList.remove('spin-animation');
        void vinyl.offsetWidth; // Trigger reflow
        vinyl.classList.add('spin-animation');
      }, 6000);
      
      return () => clearInterval(interval);
    }
  }, [concerts.length]);

  const changeConcert = (index) => {
    // Add a small delay before changing to let the animation work
    const currentActive = document.querySelector('.concert-card.active');
    const vinyl = document.querySelector('.vinyl-disc');
    
    if (currentActive) {
      currentActive.classList.add('transitioning');
      
      // Also animate the vinyl disc
      if (vinyl) {
        vinyl.classList.remove('spin-animation');
        setTimeout(() => {
          vinyl.classList.add('spin-animation');
        }, 50);
      }
      
      setTimeout(() => {
        setActiveConcert(index);
        
        setTimeout(() => {
          const newActive = document.querySelector('.concert-card.active');
          if (newActive) {
            newActive.classList.remove('transitioning');
          }
        }, 50);
      }, 300);
    } else {
      setActiveConcert(index);
      
      // Also animate the vinyl disc on first change
      if (vinyl) {
        vinyl.classList.remove('spin-animation');
        setTimeout(() => {
          vinyl.classList.add('spin-animation');
        }, 50);
      }
    }
  };

  return (
    <>
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
            text="Recommendations" 
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
            {movies.slice(0, 4).map((movie, index) => (
              <div className="movie-card" key={index}>
                <div className="movie-image">
                  <TiltedCard
                    imageSrc={movie.image}
                    altText={movie.title}
                    captionText={movie.title}
                    containerHeight="360px"
                    containerWidth="100%"
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
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/movies" className="view-all-button">View All Movies</Link>
          </div>
        </div>

        <div className="event-category">
          <h2>Music & Concerts</h2>
          <div className="music-showcase">
            <div className="vinyl-player">
              <div className="turntable-base">
                <div className="vinyl-disc">
                  <div className="vinyl-label"></div>
                  <div className="vinyl-arm"></div>
                </div>
              </div>
            </div>
            <div className="concert-display">
              {concerts.map((concert, index) => (
                <div className={`concert-card ${index === activeConcert ? 'active' : ''}`} key={index} data-index={index}>
                  <div className="concert-image">
                    <img src={concert.image} alt={concert.title} />
                  </div>
                  <div className="card-logo">C6BANK</div>
                  <div className="card-chip"></div>
                  <div className="concert-details">
                    <h3>{concert.title}</h3>
                    <p className="concert-caption">{concert.caption}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="vinyl-controls">
              <button className="vinyl-control prev" onClick={() => {
                const newIndex = (activeConcert - 1 + concerts.length) % concerts.length;
                changeConcert(newIndex);
              }}>
                <span className="control-icon">⏮</span>
                <span className="control-text">Prev</span>
              </button>
              <button className="vinyl-control play">
                <span className="control-icon">▶</span>
                <span className="control-text">Play</span>
              </button>
              <button className="vinyl-control next" onClick={() => {
                const newIndex = (activeConcert + 1) % concerts.length;
                changeConcert(newIndex);
              }}>
                <span className="control-icon">⏭</span>
                <span className="control-text">Next</span>
              </button>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/concerts" className="view-all-button">View All Concerts</Link>
          </div>
        </div>

        <div className="event-category">
          <h2>Comedy</h2>
          <div className="comedy-showcase">
            {comedy.map((show, index) => (
              <Link to="/comedy" key={index} className="comedy-card-link">
                <div className="comedy-card">
                  <div className="comedy-image">
                    <img src={show.image} alt={show.title} />
                    <div className="comic-splash">{["POW!", "HAHA!", "LOL!", "BOOM!", "BANG!", "WOW!"][index % 6]}</div>
                    <div className="comedy-overlay">
                      <div className="comic-panel">
                        <div className="speech-bubble">
                          <h3>{show.title}</h3>
                          <p className="comedy-description">{show.description}</p>
                        </div>
                        <div className="comedy-info-rows">
                          <div className="comedy-info-row">
                            <span className="comedy-info-icon">📅</span>
                            <span>{show.date}</span>
                          </div>
                          <div className="comedy-info-row">
                            <span className="comedy-info-icon">⏰</span>
                            <span>{show.time}</span>
                          </div>
                          <div className="comedy-info-row">
                            <span className="comedy-info-icon">🏢</span>
                            <span>{show.venue}</span>
                          </div>
                          <div className="comedy-info-row">
                            <span className="comedy-info-icon">💰</span>
                            <span>{show.ticketPrice}</span>
                          </div>
                        </div>
                        <button className="comedy-book-btn">
                          <span className="btn-text">BOOK TICKETS</span>
                          <span className="btn-icon">🎭</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="comedy-badge">{show.date}</div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/comedy" className="view-all-button">View All Comedy</Link>
          </div>
        </div>
      </div>
    </>
  )
}

function App() {
  const location = useLocation();
  const showNavbar = !location.pathname.includes('/booking');
  
  return (
    <>
      {showNavbar && (
      <div className="navbar-container">
        <nav className="navbar">
          <div className="navbar-logo"></div>
          <ul className="navbar-links">
            <li><Link to="/" className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link></li>
            <li><Link to="/movies" className={`navbar-link ${location.pathname === '/movies' ? 'active' : ''}`}>Movies</Link></li>
            <li><Link to="/concerts" className={`navbar-link ${location.pathname === '/concerts' ? 'active' : ''}`}>Concerts</Link></li>
            <li><Link to="/comedy" className={`navbar-link ${location.pathname.includes('/comedy') ? 'active' : ''}`}>Comedy</Link></li>
            <li><Link to="/contact" className={`navbar-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link></li>
          </ul>
          <div className="navbar-actions">
            <button className="signup-button">Get Template</button>
          </div>
        </nav>
      </div>
      )}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/concerts" element={<Concerts />} />
        <Route path="/comedy" element={<Comedy />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/concert-booking" element={<ConcertBookingPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App
