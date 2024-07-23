import React from 'react';

import { BoxProps } from './Box.types';
import { boxStyles } from './Box.styles';

export const Box = ({
    variant,
    color = 'black',
    className,
    children,
}: BoxProps) => {
    return (
        <div className={`${boxStyles({ variant, color })} ${className}`}>
            {children}
        </div>
    );
};
