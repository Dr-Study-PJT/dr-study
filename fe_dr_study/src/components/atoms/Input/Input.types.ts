import React from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    id: string;
    inputSize?: InputSize;
    fullWidth?: boolean;
    className?: string;
}
