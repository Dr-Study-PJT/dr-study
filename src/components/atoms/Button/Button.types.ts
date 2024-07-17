import React, { ReactNode } from 'react';
import { Size } from '@/themes/themeBase';
import { Palette } from '../../../themes/lightTheme';

export type ButtonVariant = 'contained' | 'outlined' | 'text';

export interface ButtonProps {
  children: ReactNode;
  // size?: Size;
  // variant?: ButtonVariant;
  // color?: Palette;
  // disabled?: boolean;
  // fullwidth?: string;
}
