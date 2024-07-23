import React from 'react';

import { buttonStyles } from './Button.styles';
import { ButtonProps } from './Button.types';

export const Button = ({ onClick, size, bg, children }: ButtonProps) => {
    return (
        <button className={buttonStyles({ size })} onClick={onClick}>
            {children}
        </button>
    );
};
