import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchMovieAndReviews = async () => {
      try {
        setLoading(true);
        
        // Fetch movie details
        const movieResponse = await axios.get(`http://localhost:5000/api/movies/${id}`);
        setMovie(movieResponse.data);
        
        // Fetch reviews for this movie
        const reviewsResponse = await axios.get(`http://localhost:5000/api/reviews/movie/${id}`);
        setReviews(reviewsResponse.data);
        
        setError(null);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('Failed to fetch movie details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovieAndReviews();
  }, [id]);
  
  const handleReviewAdded = (newReview) => {
    setReviews(prev => [newReview, ...prev]);
    
    // Update movie's average rating and review count in the UI
    setMovie(prev => ({
      ...prev,
      averageRating: (prev.averageRating * prev.reviewCount + newReview.rating) / (prev.reviewCount + 1),
      reviewCount: prev.reviewCount + 1
    }));
  };
  
  const handleReviewUpdated = (updatedReview) => {
    setReviews(prev => 
      prev.map(review => 
        review._id === updatedReview._id ? updatedReview : review
      )
    );
  };
  
  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!movie) return <p>Movie not found.</p>;
  
  return (
    <div className="movie-detail">
      <div className="movie-detail-header">
        <img 
          src={movie.posterUrl} 
          alt={movie.title} 
          className="movie-detail-poster" 
        />
        
        <div className="movie-detail-info">
          <h1 className="movie-detail-title">{movie.title}</h1>
          
          <div className="movie-detail-meta">
            <span>{movie.releaseYear}</span>
            <span>{movie.genre.join(', ')}</span>
            <span>Director: {movie.director}</span>
          </div>
          
          <div className="movie-detail-rating">
            <FaStar />
            <span>{movie.averageRating.toFixed(1)}</span>
            <span>({movie.reviewCount} reviews)</span>
          </div>
          
          <p className="movie-detail-description">{movie.description}</p>
        </div>
      </div>
      
      <div className="reviews-section">
        <div className="reviews-header">
          <h2>Reviews</h2>
        </div>
        
        <ReviewForm 
          movieId={id} 
          onReviewAdded={handleReviewAdded} 
        />
        
        <ReviewList 
          reviews={reviews} 
          onReviewUpdated={handleReviewUpdated} 
        />
      </div>
    </div>
  );
};

export default MovieDetail;