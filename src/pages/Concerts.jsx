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
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showSpotifyPlayer, setShowSpotifyPlayer] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({
    name: "Cosmic Dreams",
    artist: "СЛЕЗЫ",
    cover: "https://assets-in.bmscdn.com/discovery-catalog/events/et00438542-jxttzzdppy-landscape.jpg"
  });
  
  // Additional player states
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const progressBarRef = useRef(null);
  const animationRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(60);
  const [trackIndex, setTrackIndex] = useState(0);
  
  // Sample tracks for player
  const tracks = [
    {
      title: "Cosmic Dreams",
      artist: "СЛЕЗЫ",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      cover: "https://assets-in.bmscdn.com/discovery-catalog/events/et00438542-jxttzzdppy-landscape.jpg"
    },
    {
      title: "Neon Nights",
      artist: "Electronic Void",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      cover: "https://assets-in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-vilen-india-tour-0-2025-4-8-t-12-59-57.jpg"
    },
    {
      title: "Stellar Journey",
      artist: "Astral Collective",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      cover: "https://blog.ticketmaster.com/wp-content/uploads/Rolling-Loud-Landscape-Header.jpg"
    }
  ];

  // Data for concert categories
  const featuredConcerts = [
    {
      id: 1,
      title: "СЛЕЗЫ FESTIVAL",
      artist: "Multiple Artists",
      date: "August 15-17, 2024",
      location: "Cosmic Arena",
      image: "https://www.impericon.com/cdn/shop/articles/20241209_g_r_2.jpg?v=1742482171",
      description: "Experience three days of nonstop music with over 30 artists across 4 stages.",
      price: "$149 - $499",
      category: "festival",
      tags: ["rock", "indie", "electronic"],
      lineup: ["The Rolling Stones", "Coldplay", "Imagine Dragons", "Twenty One Pilots"],
      spotifyPlaylist: "37i9dQZF1DX5Vy6DFOcx00"
    },
    {
      id: 2,
      title: "ROCK LEGENDS",
      artist: "Classic Rock Revival",
      date: "July 28, 2024",
      location: "Stadium Arena",
      image: "https://assets-in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-vilen-india-tour-0-2025-4-8-t-12-59-57.jpg",
      description: "The ultimate rock experience with legendary bands performing their greatest hits.",
      price: "$89 - $299",
      category: "tour",
      tags: ["rock", "classic rock"],
      lineup: ["Aerosmith", "Guns N' Roses", "Def Leppard"],
      spotifyPlaylist: "37i9dQZF1DWXRqgorJj26U"
    },
    {
      id: 3,
      title: "ЭЛЕКТРО MUSIC",
      artist: "EDM Collective",
      date: "September 8-9, 2024",
      location: "Riverside Festival Grounds",
      image: "https://assets-in.bmscdn.com/discovery-catalog/events/et00438542-jxttzzdppy-landscape.jpg",
      description: "Dance the night away with world-class DJs and spectacular light shows.",
      price: "$79 - $189",
      category: "festival",
      tags: ["electronic", "edm", "dance"],
      lineup: ["Martin Garrix", "David Guetta", "Tiesto", "Alesso"],
      spotifyPlaylist: "37i9dQZF1DX6J5NfMJS675"
    },
    {
      id: 4,
      title: "JAZZ НОЧЬ",
      artist: "Jazz Masters Ensemble",
      date: "October 15, 2024",
      location: "Blue Note Theater",
      image: "https://assets-in.bmscdn.com/discovery-catalog/events/et00434549-xfeqknjtxt-landscape.jpg",
      description: "An intimate evening of smooth jazz from world-renowned musicians.",
      price: "$59 - $129",
      category: "jazz",
      tags: ["jazz", "smooth jazz", "instrumental"],
      lineup: ["Wynton Marsalis", "Chick Corea Trio", "Diana Krall"],
      spotifyPlaylist: "37i9dQZF1DXbITWG1ZJKYt"
    }
  ];

  const upcomingConcerts = [
    {
      id: 5,
      title: "СИМФОНИЯ",
      artist: "Metropolitan Symphony Orchestra",
      date: "August 30, 2024",
      location: "Lakeside Amphitheater",
      image: "https://www.denverpost.com/wp-content/uploads/2016/07/syme-orchestra1.jpg",
      description: "A magical evening of classical music performed under the open night sky.",
      price: "$45 - $150",
      category: "classical",
      tags: ["symphony", "classical", "orchestra"],
      lineup: ["Conductor: James Roberts", "Featuring soloists from the Metropolitan Opera"],
      spotifyPlaylist: "37i9dQZF1DWWEJlAGA9gs0"
    },
    {
      id: 6,
      title: "ГЛОБАЛЬНЫЕ BEATS",
      artist: "International Music Collective",
      date: "September 21-22, 2024",
      location: "Cultural Center Plaza",
      image: "https://media.istockphoto.com/id/1189205501/photo/cheering-crowd-at-a-concert.jpg?s=612x612&w=0&k=20&c=WdTkO9iNI25P5y_kRywmQCus8LnIMbgr2SygAeoHTRY=",
      description: "Celebrating music from around the world with performances from 6 continents.",
      price: "$65 - $155",
      category: "world",
      tags: ["world music", "cultural", "international"],
      lineup: ["Youssou N'Dour", "Gipsy Kings", "Angélique Kidjo", "Ravi Shankar Ensemble"],
      spotifyPlaylist: "37i9dQZF1DWYlCz3xRKQbk"
    },
    {
      id: 7,
      title: "ИНДИ UNDERGROUND",
      artist: "Various Artists",
      date: "October 5, 2024",
      location: "The Vault Music Hall",
      image: "https://blog.ticketmaster.com/wp-content/uploads/Rolling-Loud-Landscape-Header.jpg",
      description: "Discover the next big thing with emerging indie artists in an intimate venue.",
      price: "$35 - $75",
      category: "indie",
      tags: ["indie", "alternative", "underground"],
      lineup: ["The Neighborhood Watch", "Glass Echo", "Midnight Reverie", "Lunar Phase"],
      spotifyPlaylist: "37i9dQZF1DX2Nc3B70tvx0"
    },
    {
      id: 8,
      title: "КАНТРИ ROADS",
      artist: "Country Legends & Rising Stars",
      date: "August 25, 2024",
      location: "Hillside Ranch",
      image: "https://www.visitdetroit.com/sites/default/files/2021-10/Concert%20Crowd%20%28c%29%20Faster%20Horses%20%28Sean%20Winkiel%29_0.jpg",
      description: "A day of country music, food, and fun under the open sky.",
      price: "$55 - $175",
      category: "country",
      tags: ["country", "folk", "americana"],
      lineup: ["Luke Combs", "Miranda Lambert", "Zac Brown Band", "Chris Stapleton"],
      spotifyPlaylist: "37i9dQZF1DWZBCPUIUs2iR"
    }
  ];

  const popularVenues = [
    {
      name: "COSMIC ARENA",
      location: "New York, NY",
      capacity: "20,000",
      image: "https://msg.com/wp-content/uploads/2019/01/2016_05_18_View-of-Stage-from-Upper-1024x768.jpg",
      upcoming: 15
    },
    {
      name: "RED ROCKS",
      location: "Morrison, CO",
      capacity: "9,525",
      image: "https://www.uncovercolorado.com/wp-content/uploads/2020/04/red-rocks-amphitheatre-morrison-co-1600x800-1.jpg",
      upcoming: 23
    },
    {
      name: "ROYAL HALL",
      location: "London, UK",
      capacity: "5,272",
      image: "https://cdn.londonandpartners.com/-/media/images/london/visit/whats-on/special-events/bbc-proms/royal-albert-hall-auditorium-640x360.jpg",
      upcoming: 18
    },
    {
      name: "OPERA HOUSE",
      location: "Sydney, Australia",
      capacity: "5,738",
      image: "https://cdn.britannica.com/96/115096-050-5AFDAF5D/Pritzker-Architecture-Prize-Interior-Sydney-Opera-House.jpg",
      upcoming: 12
    }
  ];

  // Animation for vinyl record
  useEffect(() => {
    const vinyl = document.querySelector('.vinyl-record');
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

  // Audio player functions
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        cancelAnimationFrame(animationRef.current);
      } else {
        audioRef.current.play();
        animationRef.current = requestAnimationFrame(updateProgress);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const updateProgress = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      setCurrentTime(currentTime);
      animationRef.current = requestAnimationFrame(updateProgress);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (!isMuted) {
        setPrevVolume(volume);
        setVolume(0);
        audioRef.current.volume = 0;
      } else {
        setVolume(prevVolume);
        audioRef.current.volume = prevVolume / 100;
      }
      setIsMuted(!isMuted);
    }
  };

  const handleProgressChange = (e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const skipTrack = (direction) => {
    let newIndex;
    if (direction === 'forward') {
      newIndex = (trackIndex + 1) % tracks.length;
    } else {
      newIndex = trackIndex - 1 < 0 ? tracks.length - 1 : trackIndex - 1;
    }
    setTrackIndex(newIndex);
    loadTrack(newIndex);
  };

  const loadTrack = (index) => {
    const track = tracks[index];
    setCurrentTrack({
      name: track.title,
      artist: track.artist,
      cover: track.cover
    });

    if (audioRef.current) {
      audioRef.current.src = track.src;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  };

  // Handle audio metadata loading
  useEffect(() => {
    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        }
      };
    }
  }, []);

  // Format time as mm:ss
  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle track ending
  useEffect(() => {
    const handleTrackEnd = () => {
      skipTrack('forward');
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleTrackEnd);
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('ended', handleTrackEnd);
        }
      };
    }
  }, [trackIndex]);

  const changeConcert = (index) => {
    if (index !== activeConcert) {
      setActiveConcert(index);
      setShowSpotifyPlayer(false);
    }
  };

  // Toggle Spotify player
  const toggleSpotifyPlayer = () => {
    setShowSpotifyPlayer(!showSpotifyPlayer);
  };

  // Audio waveform animation
  useEffect(() => {
    if (waveformRef.current) {
      const bars = waveformRef.current.querySelectorAll('.waveform-bar-cosmic');
      
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
    <div className="cosmic-concerts-page">
      {/* Decorative elements */}
      <div className="cosmic-background">
        <div className="cosmic-orb"></div>
        <div className="cosmic-stars">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="star" style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 7}s`
            }}></div>
          ))}
        </div>
        <div className="floating-cassette cassette-1">
          <div className="cassette-inner">
            <div className="cassette-wheels">
              <div className="wheel"></div>
              <div className="wheel"></div>
            </div>
          </div>
        </div>
        <div className="floating-cassette cassette-2">
          <div className="cassette-inner">
            <div className="cassette-wheels">
              <div className="wheel"></div>
              <div className="wheel"></div>
            </div>
          </div>
        </div>
        <div className="floating-vinyl">
          <div className="vinyl-inner"></div>
        </div>
        <div className="laser-beam beam-1"></div>
        <div className="laser-beam beam-2"></div>
      </div>

      {/* Enhanced music player */}
      <div className="music-player">
        <div className="player-content">
          <div className="player-controls">
            <div className="track-info">
              <div className="track-name">{currentTrack.name}</div>
              <div className="track-artist">{currentTrack.artist}</div>
            </div>
            
            <div className="playback-controls">
              <div className="control-buttons">
                <button className="control-btn" onClick={() => skipTrack('back')}>
                  <svg viewBox="0 0 24 24"><path fill="currentColor" d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
                </button>
                <button className="control-btn play-btn" onClick={togglePlay}>
                  {isPlaying ? 
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> : 
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>
                  }
                </button>
                <button className="control-btn" onClick={() => skipTrack('forward')}>
                  <svg viewBox="0 0 24 24"><path fill="currentColor" d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
                </button>
              </div>
              
              <div className="progress-container">
                <span className="time-display">{formatTime(currentTime)}</span>
                <div className="progress-bar-container">
                  <input 
                    type="range" 
                    min="0" 
                    max={duration || 100}
                    value={currentTime} 
                    onChange={handleProgressChange}
                    ref={progressBarRef}
                    className="progress-bar"
                  />
                  <div 
                    className="progress-filled" 
                    style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                  ></div>
                </div>
                <span className="time-display">{formatTime(duration)}</span>
              </div>
            </div>
          </div>
          
          <audio ref={audioRef} src={tracks[trackIndex].src} />
        </div>
      </div>

      {/* Spotify player overlay */}
      {showSpotifyPlayer && (
        <div className="spotify-player-overlay">
          <div className="spotify-player">
            <div className="spotify-player-header">
              <h3>Listen to {featuredConcerts[activeConcert].title}</h3>
              <button className="close-button" onClick={toggleSpotifyPlayer}>×</button>
            </div>
            <div className="spotify-player-content">
              <iframe 
                src={`https://open.spotify.com/embed/playlist/${featuredConcerts[activeConcert].spotifyPlaylist}?utm_source=generator&theme=0`} 
                width="100%" 
                height="380" 
                frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Hero section */}
      <div className="cosmic-hero">
        <div className="cosmic-title-container">
          <h1 className="cosmic-title">MUSyc</h1>
          <p className="cosmic-subtitle">CONCERT EXPERIENCE • 2025</p>
          
          <div className="vinyl-display">
            <div className="vinyl-record">
              <div className="vinyl-label"></div>
            </div>
            <div className="vinyl-arm"></div>
          </div>
        </div>
        
        <div className="audio-waveform-cosmic" ref={waveformRef}>
          {Array(40).fill().map((_, i) => (
            <div 
              key={i} 
              className="waveform-bar-cosmic" 
              style={{ 
                height: `${Math.floor(Math.random() * 60) + 20}px`,
                animationDelay: `${i * 0.02}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Featured concerts */}
      <section className="cosmic-featured-section">
        <h2 className="cosmic-section-title">
          <span className="glow-text">FEATURED</span> 
          EVENTS
          <div className="equalizer-animation">
            <div className="equalizer-bar"></div>
            <div className="equalizer-bar"></div>
            <div className="equalizer-bar"></div>
            <div className="equalizer-bar"></div>
          </div>
        </h2>
        
        <div className="cosmic-featured-showcase">
          <div className="cosmic-featured-grid">
            {featuredConcerts.map((concert, index) => (
              <div 
                className={`cosmic-concert-card ${index === activeConcert ? 'active' : ''}`} 
                key={concert.id}
                onClick={() => changeConcert(index)}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="cosmic-concert-image">
                  <img src={concert.image} alt={concert.title} />
                  <div className="cosmic-concert-overlay"></div>
                </div>
                <div className="cosmic-glowing-border"></div>
                <div className="cosmic-concert-content">
                  <div className="cosmic-date-badge">{concert.date}</div>
                  <h3 className="cosmic-concert-title">{concert.title}</h3>
                  <p className="cosmic-concert-artist">{concert.artist}</p>
                  
                  <div className={`cosmic-concert-details ${index === hoveredCard || index === activeConcert ? 'visible' : ''}`}>
                    <div className="cosmic-detail-row">
                      <span className="cosmic-detail-icon">⦿</span>
                      <span>{concert.location}</span>
                    </div>
                    <div className="cosmic-detail-row">
                      <span className="cosmic-detail-icon">⦿</span>
                      <span>{concert.price}</span>
                    </div>
                    <div className="cosmic-tags">
                      {concert.tags.map((tag, i) => (
                        <span key={i} className="cosmic-tag">{tag}</span>
                      ))}
                    </div>
                    <div className="cosmic-buttons-row">
                      <button className="cosmic-button reserve-btn">RESERVE</button>
                      <button 
                        className="cosmic-button spotify-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveConcert(index);
                          setShowSpotifyPlayer(true);
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Category filter */}
      <div className="cosmic-category-filter">
        <button 
          className={activeCategory === 'all' ? 'active' : ''} 
          onClick={() => setActiveCategory('all')}
        >
          ALL
        </button>
        <button 
          className={activeCategory === 'festival' ? 'active' : ''} 
          onClick={() => setActiveCategory('festival')}
        >
          FESTIVALS
        </button>
        <button 
          className={activeCategory === 'rock' ? 'active' : ''} 
          onClick={() => setActiveCategory('rock')}
        >
          ROCK
        </button>
        <button 
          className={activeCategory === 'jazz' ? 'active' : ''} 
          onClick={() => setActiveCategory('jazz')}
        >
          JAZZ
        </button>
        <button 
          className={activeCategory === 'electronic' ? 'active' : ''} 
          onClick={() => setActiveCategory('electronic')}
        >
          ELECTRONIC
        </button>
        <button 
          className={activeCategory === 'classical' ? 'active' : ''} 
          onClick={() => setActiveCategory('classical')}
        >
          CLASSICAL
        </button>
      </div>
      
      {/* Upcoming concerts */}
      <section className="cosmic-upcoming-section">
        <h2 className="cosmic-section-title">
          <span className="glow-text">UPCOMING</span> 
          EVENTS
          <div className="equalizer-animation">
            <div className="equalizer-bar"></div>
            <div className="equalizer-bar"></div>
            <div className="equalizer-bar"></div>
            <div className="equalizer-bar"></div>
          </div>
        </h2>
        
        <div className="cosmic-grid">
          {upcomingConcerts
            .filter(concert => activeCategory === 'all' || 
                   concert.category === activeCategory || 
                   concert.tags.includes(activeCategory))
            .map(concert => (
              <div className="cosmic-upcoming-card" key={concert.id}>
                <div className="cosmic-upcoming-image">
                  <img src={concert.image} alt={concert.title} />
                  <div className="cosmic-upcoming-overlay">
                    <h3 className="cosmic-upcoming-title">{concert.title}</h3>
                    <p className="cosmic-upcoming-artist">{concert.artist}</p>
                    <div className="cosmic-upcoming-info">
                      <span className="cosmic-upcoming-date">{concert.date}</span>
                      <span className="cosmic-upcoming-location">{concert.location}</span>
                    </div>
                    <div className="cosmic-buttons-row">
                      <button className="cosmic-button reserve-btn">RESERVE</button>
                      <button 
                        className="cosmic-button spotify-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentTrack({
                            name: concert.title,
                            artist: concert.artist,
                            cover: concert.image
                          });
                          setActiveConcert(featuredConcerts.findIndex(fc => fc.category === concert.category) || 0);
                          setShowSpotifyPlayer(true);
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="cosmic-upcoming-tags">
                  {concert.tags.map((tag, index) => (
                    <span key={index} className="cosmic-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>
      
      {/* Venues section */}
      <section className="cosmic-venues-section">
        <h2 className="cosmic-section-title">
          <span className="glow-text">PREMIER</span> 
          VENUES
          <div className="equalizer-animation">
            <div className="equalizer-bar"></div>
            <div className="equalizer-bar"></div>
            <div className="equalizer-bar"></div>
            <div className="equalizer-bar"></div>
          </div>
        </h2>
        
        <div className="cosmic-venues-grid">
          {popularVenues.map((venue, index) => (
            <div className="cosmic-venue-card" key={index}>
              <div className="cosmic-venue-image">
                <img src={venue.image} alt={venue.name} />
                <div className="cosmic-venue-overlay"></div>
              </div>
              <div className="cosmic-venue-content">
                <h3 className="cosmic-venue-name">{venue.name}</h3>
                <p className="cosmic-venue-location">{venue.location}</p>
                <div className="cosmic-venue-stats">
                  <div className="cosmic-venue-stat">
                    <span className="cosmic-stat-value">{venue.capacity}</span>
                    <span className="cosmic-stat-label">CAPACITY</span>
                  </div>
                  <div className="cosmic-venue-stat">
                    <span className="cosmic-stat-value">{venue.upcoming}</span>
                    <span className="cosmic-stat-label">UPCOMING</span>
                  </div>
                </div>
                <button className="cosmic-button">VIEW EVENTS</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="cosmic-newsletter">
        <div className="cosmic-newsletter-content">
          <h2 className="cosmic-newsletter-title">JOIN THE <span className="glow-text">EXPERIENCE</span></h2>
          <p className="cosmic-newsletter-text">Subscribe to our newsletter and be the first to know about upcoming concerts, exclusive pre-sales, and special events.</p>
          <div className="cosmic-newsletter-form">
            <input type="email" placeholder="YOUR EMAIL ADDRESS" className="cosmic-input" />
            <button className="cosmic-button">SUBSCRIBE</button>
          </div>
        </div>
        <div className="cosmic-newsletter-decoration">
          <div className="cosmic-shape shape-1"></div>
          <div className="cosmic-shape shape-2"></div>
          <div className="cosmic-shape shape-3"></div>
        </div>
      </section>

      {/* Footer credit */}
      <div className="cosmic-footer">
        <p>© 2024 СЛЕЗЫ EVENTS • ALL RIGHTS RESERVED</p>
      </div>
    </div>
  );
} 