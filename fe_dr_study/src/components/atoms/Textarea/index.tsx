'use client';
import React from 'react';
import { textareaStyles } from './Textarea.styles';
import { TextareaProps } from './Textarea.types';

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        {
            id,
            textareaSize = 'md',
            fullWidth = true,
            fullHeight = false,
            className = '',
            ...props
        },
        ref,
    ) => {
        return (
            <textarea
                id={id}
                ref={ref}
                style={{ color: '#D2D2D2' }}
                {...props}
                className={`${textareaStyles({ textareaSize, fullWidth, fullHeight })} ${className} ${fullHeight ? '!h-[100%]' : ''}`}
            />
        );
    },
);

Textarea.displayName = 'Textarea';
