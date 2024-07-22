import { tv } from 'tailwind-variants';

export const sideBarButtonStyles = tv({
    base: 'relative cursor-pointer w-full',
    variants: {
        live: {
            true: '',
            false: '',
        },
    },
    compoundVariants: [
        {
            live: true,
            class: 'bg-gradient-to-t from-black to-transparent h-full',
        },
    ],
    defaultVariants: {},
});
