import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./movieSection.css";

const MovieSection = () => {
  const [movies, setMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const navigate = useNavigate();

  const containerRefs = {
    trending: useRef(null),
    topRated: useRef(null),
    upcoming: useRef(null),
    nowPlaying: useRef(null)
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const API_KEY = "001f264775b4253741d136ff81a920b1";
        const [popular, topRated, upcoming, nowPlaying] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`),
          axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`),
          axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`),
          axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`)
        ]);

        setMovies(popular.data.results);
        setTopRatedMovies(topRated.data.results);
        setUpcomingMovies(upcoming.data.results);
        setNowPlayingMovies(nowPlaying.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMovies();
  }, []);

  const scroll = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: "smooth"
      });
    }
  };

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.id}`, { state: { movie } });
  };

  return (
    <div className="movie-section-container">
      {/* Trending Movies */}
      <div className="movie-category">
        <h2 className="section-title">Trending Movies</h2>
        <div className="movie-row">
          <button 
            className="scroll-button left" 
            onClick={() => scroll(containerRefs.trending, 'left')}
            aria-label="Scroll left"
          >
            &lt;
          </button>
          <div className="movie-container" ref={containerRefs.trending}>
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie)}>
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title}
                  className="movie-poster"
                  onError={(e) => {
                    e.target.src = '/placeholder-movie.jpg';
                    e.target.alt = 'Poster not available';
                  }}
                />
                <div className="movie-overlay">
                  <h3 className="movie-title">{movie.title}</h3>
                  <p className="movie-rating">⭐ {movie.vote_average.toFixed(1)}</p>
                </div>
              </div>
            ))}
          </div>
          <button 
            className="scroll-button right" 
            onClick={() => scroll(containerRefs.trending, 'right')}
            aria-label="Scroll right"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Repeat similar structure for other categories */}
      {/* Top Rated Movies */}
      <div className="movie-category">
        <h2 className="section-title">Top Rated Movies</h2>
        <div className="movie-row">
          <button className="scroll-button left" onClick={() => scroll(containerRefs.topRated, 'left')}>&lt;</button>
          <div className="movie-container" ref={containerRefs.topRated}>
            {topRatedMovies.map((movie) => (
              <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie)}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie-poster" />
                <div className="movie-overlay">
                  <h3 className="movie-title">{movie.title}</h3>
                  <p className="movie-rating">⭐ {movie.vote_average.toFixed(1)}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="scroll-button right" onClick={() => scroll(containerRefs.topRated, 'right')}>&gt;</button>
        </div>
      </div>

      {/* Upcoming Movies */}
      <div className="movie-category">
        <h2 className="section-title">Upcoming Movies</h2>
        <div className="movie-row">
          <button className="scroll-button left" onClick={() => scroll(containerRefs.upcoming, 'left')}>&lt;</button>
          <div className="movie-container" ref={containerRefs.upcoming}>
            {upcomingMovies.map((movie) => (
              <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie)}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie-poster" />
                <div className="movie-overlay">
                  <h3 className="movie-title">{movie.title}</h3>
                  <p className="coming-soon">Coming Soon</p>
                </div>
              </div>
            ))}
          </div>
          <button className="scroll-button right" onClick={() => scroll(containerRefs.upcoming, 'right')}>&gt;</button>
        </div>
      </div>

      {/* Now Playing Movies */}
      <div className="movie-category">
        <h2 className="section-title">Now Playing</h2>
        <div className="movie-row">
          <button className="scroll-button left" onClick={() => scroll(containerRefs.nowPlaying, 'left')}>&lt;</button>
          <div className="movie-container" ref={containerRefs.nowPlaying}>
            {nowPlayingMovies.map((movie) => (
              <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie)}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie-poster" />
                <div className="movie-overlay">
                  <h3 className="movie-title">{movie.title}</h3>
                  <p className="movie-rating">⭐ {movie.vote_average.toFixed(1)}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="scroll-button right" onClick={() => scroll(containerRefs.nowPlaying, 'right')}>&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default MovieSection;