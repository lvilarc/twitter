import React from 'react';
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onChange, onSearch }) => {
    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Pesquisar"
          onChange={onChange}
        />
        <button type="button" onClick={onSearch}>
          <FaSearch />
        </button>
      </div>
    );
  };

export default SearchBar;