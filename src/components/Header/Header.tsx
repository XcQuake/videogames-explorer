import React from 'react';

import './Header.scss';

class Header extends React.Component {
  render() {
    return (
      <header className='header'>
        <div className='search-bar'>
          <button className='search-bar__options' />
          <input
            className='search-bar__input'
            placeholder='Фильмы, сериалы'
          />
        </div>
      </header>
    )
  }
}

export default Header;
