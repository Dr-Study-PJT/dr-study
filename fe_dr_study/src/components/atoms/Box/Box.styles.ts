import { tv } from 'tailwind-variants';

export const boxStyles = tv({
    base: 'w-full',
    variants: {
        variant: {
            navigation:
                'fixed flex items-center content-center p-[10px] bg-[#262627] fixed top-0 h-[3rem]',
            createStudyGroupStepBox:
                'w-1/2 p-[55px] flex flex-col justify-center items-center text-center bg-[#282B30] rounded-[10px] border border-white ',
            createAiStepBox:
                'w-full p-[55px] flex flex-col justify-center items-center text-center bg-[#282B30] rounded-[10px] border border-white ',
        },
        color: {
            primary: 'text-blue-500',
            secondary: 'text-purple-500',
            success: 'text-green-500',
            danger: 'text-red-500',
            black: 'text-black',
            white: 'text-white', // 흰 글씨 추가
        },
    },
    compoundVariants: [],
    defaultVariants: {},
});
