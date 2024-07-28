import { tv } from 'tailwind-variants';

export const pageContainerStyles = tv({
    base: 'p-[2.5rem] w-full h-full min-h-[calc(100vh-3rem)] flex items-center justify-center',
    variants: {
        variant: {},
        bg: {
            gray: 'b-[#36393E]',
        },
    },
    compoundVariants: [],
    defaultVariants: {
        bg: 'gray',
    },
});
