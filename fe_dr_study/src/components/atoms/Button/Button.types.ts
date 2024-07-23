import React, { ReactNode } from 'react';

import { Size } from '@/themes/themeBase';

import { Palette } from '../../../themes/lightTheme';

export type ButtonVariant = 'contained' | 'outlined' | 'text';

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    bg?: 'gray';
    size?: Size;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
