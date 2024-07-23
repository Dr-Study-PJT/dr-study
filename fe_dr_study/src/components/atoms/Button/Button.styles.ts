import { tv } from 'tailwind-variants';

const colorToBg = {
    gray: 'bg-dr-gray-500 hover:bg-dr-gray-400',
    dark: 'bg-dr-dark-100 hover:bg-dr-dark-200',
    coral: 'bg-dr-coral-300 hover:bg-dr-coral-200',
    white: 'bg-dr-white hover:bg-dr-gray-100',
    red: 'bg-dr-red hover:bg-dr-red-700',
    none: 'bg-transparent',
};

const colorToBorder = {
    gray: 'border-dr-gray-500 hover:border-dr-gray-400',
    dark: 'border-dr-dark-100 hover:border-dr-dark-200',
    coral: 'border-dr-coral-300 hover:border-dr-coral-200',
    white: 'border-dr-white hover:border-dr-gray-100',
    red: 'border-dr-red hover:border-dr-red-700',
    none: 'border-transparent',
};

const colorToText = {
    gray: 'text-dr-white',
    dark: 'text-dr-white',
    coral: 'text-dr-white',
    white: 'text-dr-black',
    red: 'text-dr-white',
};

export const buttonStyles = tv({
    base: 'flex items-center justify-center rounded-md focus:outline-none transition duration-200',
    variants: {
        color: colorToText,
        bg: colorToBg,
        borderColor: colorToBorder,
        size: {
            sm: 'px-4 py-2 text-dr-body-2',
            md: 'px-6 py-3 text-dr-body-1',
            lg: 'px-9 py-4 text-dr-header-3',
        },
        rounded: {
            true: 'rounded-full',
            false: 'rounded-md',
        },
        outlined: {
            true: 'border-2 bg-transparent hover:bg-opacity-20 hover:bg-current',
            false: '',
        },
        fullWidth: {
            true: 'w-full',
            false: 'w-auto',
        },
    },
    defaultVariants: {
        size: 'md',
        color: 'white',
        bg: 'coral',
        rounded: false,
        outlined: false,
        fullWidth: false,
    },
});
