import React from 'react';

import './Button.scss';
import { checkKey } from '../../utils';
import { COLORS, SIZES } from '../../types';

interface Props {
  size?: SIZES;
  disabled?: boolean;
  color?: COLORS;
  children?: React.ReactNode;
  padding?: number;
  onClick?: () => void;
}

const Button: React.FC<Props> = ({
  size = 'medium',
  disabled = false,
  color = 'blue',
  children,
  padding,
  onClick,
}) => {
  const className = ['button', size, color].filter((x) => x).join(' ');

  return (
    <button
      onClick={() => onClick && onClick()}
      disabled={disabled}
      style={{
        padding: padding,
      }}
      className={className}
    >
      {children}
    </button>
  );
};

export default Button;
