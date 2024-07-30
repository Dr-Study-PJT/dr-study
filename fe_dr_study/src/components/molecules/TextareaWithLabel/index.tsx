'use client';
import React from 'react';
import { Label } from '@/components/atoms/Label/Label';
import { Textarea } from '@/components/atoms/Textarea';
import { TextareaWithLabelProps } from './TextareaWithLabel.types';

export const TextareaWithLabel = React.forwardRef<
    HTMLTextAreaElement,
    TextareaWithLabelProps
>(
    (
        {
            id,
            label,
            error,
            className,
            textareaClassName,
            labelClassName,
            textareaSize = 'md',
            fullWidth = true,
            ...props
        },
        ref,
    ) => {
        const errorMessage = typeof error === 'string' ? error : error?.message;
        return (
            <div className={fullWidth ? 'w-full' : 'w-max'}>
                <div className="flex flex-col gap-1">
                    <Label htmlFor={id} className={labelClassName}>
                        {label}
                    </Label>
                    <div className="flex flex-col">
                        <Textarea
                            id={id}
                            ref={ref}
                            textareaSize={textareaSize}
                            fullWidth={fullWidth}
                            className={textareaClassName}
                            {...props}
                        />
                        {errorMessage && (
                            <span className="text-red-500 text-dr-body-4 text-left">
                                {errorMessage as string}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        );
    },
);

TextareaWithLabel.displayName = 'TextareaWithLabel';
