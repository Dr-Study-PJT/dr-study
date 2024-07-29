import { tv } from 'tailwind-variants';

export const logoStyles = tv({
    base: '',
    variants: {
        size: {
            sm: 'w-4 h-4',
            md: 'w-6 h-6',
            lg: 'w-8 h-8',
            xl: 'w-10 h-10',
        },
    },
    compoundVariants: [
        // {
        //   active: true,
        //   class: 'bg-blue-500 text-white',
        // },
    ],
    defaultVariants: {},
});
