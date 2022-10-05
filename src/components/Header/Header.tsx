import React from 'react';
import SearchBar from '../SearchBar/SearchBar';

import './Header.scss';

class Header extends React.Component {
  render() {
    return (
      <header className='header'>
        <SearchBar />
      </header>
    )
  }
}

export default Header;
