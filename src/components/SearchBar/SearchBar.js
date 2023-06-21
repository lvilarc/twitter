import React, { useState } from 'react';
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';

const SearchBar = ({ onChange, onSearch }) => {
  const [aba, setAba] = useState('Explorar');

  return (
    <div className="search-bar">
      <div className='div-explorar'>
        <a>{aba}</a>
      </div>
      <input
          type="text"
          placeholder="Pesquisar"
          onChange={onChange}
        />
      
      <button type="button" onClick={onSearch}>
        <FaSearch />
      </button>
      <button type="button" onClick={onSearch}>
      
      <FiEdit  />
    
      </button>
    </div>
  );
};

export default SearchBar;