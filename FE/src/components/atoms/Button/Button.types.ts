import React, { ReactNode } from 'react';
import { buttonStyles } from './Button.styles';
import { Size } from '@/themes/themeBase';

import { Palette } from '../../../themes/lightTheme';

export type ButtonVariant = 'contained' | 'outlined' | 'text';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: keyof typeof buttonStyles.variants.variant; 
    children: ReactNode;
  size?: Size;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
