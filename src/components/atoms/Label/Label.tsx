// src/components/atoms/Label.tsx
import React from 'react';
import { LabelProps } from './Label.types';

export const Label = ({ className, htmlFor = '', children }: LabelProps) => {
  return (
    <label className={className} htmlFor={htmlFor}>
      {children}
    </label>
  );
};
