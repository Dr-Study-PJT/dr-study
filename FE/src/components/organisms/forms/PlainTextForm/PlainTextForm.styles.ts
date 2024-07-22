import { tv } from 'tailwind-variants';

export const PlainTextFormStyles = tv({
    base: 'w-full',
    variants: {
        variant: {
            input: 'w-full p-3 bg-[#282B30] rounded-[5px] border border-[#555] focus:outline-none focus:border-[#888]',
            textarea:
                'w-full p-3 bg-[#282B30] rounded-[5px] border border-[#555] h-[150px] resize-none focus:outline-none focus:border-[#888]',
            button: 'w-full py-3 bg-[#3B82F6] text-white rounded-[5px] hover:bg-[#2563EB] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3B82F6]',
            label: 'block mb-2 text-[#CCC] font-medium',
            error: 'mt-2 text-red-500 text-sm',
        },
        color: {
            primary: 'text-blue-500',
            secondary: 'text-purple-500',
            success: 'text-green-500',
            danger: 'text-red-500',
            black: 'text-black',
            white: 'text-white',
        },
    },
    compoundVariants: [],
    defaultVariants: {},
});
