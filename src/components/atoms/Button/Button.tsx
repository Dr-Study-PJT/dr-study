import React from 'react';
import { buttonStyles } from './Button.styles';
import { ButtonProps } from './Button.types';

const Button = ({ size, children }: ButtonProps) => {
  return <button className={buttonStyles({ size })}>{children}</button>;
};

export default Button;
