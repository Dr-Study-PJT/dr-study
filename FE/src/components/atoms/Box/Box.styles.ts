import { tv } from 'tailwind-variants';
import LoadingAndResult from '../../organisms/LoadingAndResult/LoadingAndResult';
import CreateFailBottom from '../../molecules/CreateFailBottom/CreateFailBottom';

export const boxStyles = tv({
    base: 'w-full',
    variants: {
        variant: {
            navigation:
                'h-[93px] flex items-center content-center p-[10px] bg-[#262627]',
            createStudyGroupStepBox:
                'w-1/2 p-[55px] flex flex-col justify-center items-center text-center bg-[#282B30] rounded-[10px] border border-white ',
            createAiStepBox:
                'w-full p-[55px] flex flex-col justify-center items-center text-center bg-[#282B30] rounded-[10px] border border-white ',
            sideBar:
                'w-[119px] h-[calc(100vh-93px)] fixed top-[93px] bg-[#262627] overflow-y-auto', // 개별 스크롤바 추가
            main: 'px-[288px] py-[63.5px] flex justify-center items-center h-[calc(100vh-93px)] ml-[119px] overflow-y-auto bg-[#383B40]', // 개별 스크롤바 추가
            createError:
                'w-[738px] h-[685px] p-[63px_121px]  flex flex-col justify-between justify-center items-center bg-[#282B30] border border-white rounded-[10px] ',
            //생성 실패
            createErrorContainer:
                'w-[496px] h-[559px] flex flex-col justify-between justify-center items-center ',
            CreateFailTop:
                'w-[323px] h-[239px] flex flex-col items-center justify-center gap-[40px]',
            CreateFailBottom:
                'w-[496px] h-[240px] p-[0px_40px] flex flex-col justify-between gap-[24px]',
            createFailBottomMessage:
                'w-[416px] h-[134px] rounded-[8px] border border-[#E74A3B] p-[12px_16px_12px_16px] gap-[8px] text-white text-[16px]',
            Lottie: 'flex items-center justify-center w-[160px] h-[140px]',
            // 생성 성공
            createSuccessOuter:
                'w-[738px] h-[802px] p-[63px_121px]  flex flex-col justify-between justify-center items-center bg-[#282B30] border border-white rounded-[10px] ',
            createSuccessInner:
                'w-[496px] h-[676px] p-[63px_121px]  flex flex-col justify-between justify-center items-center bg-[#282B30] border border-white rounded-[10px] ',

            createSuccessExceptForButton:
                'w-[496px] h-[583px] p-[63px_121px]  flex flex-col justify-between justify-center items-center bg-[#282B30] border border-white rounded-[10px] ',

            createSuccessTop:
                'w-[323px] h-[239px] flex flex-col items-center justify-center gap-[40px]',
            createSuccessBottom:
                'w-[496px] h-[264px] p-[0px_40px] flex flex-col justify-between gap-[24px]',

            createSuccessButton:
                'w-[416px] h-[53px] p-[63px_121px]  flex justify-between bg-[#282B30] gap-[24px]',
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
