import { tv } from 'tailwind-variants';

const themeButton = {
    primary: `    bgColor: -- textColor: shadow`,
    gray: `    bgColor: -- textColor: shadow`,
};

export const buttonStyles = tv({
    base: 'flex items-center justify-center rounded-md focus:outline-none transition duration-200',
    variants: {
        variant: {
            outlined: '',
        },
        color: {
            primary: themeButton.primary,
            secondary: 'text-purple-500',
            success: 'text-green-500',
            danger: 'text-red-500',
            white: 'text-white', // 흰 글씨 추가
        },
        // bg: {
        //     gray: 'bg-[#36393E]',
        //     black: 'bg-black',
        //     white: 'bg-white',
        //     primary: 'bg-blue-500',
        //     none: '',
        // },
        size: {
            sm: 'px-2 py-1 text-sm',
            md: 'px-4 py-2 text-md',
            lg: 'px-6 py-3 text-lg',
            xl: 'px-8 py-4 text-xl',
        },
        shape: {
            square: 'square',
            rounded: 'rounded',
            circle: 'rounded-full',
        },

        active: {
            true: '',
            false: '',
        },
    },
    compoundVariants: [
        {
            outlined: true,
            class: 'border bg-none hover:bg-blue-100', // hover 시 연한 파랑색 배경
        },
        {
            rounded: true,
            class: 'hover:bg-blue-200', // hover 시 연한 파랑색 배경
        },
    ],
    defaultVariants: {
        size: 'md',
        color: 'white',
        bg: 'primary',
        shape: 'square',
        shadow: 'none',
        active: false,
    },
});
