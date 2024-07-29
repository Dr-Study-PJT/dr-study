import React from 'react';
import { tv } from 'tailwind-variants';

export const labelStyles = tv({
    base: ['text-[12px] text-left text-blue-600'],
    variants: {
        color: {
            primary: 'text-blue-500',
            secondary: 'text-purple-500',
            success: 'text-green-500',
            danger: 'text-red-500',
            black: 'text-black',
            white: 'text-white',
        },
    },
});

export const inputStyles = tv({
    base: [
        'bg-transparent',
        'border-b-2',
        'border-[#2196F3]',
        'text-white',
        'py-1',
        'outline-none',
        'focus:border-[#4fb0ff]',
    ],
});

export const errorStyles = tv({
    base: ['absolute', 'top-12', 'text-red-600', 'mt-1', 'text-sm'],
});

export const iconStyles = tv({
    base: 'flex items-center justify-center text-white rounded-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300',
    variants: {
        color: {
            primary: 'text-blue-500',
            secondary: 'text-purple-500',
            success: 'text-green-500',
            danger: 'text-red-500',
        },
        bg: {
            gray: 'bg-gray-800',
            black: 'bg-black',
            white: 'bg-white',
            primary: 'primary',
            none: '',
        },
        size: {
            sm: 'w-4 h-4',
            md: 'w-6 h-6',
            lg: 'w-8 h-8',
            xl: 'w-10 h-10',
        },
        shape: {
            square: '',
            rounded: 'rounded',
            circle: 'rounded-full',
        },
        shadow: {
            none: '',
            sm: 'shadow-sm',
            md: 'shadow-md',
            lg: 'shadow-lg',
            xl: 'shadow-xl',
        },
        active: {
            true: '',
            false: '',
        },
    },
    compoundVariants: [
        {
            active: true,
            class: 'bg-blue-500 text-white',
        },
        {
            active: false,
            color: 'primary',
            class: 'hover:bg-blue-400',
        },
    ],
    defaultVariants: {
        size: 'md',
        color: 'primary',
        bg: 'none',
        shape: 'square',
        shadow: 'none',
        active: false,
    },
});
