import { useState, useEffect, useRef } from 'react';
import DecryptedText from '../components/DecryptedText';
import '../styles/Concerts.css';

export default function Concerts() {
  const [activeConcert, setActiveConcert] = useState(0);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(60);
  const [activeCategory, setActiveCategory] = useState('all');
  const waveformRef = useRef(null);

  // Data for concert categories
  const featuredConcerts = [
    {
      id: 1,
      title: "Summer Festival 2024",
      artist: "Multiple Artists",
      date: "August 15-17, 2024",
      location: "Central Park Amphitheater",
      image: "https://www.impericon.com/cdn/shop/articles/20241209_g_r_2.jpg?v=1742482171",
      description: "Experience three days of nonstop music with over 30 artists across 4 stages.",
      price: "$149 - $499",
      category: "festival",
      tags: ["rock", "indie", "electronic"],
      lineup: ["The Rolling Stones", "Coldplay", "Imagine Dragons", "Twenty One Pilots"]
    },
    {
      id: 2,
      title: "Rock Legends Tour",
      artist: "Classic Rock Revival",
      date: "July 28, 2024",
      location: "Stadium Arena",
      image: "https://assets-in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-vilen-india-tour-0-2025-4-8-t-12-59-57.jpg",
      description: "The ultimate rock experience with legendary bands performing their greatest hits.",
      price: "$89 - $299",
      category: "tour",
      tags: ["rock", "classic rock"],
      lineup: ["Aerosmith", "Guns N' Roses", "Def Leppard"]
    },
    {
      id: 3,
      title: "Electronic Music Fest",
      artist: "EDM Collective",
      date: "September 8-9, 2024",
      location: "Riverside Festival Grounds",
      image: "https://assets-in.bmscdn.com/discovery-catalog/events/et00438542-jxttzzdppy-landscape.jpg",
      description: "Dance the night away with world-class DJs and spectacular light shows.",
      price: "$79 - $189",
      category: "festival",
      tags: ["electronic", "edm", "dance"],
      lineup: ["Martin Garrix", "David Guetta", "Tiesto", "Alesso"]
    },
    {
      id: 4,
      title: "Jazz Night Live",
      artist: "Jazz Masters Ensemble",
      date: "October 15, 2024",
      location: "Blue Note Theater",
      image: "https://assets-in.bmscdn.com/discovery-catalog/events/et00434549-xfeqknjtxt-landscape.jpg",
      description: "An intimate evening of smooth jazz from world-renowned musicians.",
      price: "$59 - $129",
      category: "jazz",
      tags: ["jazz", "smooth jazz", "instrumental"],
      lineup: ["Wynton Marsalis", "Chick Corea Trio", "Diana Krall"]
    }
  ];

  const upcomingConcerts = [
    {
      id: 5,
      title: "Symphony Under the Stars",
      artist: "Metropolitan Symphony Orchestra",
      date: "August 30, 2024",
      location: "Lakeside Amphitheater",
      image: "https://www.denverpost.com/wp-content/uploads/2016/07/syme-orchestra1.jpg",
      description: "A magical evening of classical music performed under the open night sky.",
      price: "$45 - $150",
      category: "classical",
      tags: ["symphony", "classical", "orchestra"],
      lineup: ["Conductor: James Roberts", "Featuring soloists from the Metropolitan Opera"]
    },
    {
      id: 6,
      title: "Global Beats Festival",
      artist: "International Music Collective",
      date: "September 21-22, 2024",
      location: "Cultural Center Plaza",
      image: "https://media.istockphoto.com/id/1189205501/photo/cheering-crowd-at-a-concert.jpg?s=612x612&w=0&k=20&c=WdTkO9iNI25P5y_kRywmQCus8LnIMbgr2SygAeoHTRY=",
      description: "Celebrating music from around the world with performances from 6 continents.",
      price: "$65 - $155",
      category: "world",
      tags: ["world music", "cultural", "international"],
      lineup: ["Youssou N'Dour", "Gipsy Kings", "Angélique Kidjo", "Ravi Shankar Ensemble"]
    },
    {
      id: 7,
      title: "Indie Underground",
      artist: "Various Artists",
      date: "October 5, 2024",
      location: "The Vault Music Hall",
      image: "https://blog.ticketmaster.com/wp-content/uploads/Rolling-Loud-Landscape-Header.jpg",
      description: "Discover the next big thing with emerging indie artists in an intimate venue.",
      price: "$35 - $75",
      category: "indie",
      tags: ["indie", "alternative", "underground"],
      lineup: ["The Neighborhood Watch", "Glass Echo", "Midnight Reverie", "Lunar Phase"]
    },
    {
      id: 8,
      title: "Country Roads Festival",
      artist: "Country Legends & Rising Stars",
      date: "August 25, 2024",
      location: "Hillside Ranch",
      image: "https://www.visitdetroit.com/sites/default/files/2021-10/Concert%20Crowd%20%28c%29%20Faster%20Horses%20%28Sean%20Winkiel%29_0.jpg",
      description: "A day of country music, food, and fun under the open sky.",
      price: "$55 - $175",
      category: "country",
      tags: ["country", "folk", "americana"],
      lineup: ["Luke Combs", "Miranda Lambert", "Zac Brown Band", "Chris Stapleton"]
    }
  ];

  const popularVenues = [
    {
      name: "Madison Square Garden",
      location: "New York, NY",
      capacity: "20,000",
      image: "https://msg.com/wp-content/uploads/2019/01/2016_05_18_View-of-Stage-from-Upper-1024x768.jpg",
      upcoming: 15
    },
    {
      name: "Red Rocks Amphitheatre",
      location: "Morrison, CO",
      capacity: "9,525",
      image: "https://www.uncovercolorado.com/wp-content/uploads/2020/04/red-rocks-amphitheatre-morrison-co-1600x800-1.jpg",
      upcoming: 23
    },
    {
      name: "Royal Albert Hall",
      location: "London, UK",
      capacity: "5,272",
      image: "https://cdn.londonandpartners.com/-/media/images/london/visit/whats-on/special-events/bbc-proms/royal-albert-hall-auditorium-640x360.jpg",
      upcoming: 18
    },
    {
      name: "Sydney Opera House",
      location: "Sydney, Australia",
      capacity: "5,738",
      image: "https://cdn.britannica.com/96/115096-050-5AFDAF5D/Pritzker-Architecture-Prize-Interior-Sydney-Opera-House.jpg",
      upcoming: 12
    }
  ];

  // Animation for vinyl record
  useEffect(() => {
    const vinyl = document.querySelector('.featured-vinyl-disc');
    if (vinyl) {
      vinyl.classList.add('spin-animation');
      
      // Setup auto-rotation of concerts
      const interval = setInterval(() => {
        setActiveConcert(prev => (prev + 1) % featuredConcerts.length);
        
        // Reset and replay animation
        vinyl.classList.remove('spin-animation');
        void vinyl.offsetWidth; // Trigger reflow
        vinyl.classList.add('spin-animation');
      }, 8000);
      
      return () => clearInterval(interval);
    }
  }, [featuredConcerts.length]);

  // Audio control functions
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const changeConcert = (index) => {
    const vinyl = document.querySelector('.featured-vinyl-disc');
    if (vinyl) {
      setActiveConcert(index);
      
      // Reset and replay animation
      vinyl.classList.remove('spin-animation');
      void vinyl.offsetWidth; // Trigger reflow
      vinyl.classList.add('spin-animation');
    }
  };

  // Audio waveform animation
  useEffect(() => {
    if (waveformRef.current) {
      const bars = waveformRef.current.querySelectorAll('.waveform-bar');
      
      const animateBars = () => {
        bars.forEach(bar => {
          const height = Math.floor(Math.random() * 60) + 20;
          bar.style.height = `${height}px`;
        });
      };
      
      const waveformInterval = setInterval(animateBars, 100);
      return () => clearInterval(waveformInterval);
    }
  }, [isPlaying]);

  return (
    <div className="concerts-page">
      {/* Hero section */}
      <div className="concerts-hero">
        <div className="concerts-hero-content">
          <h1>
            <DecryptedText 
              text="Live Music Experiences" 
              animateOn="view"
              sequential={true}
              speed={80}
              maxIterations={20}
              className="decrypted"
              encryptedClassName="encrypted"
              parentClassName="decryption-animation"
            />
          </h1>
          <p className="concerts-subtitle">Discover and book tickets to the hottest concerts and music festivals</p>
          
          <div className="audio-waveform" ref={waveformRef}>
            {Array(40).fill().map((_, i) => (
              <div 
                key={i} 
                className="waveform-bar" 
                style={{ 
                  height: `${Math.floor(Math.random() * 60) + 20}px`,
                  animationDelay: `${i * 0.05}s`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Featured concerts */}
      <section className="featured-concerts">
        <h2 className="section-title">Featured Events</h2>
        
        <div className="featured-showcase">
          <div className="featured-vinyl-player">
            <div className="featured-turntable-base">
              <div className="featured-vinyl-disc">
                <div className="featured-vinyl-label"></div>
                <div className="featured-vinyl-arm"></div>
              </div>
            </div>
            <div className="audio-controls">
              <button 
                className={`audio-control-btn ${isPlaying ? 'pause' : 'play'}`}
                onClick={togglePlay}
              >
                <span className="control-icon">{isPlaying ? '⏸' : '▶️'}</span>
                <span className="control-text">{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
              <div className="volume-control">
                <span className="volume-icon">🔈</span>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={volume} 
                  onChange={handleVolumeChange}
                  className="volume-slider"
                />
              </div>
              <audio ref={audioRef} loop>
                <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
          
          <div className="featured-concert-display">
            {featuredConcerts.map((concert, index) => (
              <div 
                className={`featured-concert-card ${index === activeConcert ? 'active' : ''}`} 
                key={concert.id}
              >
                <div className="featured-concert-image">
                  <img src={concert.image} alt={concert.title} />
                </div>
                <div className="featured-concert-details">
                  <div className="category-tag">{concert.category}</div>
                  <h3>{concert.title}</h3>
                  <p className="featured-artist">{concert.artist}</p>
                  <div className="concert-info-grid">
                    <div className="concert-info-item">
                      <span className="info-icon">📅</span>
                      <span>{concert.date}</span>
                    </div>
                    <div className="concert-info-item">
                      <span className="info-icon">📍</span>
                      <span>{concert.location}</span>
                    </div>
                    <div className="concert-info-item">
                      <span className="info-icon">💰</span>
                      <span>{concert.price}</span>
                    </div>
                  </div>
                  <p className="concert-description">{concert.description}</p>
                  <div className="lineup-container">
                    <h4>Lineup:</h4>
                    <div className="lineup-list">
                      {concert.lineup.map((artist, i) => (
                        <span key={i} className="lineup-artist">{artist}</span>
                      ))}
                    </div>
                  </div>
                  <button className="book-tickets-btn">
                    Book Tickets
                    <span className="btn-icon">🎵</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Category filter */}
      <div className="concert-category-filter">
        <button 
          className={activeCategory === 'all' ? 'active' : ''} 
          onClick={() => setActiveCategory('all')}
        >
          All Events
        </button>
        <button 
          className={activeCategory === 'festival' ? 'active' : ''} 
          onClick={() => setActiveCategory('festival')}
        >
          Festivals
        </button>
        <button 
          className={activeCategory === 'rock' ? 'active' : ''} 
          onClick={() => setActiveCategory('rock')}
        >
          Rock
        </button>
        <button 
          className={activeCategory === 'jazz' ? 'active' : ''} 
          onClick={() => setActiveCategory('jazz')}
        >
          Jazz
        </button>
        <button 
          className={activeCategory === 'electronic' ? 'active' : ''} 
          onClick={() => setActiveCategory('electronic')}
        >
          Electronic
        </button>
        <button 
          className={activeCategory === 'classical' ? 'active' : ''} 
          onClick={() => setActiveCategory('classical')}
        >
          Classical
        </button>
      </div>
      
      {/* Upcoming concerts */}
      <section className="upcoming-concerts">
        <h2 className="section-title">Upcoming Concerts</h2>
        
        <div className="concert-grid">
          {upcomingConcerts
            .filter(concert => activeCategory === 'all' || 
                   concert.category === activeCategory || 
                   concert.tags.includes(activeCategory))
            .map(concert => (
              <div className="concert-grid-card" key={concert.id}>
                <div className="concert-grid-image">
                  <img src={concert.image} alt={concert.title} />
                  <div className="concert-grid-overlay">
                    <h3>{concert.title}</h3>
                    <p className="grid-artist">{concert.artist}</p>
                    <div className="grid-info">
                      <span className="grid-date">{concert.date}</span>
                      <span className="grid-location">{concert.location}</span>
                    </div>
                    <button className="grid-book-btn">Book Now</button>
                  </div>
                </div>
                <div className="concert-grid-tags">
                  {concert.tags.map((tag, index) => (
                    <span key={index} className="concert-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>
      
      {/* Popular venues */}
      <section className="popular-venues">
        <h2 className="section-title">Popular Venues</h2>
        
        <div className="venues-grid">
          {popularVenues.map((venue, index) => (
            <div className="venue-card" key={index}>
              <div className="venue-image">
                <img src={venue.image} alt={venue.name} />
              </div>
              <div className="venue-details">
                <h3>{venue.name}</h3>
                <p className="venue-location">{venue.location}</p>
                <div className="venue-stats">
                  <div className="venue-stat">
                    <span className="stat-label">Capacity</span>
                    <span className="stat-value">{venue.capacity}</span>
                  </div>
                  <div className="venue-stat">
                    <span className="stat-label">Upcoming Events</span>
                    <span className="stat-value">{venue.upcoming}</span>
                  </div>
                </div>
                <button className="venue-btn">View Events</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="concerts-newsletter">
        <div className="newsletter-content">
          <h2>Never Miss a Beat</h2>
          <p>Subscribe to our newsletter and be the first to know about upcoming concerts, special promotions, and exclusive pre-sales.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <button className="newsletter-btn">Subscribe</button>
          </div>
        </div>
        <div className="newsletter-graphics">
          <div className="music-note note-1">♪</div>
          <div className="music-note note-2">♫</div>
          <div className="music-note note-3">♩</div>
          <div className="music-note note-4">♬</div>
        </div>
      </section>
    </div>
  );
} 