// src/components/atoms/Input/Input.styles.ts
import { tv } from 'tailwind-variants';

export const inputStyles = tv({
    base: 'px-1 mb-1 py-2 text-dr-body-4 border-b-2 border-gray-700 rounded-t-md0 focus:!bg-dr-indigo-100 rounded-t-md bg-transparent focus:outline-none focus:border-blue-500 transition-colors duration-200',
    variants: {
        inputSize: {
            sm: 'text-dr-body-5 py-1',
            md: 'text-dr-body-4 py-2',
            lg: 'text-dr-body-3 py-3',
        },
        fullWidth: {
            true: 'w-full',
            false: 'w-auto',
        },
    },
    defaultVariants: {
        inputSize: 'md',
        fullWidth: true,
    },
});
