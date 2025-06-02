import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';

const ReviewForm = ({ movieId, onReviewAdded }) => {
  const [formData, setFormData] = useState({
    userName: '',
    rating: 0,
    comment: ''
  });
  
  const [hover, setHover] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/reviews', {
        ...formData,
        movieId
      });
      
      // Reset form
      setFormData({
        userName: '',
        rating: 0,
        comment: ''
      });
      
      // Notify parent component
      onReviewAdded(response.data);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };
  
  return (
    <div className="review-form">
      <h3>Write a Review</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userName">Your Name</label>
          <input 
            type="text" 
            id="userName" 
            name="userName" 
            value={formData.userName} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Rating</label>
          <div className="rating-select">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              
              return (
                <label key={index}>
                  <input 
                    type="radio" 
                    name="rating" 
                    value={ratingValue} 
                    onClick={() => setFormData(prev => ({ ...prev, rating: ratingValue }))} 
                    style={{ display: 'none' }} 
                  />
                  <FaStar 
                    className={`star-rating ${ratingValue <= (hover || formData.rating) ? 'active' : ''}`} 
                    onMouseEnter={() => setHover(ratingValue)} 
                    onMouseLeave={() => setHover(null)} 
                  />
                </label>
              );
            })}
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="comment">Your Review</label>
          <textarea 
            id="comment" 
            name="comment" 
            value={formData.comment} 
            onChange={handleChange} 
            required 
          ></textarea>
        </div>
        
        <button type="submit" className="submit-button" disabled={formData.rating === 0}>
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;