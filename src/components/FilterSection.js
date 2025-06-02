import React, { useState } from 'react';

const FilterSection = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    genre: '',
    sort: '',
    search: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <div className="filter-section">
      <form className="filter-form" onSubmit={handleSubmit}>
        <div className="filter-group">
          <label htmlFor="genre">Genre</label>
          <select 
            id="genre" 
            name="genre" 
            value={filters.genre} 
            onChange={handleChange}
          >
            <option value="">All Genres</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Horror">Horror</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Thriller">Thriller</option>
            <option value="Romance">Romance</option>
            <option value="Animation">Animation</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="sort">Sort By</label>
          <select 
            id="sort" 
            name="sort" 
            value={filters.sort} 
            onChange={handleChange}
          >
            <option value="">Default</option>
            <option value="rating">Rating (High to Low)</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="search">Search</label>
          <input 
            type="text" 
            id="search" 
            name="search" 
            value={filters.search} 
            onChange={handleChange} 
            placeholder="Search movies..."
          />
        </div>
        
        <div className="filter-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
          <button type="submit" className="filter-button">Apply Filters</button>
        </div>
      </form>
    </div>
  );
};

export default FilterSection;