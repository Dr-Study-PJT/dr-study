import { tv } from 'tailwind-variants';

export const iconStyles = tv({
    base: 'p-[6px] rounded-full transition duration-200 relative group', // group 추가
    variants: {
        cursor: {
            pointer: 'cursor-pointer',
        },
        size: {
            sm: 'text-[19px]',
            md: 'text-[36px]',
            lg: 'text-[48px]',
            xl: 'text-[60px]',
        },
        bg: {
            blue: 'text-dr-coral-200',
            gray: 'bg-dr-gray-200',
            red: 'bg-dr-red',
            none: 'bg-transparent',
        },
        text: {
            blue: 'text-[#007AFF]',
            gray: 'text-dr-gray-200',
            white: 'text-dr-white',
        },
        shape: {
            contained: 'rounded-[0.3125rem]',
            rounded: 'rounded-full',
        },
        active: {
            true: '',
            false: '',
        },
        hover: {
            blue: 'hover:bg-dr-coral-400',
            gray: 'hover:bg-dr-gray-400', // 호버 시 배경색 추가
            red: 'hover:bg-dr-red', // 호버 시 배경색 추가
        },
        disabled: {
            true: 'bg-gray-300 text-gray-500 cursor-not-allowed',
        },
    },
    compoundVariants: [
        {
            active: true,
            class: 'bg-[#007AFF] text-white',
        },
    ],
    defaultVariants: {
        active: false,
    },
});
