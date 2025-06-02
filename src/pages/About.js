import React from 'react';

const About = () => {
  return (
    <div className="about-page">
      <h1>About MovieReviews</h1>
      <p>
        Welcome to MovieReviews, your go-to destination for honest movie reviews and ratings.
        Our platform allows movie enthusiasts to share their thoughts and experiences about
        their favorite (or not-so-favorite) films.
      </p>
      
      <h2>Our Mission</h2>
      <p>
        Our mission is to create a community where movie lovers can discover new films,
        share their opinions, and help others make informed decisions about what to watch next.
      </p>
      
      <h2>Features</h2>
      <ul>
        <li>Browse a diverse collection of movies</li>
        <li>Filter movies by genre, rating, and release year</li>
        <li>Read and write detailed reviews</li>
        <li>Rate movies on a five-star scale</li>
        <li>Mark helpful reviews to highlight valuable opinions</li>
      </ul>
      
      <h2>Contact Us</h2>
      <p>
        Have questions, suggestions, or feedback? We'd love to hear from you!
        Reach out to us at info@moviereviews.com.
      </p>
    </div>
  );
};

export default About;