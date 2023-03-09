import React from 'react';
import SearchBar from '../SearchBar/SearchBar';

import './Header.scss';

const Header: React.FC = () => {
  return (
    <header className="header">
      <SearchBar />
    </header>
  );
};

export default Header;
