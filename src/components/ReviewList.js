import React from 'react';
import { FaStar, FaThumbsUp } from 'react-icons/fa';
import axios from 'axios';

const ReviewList = ({ reviews, onReviewUpdated }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleHelpful = async (reviewId) => {
    try {
      const response = await axios.put(`https://backend-movie-hazel.vercel.app/api/reviews/${reviewId}/helpful`);
      onReviewUpdated(response.data);
    } catch (error) {
      console.error('Error marking review as helpful:', error);
    }
  };
  
  if (reviews.length === 0) {
    return <p>No reviews yet. Be the first to review!</p>;
  }
  
  return (
    <div className="reviews-list">
      {reviews.map(review => (
        <div key={review._id} className="review-card">
          <div className="review-header">
            <span className="review-user">{review.userName}</span>
            <span className="review-date">{formatDate(review.createdAt)}</span>
          </div>
          
          <div className="review-rating">
            {[...Array(5)].map((_, index) => (
              <FaStar 
                key={index} 
                color={index < review.rating ? '#f39c12' : '#ddd'} 
              />
            ))}
          </div>
          
          <p className="review-content">{review.comment}</p>
          
          <div className="review-helpful">
            <button 
              className="helpful-button" 
              onClick={() => handleHelpful(review._id)}
            >
              <FaThumbsUp /> Helpful ({review.helpful})
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;