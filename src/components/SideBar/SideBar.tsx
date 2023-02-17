import React from 'react';
import { NavLink } from 'react-router-dom';
import { URLS } from '../../utils/contants';
import Icon from '../Icon/Icon';
import Logo from '../Logo/Logo';

import './SideBar.scss';

interface Props {}

interface States {
  isOpen: boolean;
}

class SideBar extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  private handleOpenMenu(): void {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <>
        <div
          className={`sidebar ${
            this.state.isOpen ? 'sidebar_opened' : 'sidebar_closed'
          }`}
        >
          <div className="sidebar__header">
            <button
              className="sidebar__button"
              onClick={() => this.handleOpenMenu()}
            />
            <p className="sidebar__title">Videogames</p>
          </div>
          <div className="sidebar__logo-wrapper">
            <Logo />
          </div>
          <nav className="navbar">
            <NavLink className="navbar__link" to={URLS.pc}>
              <Icon name="pc" color="secondary" />
              <span className="navbar__link-text">PC</span>
            </NavLink>
            <NavLink className="navbar__link" to={URLS.playstation}>
              <Icon name="playstation" color="secondary" />
              <span className="navbar__link-text">PlayStation</span>
            </NavLink>
            <NavLink className="navbar__link" to={URLS.xbox}>
              <Icon name="xbox" color="secondary" />
              <span className="navbar__link-text">Xbox</span>
            </NavLink>
          </nav>
        </div>
      </>
    );
  }
}

export default SideBar;
