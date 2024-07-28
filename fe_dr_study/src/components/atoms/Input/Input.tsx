// src/components/atoms/Input/Input.tsx
'use client';
import React from 'react';
import { inputStyles } from './Input.styles';
import { InputProps } from './Input.types';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        { id, inputSize = 'md', fullWidth = true, className = '', ...props },
        ref,
    ) => {
        return (
            <input
                id={id}
                ref={ref}
                style={{ color: '#D2D2D2' }}
                className={`${inputStyles({ inputSize, fullWidth })} ${className}`}
                {...props}
                autoComplete="off"
            />
        );
    },
);

Input.displayName = 'Input';
