'use client';
import React from 'react';
import { LabelCheckboxProps } from './LabelCheckbox.types';
import { Checkbox } from '@/components/atoms/Checkbox';

export const LabelCheckbox: React.FC<LabelCheckboxProps> = ({
    id,
    label,
    className,
    ...props
}) => {
    return <Checkbox id={id} label={label} className={className} {...props} />;
};
