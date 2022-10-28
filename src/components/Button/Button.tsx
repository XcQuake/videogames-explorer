import React from 'react';

import './Button.scss';

interface Props {
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  icon?: boolean;
  color?: 'blue' | 'black';
  children?: React.ReactNode;
}

const Button: React.FC<Props> = ({
  size = 'medium',
  disabled = false,
  icon = false,
  color = 'blue',
  children,
}) => {
  function getClassName(val: boolean, key: string) {
    return val ? key : null;
  }

  const className = ['button', size, getClassName(icon, 'icon'), color].join(
    ' '
  );

  return (
    <button disabled={disabled} className={className}>
      {children}
    </button>
  );
};

export default Button;
