import React from 'react';
import { ICONS, SIZES } from '../../types';

import './Icon.scss';

interface Props {
  name?: ICONS;
  size?: SIZES;
  onClick?: () => void;
}

const Icon: React.FC<Props> = ({ name, size, onClick }) => {
  const className = ['icon', name, size].join(' ');
  return <i className={className} onClick={() => onClick && onClick()} />;
};

export default Icon;
