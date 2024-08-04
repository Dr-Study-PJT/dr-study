import { tv } from 'tailwind-variants';

export const pageContainerStyles = tv({
    base: 'p-[2.5rem] w-full h-full min-h-[calc(100vh-3rem)] flex items-center justify-center',
    variants: {
        variant: {},
        bg: {
            dark: 'bg-dr-dark-300',
            gray: 'bg-dr-gray-500',
        },
    },
    compoundVariants: [],
    defaultVariants: {
        bg: 'gray',
    },
});
