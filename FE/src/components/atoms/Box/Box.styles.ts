import { tv } from 'tailwind-variants';

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
            // 메인페이지
            home: 'flex justify-center h-[calc(100vh-93px)] ml-[119px] overflow-y-auto bg-[#383B40]',

            mainTop: 'h-[560px] bg-red-500 flex flex-col justify-center items-center',
            mainTopCenterContents:
            '', 
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
                'w-[496px] h-[676px] flex flex-col justify-between justify-center items-center bg-[#282B30] ',

            createSuccessExceptForButton:
                'w-[496px] h-[583px] p-[63px_121px]  flex flex-col justify-between justify-center items-center bg-[#282B30]',

            createSuccessWhole:
                'w-[496px] h-[676px] flex flex-col items-center justify-center',
            createSuccessTop:
                'w-[323px] h-[239px] flex flex-col justify-between items-center gap-[40px]',
            createSuccessBottom:
                'w-[496px] h-[264px] p-[0px_40px] flex flex-col justify-between gap-[24px]',

            createSuccessBottomMesssageContainer:
                'w-[416px] h-[77px] gap-[8px]',
            createSuccessBottomMesssage:
                'w-[416px] h-[48px] rounded-[8px] border border-[#007AFF] p-[12px_12px_12px_16px] gap-[8px]',
            createSuccessBottomDescriptionContainer:
                'w-[416px] h-[163px] gap-[8px]',
            createSuccessBottomDescription:
                'w-[416px] h-[134px] rounded-[8px] border border-[#007AFF] p-[12px_16px_12px_16px] gap-[8px]',
            createSuccessButton:
                'flex flex-row justify-between w-[416px] h-[53px] gap-[24px]',
            // 로딩 관련
            LoadingBox:
                'flex justify-center items-center w-[737px] h-[823px] rounded-[10px] border border-[1px] border-[#FFFFFF] p-[63px_121px] gap-[10px] bg-[#282B30]',
            LoadingContents:
                'flex flex-col justify-between items-center w-[495px] h-[287.5px], gap-[98px]',
            // 메인 페이지 내부 UI
            mainPageTop: 'w-[1315px] h-[560px]  bg-black',
            mainPageBottom:
            'w-[1151px] h-[1979px] flex flex-col',
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
