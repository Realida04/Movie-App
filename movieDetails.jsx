import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./MovieDetails.css";

const MovieDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location.state?.movie;
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isLoadingCast, setIsLoadingCast] = useState(true);
  const [isLoadingTrailer, setIsLoadingTrailer] = useState(false);

  useEffect(() => {
    if (movie?.id) {
      // Fetch cast
      setIsLoadingCast(true);
      fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=001f264775b4253741d136ff81a920b1`)
        .then(response => response.json())
        .then(data => {
          setCast(data.cast.slice(0, 10));
          setIsLoadingCast(false);
        })
        .catch(error => {
          console.error("Error fetching cast:", error);
          setIsLoadingCast(false);
        });
    }
  }, [movie?.id]);

  const fetchTrailer = async () => {
    if (!movie?.id) return;
    
    setIsLoadingTrailer(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=001f264775b4253741d136ff81a920b1`
      );
      const data = await response.json();
      
      // Find the first official trailer
      const trailer = data.results.find(
        video => video.type === 'Trailer' && video.site === 'YouTube'
      );
      
      if (trailer) {
        setTrailerKey(trailer.key);
        setShowTrailer(true);
      } else {
        alert('No trailer available for this movie');
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
      alert('Failed to load trailer');
    } finally {
      setIsLoadingTrailer(false);
    }
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
    setTrailerKey(null);
  };

  if (!movie) {
    return <p>Movie not found</p>;
  }

  return (
    <div className="movie-details-container">
      {/* Trailer Modal */}
      {showTrailer && (
        <div className="trailer-modal">
          <div className="trailer-modal-content">
            <button className="close-trailer" onClick={handleCloseTrailer}>
              ×
            </button>
            {isLoadingTrailer ? (
              <p>Loading trailer...</p>
            ) : trailerKey ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                title={`${movie.title} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                frameBorder="0"
              ></iframe>
            ) : (
              <p>Trailer not available</p>
            )}
          </div>
        </div>
      )}
      
      <button className='back-btn' onClick={() => navigate(-1)}>← Back</button>
      
      <div className="movie-content">
        {movie.poster_path && (
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={`${movie.title} poster`} 
            className="movie-poster"
          />
        )}
        
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p className="movie-meta">{movie.release_date} | ⭐ {movie.vote_average} | {movie.runtime} minutes</p>
          <p className="movie-genres">{movie.genres?.map((g) => g.name).join(", ")}</p>
          <p className="movie-overview">{movie.overview || "No overview available."}</p>
          
          <div className="action-buttons">
            <button 
              className="watch-btn" 
              onClick={fetchTrailer}
              disabled={isLoadingTrailer}
            >
              {isLoadingTrailer ? 'Loading...' : '▶ Watch Now'}
            </button>
            <button className="add-btn"> + Add to My List</button>
          </div>
        </div>
      </div>

      <h2 className="cast-heading">Cast</h2>
      <div className="cast-list">
        {isLoadingCast ? (
          <p>Loading cast...</p>
        ) : cast.length > 0 ? (
          <div className="cast-grid">
            {cast.map(person => (
              <div key={person.id} className="cast-member">
                <img
                  src={person.profile_path 
                    ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                    : '/placeholder-actor.jpg'}
                  alt={person.name}
                  className="cast-photo"
                />
                <div className="cast-info">
                  <p className="cast-name">{person.name}</p>
                  <p className="cast-character">{person.character}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No cast information available.</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;