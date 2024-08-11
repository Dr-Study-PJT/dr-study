import React from 'react';

export type TextareaSize = 'sm' | 'md' | 'lg' | 'fullHeight';

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    id?: string;
    textareaSize?: TextareaSize;
    fullWidth?: boolean;
    fullHeight?: boolean;
    className?: string;
}
