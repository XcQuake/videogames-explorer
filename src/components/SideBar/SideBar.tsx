import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { URLS } from '../../utils/contants';
import Logo from '../Logo/Logo';

import './SideBar.scss';

interface Props {};

interface States {
  isOpen: boolean;
}

class SideBar extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isOpen: false,
    }
  }

  private handleOpenMenu(): void {
    this.setState({isOpen: !this.state.isOpen});
  }

  render() {
    return (
      <>
        <div className={ `sidebar ${this.state.isOpen ? 'sidebar_opened' : 'sidebar_closed'}` }>
          <div className='sidebar__header'>
            <button className='sidebar__button' onClick={() => this.handleOpenMenu()}/>
            <p className='sidebar__title'>Kino-Movies</p>
          </div>
          <div className='sidebar__logo-wrapper'>
            <Logo />
          </div>
          <nav className='navbar'>
            <NavLink className='navbar__link' to={URLS.films}>
              <div className='navbar__icon navbar__icon_movies' />
              <div className='navbar__link-text'>Фильмы</div>
            </NavLink>
            <NavLink className='navbar__link' to={URLS.tvShows}>
              <div className='navbar__icon navbar__icon_tv-shows' />
              <span className='navbar__link-text'>Сериалы</span>
            </NavLink>
            <NavLink className='navbar__link' to={URLS.digitalRelases}>
              <div className='navbar__icon navbar__icon_digital-releases' />
              <span className='navbar__link-text'>Цифровые релизы</span>
            </NavLink>
            <NavLink className='navbar__link' to={URLS.acters}>
              <div className='navbar__icon navbar__icon_acters' />
              <span className='navbar__link-text'>Персоны</span>
            </NavLink>
          </nav>
        </div>
      </>   
    )
  }
}

export default SideBar;
