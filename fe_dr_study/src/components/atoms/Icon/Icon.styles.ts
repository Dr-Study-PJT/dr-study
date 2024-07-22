import { tv } from 'tailwind-variants';

export const iconStyles = tv({
    base: 'p-3 rounded-full',
    variants: {
        size: {
            sm: 'text-[24px]',
            md: 'text-[36px]',
            lg: 'text-[48px]',
            xl: 'text-[60px]',
        },
        bg: {
            active: '#007AFF', // active 상태의 배경색
            inactive: '#393C49', // 비활성 상태의 배경색
        },
        text: {
            active: 'text-white', // active 상태의 글자색
            inactive: 'text-[#007AFF]', // 비활성 상태의 글자색
        },
        active: {
            true: '',
            false: '',
        },
    },
    compoundVariants: [
        {
            active: true,
            class: 'bg-[#007AFF] text-white',
        },
        {
            active: false,
            class: 'bg-[#393C49] text-[#007AFF]',
        },
    ],
    defaultVariants: {
        bg: 'inactive',
        text: 'inactive',
        active: false,
    },
});
