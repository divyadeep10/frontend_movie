import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import FilterSection from '../components/FilterSection';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    genre: '',
    sort: '',
    search: ''
  });
  
  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      
      // Build query string from filters
      const queryParams = new URLSearchParams();
      if (filters.genre) queryParams.append('genre', filters.genre);
      if (filters.sort) queryParams.append('sort', filters.sort);
      if (filters.search) queryParams.append('search', filters.search);
      
      const response = await axios.get(`http://localhost:5000/api/movies?${queryParams}`);
      setMovies(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('Failed to fetch movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [filters]);
  
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);
  
  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };
  
  return (
    <div>
      <h1>Discover Movies</h1>
      <FilterSection onFilter={handleFilter} />
      
      {loading ? (
        <p>Loading movies...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : movies.length === 0 ? (
        <p>No movies found matching your criteria.</p>
      ) : (
        <div className="movies-grid">
          {movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;