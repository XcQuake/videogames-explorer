import React from 'react';
import { COLORS, ICONS, SIZES } from '../../../types';

import './Icon.scss';

interface Props {
  name?: ICONS;
  size?: SIZES;
  color: COLORS;
  className?: string;
  style?: {
    [key: string]: string;
  };
  onClick?: () => void;
}

const Icon: React.FC<Props> = ({
  name,
  size,
  color,
  className,
  style,
  onClick,
}) => {
  const classNameFull = ['icon', name, size, color, className].join(' ');
  return (
    <i
      className={classNameFull}
      onClick={() => onClick && onClick()}
      style={style}
    />
  );
};

export default Icon;
