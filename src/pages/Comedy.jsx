import { useState, useEffect, useRef } from 'react';
import DecryptedText from '../components/DecryptedText';
import '../styles/Comedy.css';

export default function Comedy() {
  const [activeComedian, setActiveComedian] = useState(0);
  const [tickerItems, setTickerItems] = useState([]);
  const [activeSpeechBubble, setActiveSpeechBubble] = useState(0);
  const [filterTag, setFilterTag] = useState('all');
  const speechBubbleTimerRef = useRef(null);

  // Featured comedians data
  const featuredComedians = [
    {
      id: 1,
      name: "Dave Chappelle",
      specialty: "Observational Comedy",
      date: "September 15, 2024",
      location: "Comedy Central Theater",
      image: "https://media.npr.org/assets/img/2021/10/05/gettyimages-1202110461_custom-bd819dff694bd1cda4e2d100bca6acfa87f0d8cc.jpg",
      description: "The iconic Dave Chappelle returns with his razor-sharp insights and unforgettable storytelling.",
      price: "$89 - $200",
      tags: ["standup", "adult", "satire"],
      quotes: ["I'm rich and famous, but I still check restaurant bills for errors.", "The hardest thing to do is to be true to yourself, especially when everybody is watching."]
    },
    {
      id: 2,
      name: "Ali Wong",
      specialty: "Storytelling Comedy",
      date: "October 7, 2024",
      location: "Laugh Factory",
      image: "https://www.rollingstone.com/wp-content/uploads/2022/04/ali-wong-interview.jpg",
      description: "Ali Wong's hilarious takes on motherhood, marriage, and modern life will leave you in stitches.",
      price: "$65 - $150",
      tags: ["standup", "storytelling", "adult"],
      quotes: ["Pregnant women are smug. I was smug.", "My mom was a jungle Asian. She was from a developing country... We were the more savage Asians."]
    },
    {
      id: 3,
      name: "John Mulaney",
      specialty: "Self-deprecating Comedy",
      date: "November 10, 2024",
      location: "Comedy Cellar",
      image: "https://media.gq.com/photos/5c9d404a8d92de0c0c0836c0/master/pass/John-Mulaney-Kid-Gorgeous-GQ-2018-042718.jpg",
      description: "John Mulaney brings his signature style of self-deprecating humor and brilliant storytelling.",
      price: "$75 - $180",
      tags: ["standup", "storytelling", "observational"],
      quotes: ["In terms of instant relief, canceling plans is like heroin.", "I don't look older, I just look worse."]
    },
    {
      id: 4,
      name: "Hannah Gadsby",
      specialty: "Observational Comedy",
      date: "December 5, 2024",
      location: "The Improv",
      image: "https://media.newyorker.com/photos/5b3bc2015e54c02d11641ef1/1:1/w_1079,h_1079,c_limit/St-Felix-Hannah-Gadsby.jpg",
      description: "Hannah Gadsby's thought-provoking comedy challenges conventions while making you laugh.",
      price: "$55 - $130",
      tags: ["standup", "storytelling", "lgbtq"],
      quotes: ["I identify as tired.", "I've built a career out of self-deprecating humor. That's what I've built my career on. And I don't want to do that anymore."]
    }
  ];

  // Upcoming comedy shows
  const upcomingShows = [
    {
      id: 5,
      name: "Comedy Roast Battle",
      performer: "Various Comedians",
      date: "September 22, 2024",
      location: "Roast House Club",
      image: "https://media.istockphoto.com/id/482765897/photo/comedian-performing-on-stage.jpg?s=612x612&w=0&k=20&c=6UlXPRE_uZbUKT4Dl5LLlFsjKDcQMTTTZzxd_i0XiZ4=",
      description: "Watch comedians battle it out with their wittiest insults in this hilarious roast competition.",
      price: "$45 - $100",
      tags: ["roast", "multiple", "adult"],
      showtime: "8:00 PM"
    },
    {
      id: 6,
      name: "Improv Night",
      performer: "The Quick Wits Crew",
      date: "October 15, 2024",
      location: "Spontaneous Laughter Theater",
      image: "https://www.ncmagazine.com/wp-content/uploads/2019/12/NC_Feb2015_Improv_DavidEilenbergDSC_4042_0.jpg",
      description: "Unscripted comedy at its finest with audience participation and on-the-spot comedy creation.",
      price: "$35 - $75",
      tags: ["improv", "interactive", "family-friendly"],
      showtime: "7:30 PM"
    },
    {
      id: 7,
      name: "Comedy Magic Show",
      performer: "The Laughing Illusionist",
      date: "November 5, 2024",
      location: "Wonder & Laughs Theater",
      image: "https://www.goldstar.com/cdn/covers/small/f/9d/92c4baa6975c47eba1ea2f69ad8a4.jpeg",
      description: "A unique blend of side-splitting comedy and mind-blowing magic tricks.",
      price: "$40 - $90",
      tags: ["magic", "variety", "family-friendly"],
      showtime: "6:00 PM"
    },
    {
      id: 8,
      name: "Musical Comedy Night",
      performer: "Funny Notes Ensemble",
      date: "December 12, 2024",
      location: "Melody Chuckles Club",
      image: "https://thefestival.org.au/wp-content/uploads/2021/03/Comedy-Cabarety-Music.jpg",
      description: "Hilarious songs and musical sketches that will have you laughing and tapping your feet.",
      price: "$50 - $110",
      tags: ["musical", "variety", "adult"],
      showtime: "8:30 PM"
    }
  ];

  // Popular comedy clubs
  const popularClubs = [
    {
      name: "The Comedy Store",
      location: "Los Angeles, CA",
      established: "1972",
      image: "https://assets3.thrillist.com/v1/image/1746641/1200x630/flatten;crop;webp=auto;jpeg_quality=70",
      description: "Legendary venue where comedy giants have launched their careers.",
      notable: ["Richard Pryor", "Robin Williams", "Jim Carrey"]
    },
    {
      name: "Comedy Cellar",
      location: "New York, NY",
      established: "1982",
      image: "https://i.ytimg.com/vi/cEWDxBIHogg/maxresdefault.jpg",
      description: "Intimate basement club famous for surprise drop-ins by comedy legends.",
      notable: ["Dave Chappelle", "Amy Schumer", "Jerry Seinfeld"]
    },
    {
      name: "The Second City",
      location: "Chicago, IL",
      established: "1959",
      image: "https://www.secondcity.com/wp-content/uploads/2023/02/SC_150E-Night-CreditZackPierce-5.jpeg",
      description: "Improv comedy institution that trained generations of SNL stars.",
      notable: ["Tina Fey", "Steve Carell", "Stephen Colbert"]
    },
    {
      name: "Just For Laughs",
      location: "Montreal, Canada",
      established: "1983",
      image: "https://everout.thestranger.com/images/locations/just-for-laughs-and-just-for-laughs-museum/venue-desktop.jpg",
      description: "Home to the world's largest international comedy festival.",
      notable: ["Global comedians", "New talent showcases", "Industry networking"]
    }
  ];

  // Joke ticker data
  const jokes = [
    "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    "What do you call a fake noodle? An impasta!",
    "Why don't scientists trust atoms? Because they make up everything!",
    "I'm on a seafood diet. I see food and I eat it!",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "I used to be a baker, but I couldn't make enough dough.",
    "What's the best thing about Switzerland? I don't know, but the flag is a big plus.",
    "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them.",
    "Two guys walk into a bar. The third one ducks.",
    "What do you call a bear with no teeth? A gummy bear!"
  ];

  // Speech bubble quotes
  const speechBubbles = [
    "Comedy is simply a funny way of being serious.",
    "A day without laughter is a day wasted.",
    "If you want to tell people the truth, make them laugh.",
    "Laughter is the shortest distance between two people.",
    "Life doesn't have to be perfect to be wonderful.",
    "The problem with having a sense of humor is often that people you use it on aren't in a very good mood."
  ];

  // Setup ticker joke rotation
  useEffect(() => {
    // Initialize with random jokes
    const initialJokes = [];
    const usedIndices = new Set();
    
    while (initialJokes.length < 5) {
      const randomIndex = Math.floor(Math.random() * jokes.length);
      if (!usedIndices.has(randomIndex)) {
        initialJokes.push(jokes[randomIndex]);
        usedIndices.add(randomIndex);
      }
    }
    
    setTickerItems(initialJokes);
    
    // Setup interval to rotate jokes
    const interval = setInterval(() => {
      setTickerItems(prev => {
        const newJokes = [...prev];
        // Remove first joke
        newJokes.shift();
        // Add new random joke
        let newJokeIndex;
        do {
          newJokeIndex = Math.floor(Math.random() * jokes.length);
        } while (newJokes.includes(jokes[newJokeIndex]));
        
        newJokes.push(jokes[newJokeIndex]);
        return newJokes;
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Setup speech bubble rotation
  useEffect(() => {
    speechBubbleTimerRef.current = setInterval(() => {
      setActiveSpeechBubble(prev => (prev + 1) % speechBubbles.length);
    }, 6000);
    
    return () => clearInterval(speechBubbleTimerRef.current);
  }, []);

  // Comic book effects
  useEffect(() => {
    // Pow/Bang effects on page load
    const effects = document.querySelectorAll('.comic-effect');
    
    effects.forEach((effect, index) => {
      setTimeout(() => {
        effect.classList.add('animate');
        
        setTimeout(() => {
          effect.classList.remove('animate');
        }, 1500);
      }, index * 300);
    });
    
    // Setup random effect animations
    const randomEffectInterval = setInterval(() => {
      const randomEffect = effects[Math.floor(Math.random() * effects.length)];
      randomEffect.classList.add('animate');
      
      setTimeout(() => {
        randomEffect.classList.remove('animate');
      }, 1500);
    }, 7000);
    
    return () => clearInterval(randomEffectInterval);
  }, []);

  // Handle comedian rotation
  const changeComedian = (index) => {
    setActiveComedian(index);
    
    // Trigger comic effect animation
    const effectElements = document.querySelectorAll('.comic-effect');
    const randomEffect = effectElements[Math.floor(Math.random() * effectElements.length)];
    
    randomEffect.classList.add('animate');
    setTimeout(() => {
      randomEffect.classList.remove('animate');
    }, 1500);
  };

  return (
    <div className="comedy-page">
      {/* Comic book style effects */}
      <div className="comic-effects-container">
        <div className="comic-effect pow">POW!</div>
        <div className="comic-effect bang">BANG!</div>
        <div className="comic-effect zap">ZAP!</div>
        <div className="comic-effect boom">BOOM!</div>
        <div className="comic-effect haha">HA HA!</div>
      </div>
      
      {/* Hero section */}
      <div className="comedy-hero">
        <div className="comedy-hero-content">
          <h1 className="comic-font">
            <DecryptedText 
              text="Comedy Club" 
              animateOn="view"
              sequential={true}
              speed={80}
              maxIterations={20}
              className="decrypted"
              encryptedClassName="encrypted"
              parentClassName="decryption-animation"
            />
          </h1>
          <p className="comedy-subtitle">Where laughter is always on the menu!</p>
          
          <div className="comic-speech-bubble main-bubble">
            <p>{speechBubbles[activeSpeechBubble]}</p>
            <div className="bubble-tail"></div>
          </div>
        </div>
      </div>
      
      {/* Joke ticker */}
      <div className="joke-ticker">
        <div className="ticker-container">
          {tickerItems.map((joke, index) => (
            <div key={index} className="ticker-item">
              <span className="joke-text">{joke}</span>
              <span className="ticker-separator">•</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Featured comedians */}
      <section className="featured-comedians">
        <h2 className="section-title comic-font">Featured Comedians</h2>
        
        <div className="comedian-showcase">
          <div className="comedy-navigation">
            {featuredComedians.map((comedian, index) => (
              <button 
                key={index}
                className={`comedy-nav-btn ${index === activeComedian ? 'active' : ''}`}
                onClick={() => changeComedian(index)}
              >
                <span className="nav-emoji">{index === activeComedian ? '😂' : '😐'}</span>
                <span className="sr-only">Select {comedian.name}</span>
              </button>
            ))}
          </div>
          
          <div className="featured-comedian-display">
            {featuredComedians.map((comedian, index) => (
              <div 
                className={`featured-comedian-card ${index === activeComedian ? 'active' : ''}`} 
                key={comedian.id}
              >
                <div className="comedian-card-inner">
                  <div className="comedian-image">
                    <img src={comedian.image} alt={comedian.name} />
                    <div className="comic-panel-frame"></div>
                  </div>
                  <div className="comedian-details">
                    <div className="tag-container">
                      {comedian.tags.map((tag, idx) => (
                        <span key={idx} className="comedy-tag">{tag}</span>
                      ))}
                    </div>
                    <h3 className="comic-font">{comedian.name}</h3>
                    <p className="comedian-specialty">{comedian.specialty}</p>
                    <div className="comedian-info-grid">
                      <div className="comedian-info-item">
                        <span className="info-icon">📅</span>
                        <span>{comedian.date}</span>
                      </div>
                      <div className="comedian-info-item">
                        <span className="info-icon">📍</span>
                        <span>{comedian.location}</span>
                      </div>
                      <div className="comedian-info-item">
                        <span className="info-icon">💰</span>
                        <span>{comedian.price}</span>
                      </div>
                    </div>
                    <p className="comedian-description">{comedian.description}</p>
                    
                    <div className="quote-bubbles">
                      {comedian.quotes.map((quote, idx) => (
                        <div key={idx} className="quote-bubble">
                          <p>"{quote}"</p>
                          <div className="bubble-tail"></div>
                        </div>
                      ))}
                    </div>
                    
                    <button className="tickets-btn">
                      Get Tickets 
                      <span className="ticket-icon">🎭</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Tag filter */}
      <div className="comedy-tag-filter">
        <button 
          className={filterTag === 'all' ? 'active' : ''} 
          onClick={() => setFilterTag('all')}
        >
          All Shows
        </button>
        <button 
          className={filterTag === 'standup' ? 'active' : ''} 
          onClick={() => setFilterTag('standup')}
        >
          Standup
        </button>
        <button 
          className={filterTag === 'improv' ? 'active' : ''} 
          onClick={() => setFilterTag('improv')}
        >
          Improv
        </button>
        <button 
          className={filterTag === 'variety' ? 'active' : ''} 
          onClick={() => setFilterTag('variety')}
        >
          Variety
        </button>
        <button 
          className={filterTag === 'family-friendly' ? 'active' : ''} 
          onClick={() => setFilterTag('family-friendly')}
        >
          Family Friendly
        </button>
        <button 
          className={filterTag === 'adult' ? 'active' : ''} 
          onClick={() => setFilterTag('adult')}
        >
          Adult
        </button>
      </div>
      
      {/* Upcoming shows */}
      <section className="upcoming-shows">
        <h2 className="section-title comic-font">Upcoming Shows</h2>
        
        <div className="comedy-grid">
          {upcomingShows
            .filter(show => filterTag === 'all' || show.tags.includes(filterTag))
            .map(show => (
              <div className="comedy-grid-card" key={show.id}>
                <div className="comedy-panel">
                  <div className="panel-top">
                    <img src={show.image} alt={show.name} />
                    <div className="panel-frame"></div>
                  </div>
                  <div className="panel-content">
                    <h3 className="comic-font">{show.name}</h3>
                    <p className="performer-name">{show.performer}</p>
                    
                    <div className="show-details">
                      <div className="detail-item">
                        <span className="detail-icon">📅</span>
                        <span>{show.date}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-icon">🕗</span>
                        <span>{show.showtime}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-icon">📍</span>
                        <span>{show.location}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-icon">💰</span>
                        <span>{show.price}</span>
                      </div>
                    </div>
                    
                    <p className="show-description">{show.description}</p>
                    
                    <div className="tag-container">
                      {show.tags.map((tag, idx) => (
                        <span key={idx} className="comedy-tag">{tag}</span>
                      ))}
                    </div>
                    
                    <button className="show-btn">Book Now</button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
      
      {/* Popular comedy clubs */}
      <section className="comedy-clubs">
        <h2 className="section-title comic-font">Famous Comedy Clubs</h2>
        
        <div className="clubs-grid">
          {popularClubs.map((club, index) => (
            <div className="club-card" key={index}>
              <div className="club-image">
                <img src={club.image} alt={club.name} />
                <div className="club-frame"></div>
              </div>
              <div className="club-details">
                <h3 className="comic-font">{club.name}</h3>
                <p className="club-location">{club.location}</p>
                <p className="club-established">Est. {club.established}</p>
                <p className="club-description">{club.description}</p>
                
                <div className="notable-comedians">
                  <h4>Notable Performers:</h4>
                  <div className="notable-list">
                    {club.notable.map((person, idx) => (
                      <span key={idx} className="notable-person">{person}</span>
                    ))}
                  </div>
                </div>
                
                <button className="club-btn">Learn More</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 