import React from 'react';
import { COLORS, ICONS, SIZES } from '../../types';

import './Icon.scss';

interface Props {
  name?: ICONS;
  size?: SIZES;
  color: COLORS;
  onClick?: () => void;
}

const Icon: React.FC<Props> = ({ name, size, color, onClick }) => {
  const className = ['icon', name, size, color].join(' ');
  return <i className={className} onClick={() => onClick && onClick()} />;
};

export default Icon;
