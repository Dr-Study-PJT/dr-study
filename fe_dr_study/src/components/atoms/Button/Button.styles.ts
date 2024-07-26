import { tv } from 'tailwind-variants';

const colorToBg = {
    gray: 'bg-dr-gray-500 hover:bg-dr-gray-400',
    dark: 'bg-dr-dark-100 hover:bg-dr-dark-200',
    coral: 'bg-dr-coral-300 hover:bg-dr-coral-200',
    white: 'bg-dr-white hover:bg-dr-gray-100',
    red: 'bg-dr-red hover:bg-red-600',
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

    outlined_gray: 'text-dr-gray-500',
    outlined_dark: 'text-dr-dark-100',
    outlined_coral: 'text-dr-coral-300',
    outlined_white: 'text-dr-white',
    outlined_red: 'text-dr-red-',
};

export const buttonStyles = tv({
    base: 'flex items-center justify-center rounded-md focus:outline-none transition duration-200',
    variants: {
        bg: colorToBg,
        borderColor: colorToBorder,
        size: {
            sm: 'px-2 py-2 text-dr-body-4',
            md: 'px-4 py-2 text-dr-body-3',
            lg: 'px-6 py-2 text-dr-body-1',
        },
        rounded: {
            true: 'rounded-full',
            false: 'rounded-md',
        },
        outlined: {
            true: 'border-2 bg-transparent hover:border-opacity-60 hover:text-opacity-60',
            false: '',
        },
        fullWidth: {
            true: 'w-full',
            false: 'w-auto',
        },
        color: colorToText,
    },
    defaultVariants: {
        size: 'md',
        color: 'dark',
        bg: 'coral',
        rounded: false,
        outlined: false,
        fullWidth: false,
    },
});
