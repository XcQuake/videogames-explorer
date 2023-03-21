import React from 'react';
import { NavLink } from 'react-router-dom';
import { URLS } from '../../utils/contants';
import Icon from '../UI/Icon/Icon';

import './SideBar.scss';

class SideBar extends React.Component {
  render() {
    return (
      <>
        <div className="sidebar">
          <nav className="navbar">
            <NavLink className="navbar__link" to={URLS.pc}>
              <Icon name="pc" color="secondary" />
            </NavLink>
            <NavLink className="navbar__link" to={URLS.playstation}>
              <Icon name="playstation" color="secondary" />
            </NavLink>
            <NavLink className="navbar__link" to={URLS.xbox}>
              <Icon name="xbox" color="secondary" />
            </NavLink>
          </nav>
        </div>
      </>
    );
  }
}

export default SideBar;
