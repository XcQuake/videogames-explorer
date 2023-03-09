import React from 'react';
import { useHistory } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

import './Header.scss';
import { Button, Icon } from '../UI';

const Header: React.FC = () => {
  const history = useHistory();

  return (
    <header className="header">
      <Button onClick={() => history.goBack()} color="inherit" size="tiny">
        <Icon color="white" name="arrow_left" size="large" />
      </Button>
      <SearchBar />
    </header>
  );
};

export default Header;
