import { tv } from 'tailwind-variants';

export const textareaStyles = tv({
    base: 'px-1 mb-1 p-3 text-dr-body-4 rounded-t-md !bg-dr-indigo-200 border-b-2 border-gray-700 bg-transparent focus:!bg-dr-indigo-100 focus:outline-none focus:border-blue-500 transition-colors duration-200',
    variants: {
        textareaSize: {
            sm: 'text-dr-body-5 py-1 h-12',
            md: 'text-dr-body-5 py-2 h-24',
            lg: 'text-dr-body-4 py-3 h-32',
        },
        fullWidth: {
            true: 'w-full',
            false: 'w-auto',
        },
    },
    defaultVariants: {
        textareaSize: 'md',
        fullWidth: true,
    },
});
