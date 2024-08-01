import { tv } from 'tailwind-variants';

export const iconStyles = tv({
    base: 'p-3 rounded-full bg-[#393C49] text-[#007AFF] transition duration-200',
    variants: {
        cursor: {
            pointer: 'cursor-pointer',
        },
        size: {
            sm: 'text-[24px]',
            md: 'text-[36px]',
            lg: 'text-[48px]',
            xl: 'text-[60px]',
        },
        bg: {
            gray: 'bg-[#393C49]',
        },
        text: {
            white: 'text-[#007AFF]',
            gray: 'text-[#909090]',
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
            blue: 'hover:bg-blue-400',
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
