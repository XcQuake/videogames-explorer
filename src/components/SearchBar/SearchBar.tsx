import React from 'react';

import './SearchBar.scss';

const SearchBar: React.FC = () => {
  return (
    <div className='search-bar'>
      <button className='search-bar__options' />
      <input
        className='search-bar__input'
        placeholder='Фильмы, сериалы'
      />
    </div>
  )
};

export default SearchBar;