import React from 'react';

import './Button.scss';
import { checkKey } from '../../../utils';
import { COLORS, SIZES } from '../../../types';

interface Props {
  size?: SIZES;
  disabled?: boolean;
  color?: COLORS;
  children?: React.ReactNode;
  style?: {
    [key: string]: string;
  };
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<Props> = ({
  size = 'medium',
  disabled = false,
  color = 'blue',
  children,
  style,
  className,
  onClick,
}) => {
  const classNameFull = ['button', size, color, className].join(' ');

  return (
    <button
      onClick={() => onClick && onClick()}
      disabled={disabled}
      style={style}
      className={classNameFull}
    >
      {children}
    </button>
  );
};

export default Button;
