import { NavLink } from 'react-router-dom';

import './MobileBar.scss';
import { Icon } from '../UI';
import { URLS } from '../../utils/contants';

const MobileBar = () => {
  return (
    <div className="mobile-bar">
      <nav className="mobile-bar__nav">
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
  );
};

export default MobileBar;
