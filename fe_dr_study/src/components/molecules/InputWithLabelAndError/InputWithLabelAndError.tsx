// src/components/molecules/InputWithLabelAndError/InputWithLabelAndError.tsx
'use client';
import React from 'react';
import { Label } from '@/components/atoms/Label/Label';
import { Input } from '@/components/atoms/Input/Input';
import { InputWithLabelAndErrorProps } from './InputWithLabelAndError.types';

export const InputWithLabelAndError = React.forwardRef<
    HTMLInputElement,
    InputWithLabelAndErrorProps
>(
    (
        {
            id,
            label,
            error,
            className,
            inputClassName,
            labelClassName,
            onKeyDown,
            inputSize = 'md',
            fullWidth = true,
            ...props
        },
        ref,
    ) => {
        const errorMessage = typeof error === 'string' ? error : error?.message;
        return (
            <div className={fullWidth ? 'w-full' : 'w-max'}>
                <div className="flex flex-col gap-1 ">
                    <Label htmlFor={id} className={`${labelClassName}`}>
                        {label}
                    </Label>
                    <div className="flex flex-col">
                        <Input
                            id={id}
                            ref={ref}
                            inputSize={inputSize}
                            fullWidth={fullWidth}
                            className={inputClassName}
                            onKeyDown={onKeyDown}
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

InputWithLabelAndError.displayName = 'InputWithLabelAndError';
