import { useState } from 'react';
import TiltedCard from '../components/TiltedCard';
import DecryptedText from '../components/DecryptedText';
import '../styles/Movies.css';

export default function Movies() {
  // Data for different movie genres
  const actionMovies = [
    {
      image: "https://m.media-amazon.com/images/M/MV5BZWU4NDY0ODktOGI3OC00NWE1LWIwYmQtNmJiZWU3NmZlMDhkXkEyXkFqcGc@._V1_.jpg",
      title: "Until Dawn",
      caption: "25th April 2025",
      genre: "Action, Thriller"
    },
    {
      image: "https://m.media-amazon.com/images/M/MV5BYjhkZjM3ZWYtMjUxMS00YzhlLTkxZWYtMzhkMzFhOTQ1NjRkXkEyXkFqcGc@._V1_.jpg",
      title: "Amateur",
      caption: "In Cinemas • 11th April 2025",
      genre: "Action, Drama"
    },
    {
      image: "https://m.media-amazon.com/images/M/MV5BNjIwZWY4ZDEtMmIxZS00NDA4LTg4ZGMtMzUwZTYyNzgxMzk5XkEyXkFqcGc@._V1_.jpg",
      title: "Sinner",
      caption: "In Cinemas • 18th April 2025",
      genre: "Action, Crime"
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/95/Kesari_Chapter_2.jpg/250px-Kesari_Chapter_2.jpg",
      title: "Kesari Chapter 2",
      caption: "In Cinemas • 18th April 2025",
      genre: "Action, Historical"
    }
  ];

  const adventureMovies = [
    {
      image: "https://image.tmdb.org/t/p/original/iPPTGh2OXuIv6d7cwuoPkw8govp.jpg",
      title: "Minecraft: The Movie",
      caption: "In Cinemas • 4th April 2025",
      genre: "Adventure, Fantasy"
    },
    {
      image: "https://s3.amazonaws.com/nightjarprod/content/uploads/sites/130/2025/02/03190714/rzfqeLdHIysJGrspMICyedpqDqt-scaled.jpg",
      title: "Paddington in Peru",
      caption: "In Cinemas • 18th April 2025",
      genre: "Adventure, Comedy"
    },
    {
      image: "https://stat5.bollywoodhungama.in/wp-content/uploads/2023/10/Chhaava.jpg",
      title: "Chhaava",
      caption: "In Cinemas • 14th April 2025",
      genre: "Adventure, Historical"
    },
    {
      image: "https://assets-in.bmscdn.com/discovery-catalog/events/et00378228-tqqybflwkx-landscape.jpg",
      title: "Ramayana",
      caption: "Coming Soon • June 2025",
      genre: "Adventure, Mythological"
    }
  ];

  const dramaMovies = [
    {
      image: "https://dx35vtwkllhj9.cloudfront.net/the-chosen-inc/the-chosen-last-supper/images/gallery/image1.jpg",
      title: "The Chosen: Last Supper",
      caption: "In Cinemas • 17th April 2025",
      genre: "Drama, Historical"
    },
    {
      image: "https://m.media-amazon.com/images/M/MV5BM2QwNGJkMDQtZWRlYy00OGE2LWJiYzktYWY1OGU2YjYwZTVmXkEyXkFqcGc@._V1_.jpg",
      title: "The Piano Lesson",
      caption: "Coming Soon • May 2025",
      genre: "Drama"
    },
    {
      image: "https://m.media-amazon.com/images/M/MV5BNTk5MTkzNjU1OV5BMl5BanBnXkFtZTgwNzk5Mzk3MzE@._V1_.jpg",
      title: "A Beautiful Mind",
      caption: "Remastered • June 2025",
      genre: "Drama, Biography"
    },
    {
      image: "https://in.bmscdn.com/events/moviecard/ET00334632.jpg",
      title: "The Teacher",
      caption: "In Cinemas • 5th May 2025",
      genre: "Drama, Thriller"
    }
  ];

  const scifiMovies = [
    {
      image: "https://www.hollywoodreporter.com/wp-content/uploads/2016/06/independence_day_resurgence_10.jpg",
      title: "Extinction Event",
      caption: "Coming Soon • July 2025",
      genre: "Sci-Fi, Action"
    },
    {
      image: "https://i0.wp.com/www.murphysmultiverse.com/wp-content/uploads/2022/12/mafvx5.jpg",
      title: "The Colony",
      caption: "In Cinemas • 28th April 2025",
      genre: "Sci-Fi, Thriller"
    },
    {
      image: "https://assets-prd.ignimgs.com/2022/10/07/screenshot-1665160759108-1665160873121.png",
      title: "Quantum Breach",
      caption: "Coming Soon • May 2025",
      genre: "Sci-Fi, Mystery"
    },
    {
      image: "https://i0.wp.com/bloody-disgusting.com/wp-content/uploads/2017/10/alien-covenant-1.jpg",
      title: "Deep Space",
      caption: "Coming Soon • August 2025",
      genre: "Sci-Fi, Horror"
    }
  ];

  const [selectedGenre, setSelectedGenre] = useState('all');

  // Generic render function for movie grids
  const renderMovieGrid = (movies) => {
    return (
      <div className="movie-grid">
        {movies.map((movie, index) => (
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
                    <p className="movie-genre">{movie.genre}</p>
                    <p className="movie-caption">{movie.caption}</p>
                  </div>
                }
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="movies-page">
      <div className="movies-hero">
        <h1>
          <DecryptedText 
            text="Movies Collection" 
            animateOn="view"
            sequential={true}
            speed={80}
            maxIterations={20}
            className="decrypted"
            encryptedClassName="encrypted"
            parentClassName="decryption-animation"
          />
        </h1>
        <p className="movies-subtitle">Explore our curated selection of upcoming and trending movies</p>
      </div>

      <div className="genre-filter">
        <button 
          className={selectedGenre === 'all' ? 'active' : ''} 
          onClick={() => setSelectedGenre('all')}
        >
          All Movies
        </button>
        <button 
          className={selectedGenre === 'action' ? 'active' : ''} 
          onClick={() => setSelectedGenre('action')}
        >
          Action
        </button>
        <button 
          className={selectedGenre === 'adventure' ? 'active' : ''} 
          onClick={() => setSelectedGenre('adventure')}
        >
          Adventure
        </button>
        <button 
          className={selectedGenre === 'drama' ? 'active' : ''} 
          onClick={() => setSelectedGenre('drama')}
        >
          Drama
        </button>
        <button 
          className={selectedGenre === 'scifi' ? 'active' : ''} 
          onClick={() => setSelectedGenre('scifi')}
        >
          Sci-Fi
        </button>
      </div>

      {(selectedGenre === 'all' || selectedGenre === 'action') && (
        <div className="movie-category">
          <h2>Action Movies</h2>
          <div className="movie-category-description">
            <p>High-octane thrills and adrenaline-pumping adventures await</p>
          </div>
          {renderMovieGrid(actionMovies)}
        </div>
      )}

      {(selectedGenre === 'all' || selectedGenre === 'adventure') && (
        <div className="movie-category">
          <h2>Adventure Movies</h2>
          <div className="movie-category-description">
            <p>Epic journeys and captivating explorations of new worlds</p>
          </div>
          {renderMovieGrid(adventureMovies)}
        </div>
      )}

      {(selectedGenre === 'all' || selectedGenre === 'drama') && (
        <div className="movie-category">
          <h2>Drama Movies</h2>
          <div className="movie-category-description">
            <p>Emotional narratives that explore the depths of human experience</p>
          </div>
          {renderMovieGrid(dramaMovies)}
        </div>
      )}

      {(selectedGenre === 'all' || selectedGenre === 'scifi') && (
        <div className="movie-category">
          <h2>Sci-Fi Movies</h2>
          <div className="movie-category-description">
            <p>Futuristic visions and mind-bending concepts that challenge reality</p>
          </div>
          {renderMovieGrid(scifiMovies)}
        </div>
      )}

      <div className="movies-footer">
        <p>Check back regularly for updates on the latest releases and exclusive premieres</p>
        <button className="newsletter-button">Subscribe to Updates</button>
      </div>
    </div>
  );
} 