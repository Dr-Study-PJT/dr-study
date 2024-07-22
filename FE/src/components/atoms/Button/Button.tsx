import React from 'react';

import { buttonStyles } from './Button.styles';
import { ButtonProps } from './Button.types';

export const Button = ({ onClick, size, children, variant }: ButtonProps) => {
  return (
    <button className={buttonStyles({ size, variant })} onClick={onClick}>
      {children}
    </button>
  );
};
