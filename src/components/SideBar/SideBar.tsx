import React from 'react';
import { NavLink } from 'react-router-dom';

import './SideBar.scss';

class SideBar extends React.Component {
  render() {
    return (
      <div className='sidebar sidebar_opened'>
        <nav className='navbar'>
          <NavLink className='navbar__link' to='/movies'>Popular Searches</NavLink>
          <NavLink className='navbar__link' to='/tv-shows'>Сериалы</NavLink>
          <NavLink className='navbar__link' to='/digital-releases'>Цифровые релизы</NavLink>
          <NavLink className='navbar__link' to='/acters'>Актёры</NavLink>
        </nav>
      </div>
    )
  }
}

export default SideBar;
