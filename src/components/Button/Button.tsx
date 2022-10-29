import React from 'react';

import './Button.scss';
import { checkKey } from '../../utils';
import { SIZES } from '../../types';

interface Props {
  size?: SIZES;
  disabled?: boolean;
  square?: boolean;
  color?: 'blue' | 'black';
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<Props> = ({
  size = 'medium',
  disabled = false,
  square = false,
  color = 'blue',
  children,
  onClick,
}) => {
  const className = ['button', size, checkKey(square, 'square'), color]
    .filter((x) => x)
    .join(' ');

  return (
    <button
      onClick={() => onClick && onClick()}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
};

export default Button;
