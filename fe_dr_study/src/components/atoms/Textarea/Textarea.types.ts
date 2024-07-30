import React from 'react';

export type TextareaSize = 'sm' | 'md' | 'lg';

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    id: string;
    textareaSize?: TextareaSize;
    fullWidth?: boolean;
    className?: string;
}
