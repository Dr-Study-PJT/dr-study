'use client';
import React from 'react';
import { LabelCheckbox } from '@/components/molecules/LabelCheckbox';
import { LabelCheckboxGroupProps } from './LabelCheckboxGroup.types';
import { Label } from '@/components/atoms';

export const LabelCheckboxGroup: React.FC<LabelCheckboxGroupProps> = ({
    groupName,
    options,
    value,
    onChange,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div>
            <Label htmlFor="" className="font-semibold !text-dr-coral-200 mb-2">
                {groupName}
            </Label>
            <div className="flex flex-row justify-between gap-3 w-full h-4 px-1">
                {options.map((option) => (
                    <LabelCheckbox
                        key={option.id}
                        {...option}
                        checked={value === option.value}
                        onChange={handleChange}
                    />
                ))}
            </div>
        </div>
    );
};
