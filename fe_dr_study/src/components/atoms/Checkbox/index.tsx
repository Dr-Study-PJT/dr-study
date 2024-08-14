'use client';
import React from 'react';
import { CheckboxProps } from './Checkbox.types';

export const Checkbox: React.FC<CheckboxProps> = ({
    id,
    label,
    className,
    ...props
}) => {
    return (
        <div className="flex items-center flex-row gap-2">
            <input
                type="radio"
                id={id}
                className={`form-radio h-3 w-3 text-dr-coral-200 transition duration-150 ease-in-out ${className}  display:none checkedbg-dr-coral-200`}
                {...props}
            />
            <label htmlFor={id} className=" text-dr-white text-dr-body-4">
                {label}
            </label>
        </div>
    );
};
