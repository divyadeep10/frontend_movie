import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie._id}`}>
        <img 
          src={movie.posterUrl} 
          alt={movie.title} 
          className="movie-poster" 
        />
      </Link>
      <div className="movie-info">
        <h3 className="movie-title">
          <Link to={`/movie/${movie._id}`}>{movie.title}</Link>
        </h3>
        <div className="movie-meta">
          <span>{movie.releaseYear}</span>
          <div className="movie-rating">
            <FaStar />
            <span>{movie.averageRating.toFixed(1)}</span>
          </div>
        </div>
        <div className="movie-genre">
          {movie.genre.slice(0, 2).join(', ')}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;