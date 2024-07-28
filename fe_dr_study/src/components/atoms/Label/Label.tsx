// src/components/atoms/Label/Label.tsx
'use client';
import React from 'react';
import { LabelProps } from './Label.types';

export const Label = ({ htmlFor, children, className }: LabelProps) => {
    return (
        <label
            htmlFor={htmlFor}
            className={`block text-dr-body-4 text-dr-white ${className} text-left`}
        >
            {children}
        </label>
    );
};
