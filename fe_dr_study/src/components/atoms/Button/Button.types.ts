import React, { ReactNode } from 'react';
import { Size } from '@/themes/themeBase';

export type ButtonVariant = 'contained' | 'outlined' | 'text';

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    type?: 'button' | 'submit' | 'reset';
    color?: 'gray' | 'dark' | 'coral' | 'white' | 'red';
    size?: Size;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;

    disabled?: boolean;
    outlined?: boolean;
    rounded?: boolean;
    fullWidth?: boolean;
    classNameStyles?: string;
}
