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
            // 이거 나중에 우측 섹션
            articleDetail:
                'w-1/2 space-y-8 p-[55px] flex flex-col justify-center items-center text-center bg-[#282B30] rounded-[10px] border border-white',
            articleContainer:
                'w-full flew flew-col flex-between items-center bg-[#282B30]  ',
            articleElement:
                'w-full flex flex -col flex-between bg-[#282B30] rounded-[10px] border border-white ',
            articlePagination:
                'w-full flex flex-row text-center bg-[#232323] p-[20px]',
            articleModal:
                'w-full p-[55px] flex flex-col justify-center items-center text-center bg-[#282B30] rounded-[10px] border border-white',
            articleTitleSection:
                'w-full flex flex-col justify-center items-center text-center ',
            articleDetailTitleSection:
                'w-full flex flex-col justify-center items-center text-center ',

            // 이거 케이스 2개로 나눠서 정적이게 넣을거임(생성 모달이랑, PDP모달 ㅇㅇ)
            //
            articleContentsSection:
                'w-full flex flex-row space-y-8 bg-[#282B30] rounded-[10px] border border-[#0E78F9] px-4 py-2',
            articleCommentsContainer: 'w-full flex flex-col justify-between  ',

            //

            progressBar: 'w-full border-t border-[#5E658B]',

            //

            articleProfile:
                'w-full flex flex-row justify-center justify-between ',
            articleComment:
                'w-full flex flex-col justify-center items-center p-[20px]  ',

            //

            commentCreateContainer:
                'w-full flex flex-row justify-center justify-between',

            //

            articleButtonContainer:
                'w-full flex flex-row justify-center  justify-end gap-x-2 ',
            //
            articleCreateAtAndViews:
                'w-full flex flex-row justify-end gap-x-2 ',
            articleDescriptionContainer:
                'w-full flex flex-wrap rounded-[8px] border border-[#007AFF] p-[12px_16px_12px_16px] gap-[8px]',
            // 대쉬보드 PDP 박스 스타일

            // 대쉬보드 POP에 들어갈 댓글들이 들어갈 박스 ㅇㅇ
            articleCommentsListContainer:
                'w-full flex flex-col justify-center items-center p-[20px]',
            // 각 댓글에 들어가야할 박스들...(=comment 덩어리 하나!)
            commentPDP: 'w-full flex flex-col justify-center items-center ', // comment에
            commentPDPHeader: 'w-full flex flex-row justify-between',
            commentProfileLeft: 'w-full flex flex-row items-start gap-x-2',
            commentProfileWithNickAndTime: 'flex flex-col items-start p-[5px]',
            commentText:
                'w-full flex flex-wrap rounded-[8px] border border-[#007AFF] p-[12px_16px_12px_16px] gap-[8px]',
            // 아래는 그냥 클릭하면 드롭박스 나오게 할거임.
            // commentProfileWithEdit:
            //  'w-full flex flex-col ',
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
