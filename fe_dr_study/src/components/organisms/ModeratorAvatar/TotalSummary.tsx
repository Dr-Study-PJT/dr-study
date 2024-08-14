import React, { useEffect, useRef, useState } from 'react';
import OpenTotalSummaryButton from './OpenTotalSummaryButton';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export const TotalSummary = ({}: {}) => {
    // 상태: 요약 메시지 창 열림 여부
    const [isSummaryMessagesOpen, setIsSummaryMessagesOpen] =
        useState<boolean>(false);

    // Redux에서 요약 메시지 가져오기
    const summaryMessages = useSelector(
        (state: RootState) => state.summaryMessagesSlice.summaryMessages,
    );

    const messageBoxRef = useRef<HTMLUListElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // 메시지 박스 스크롤을 아래로 이동
    const scrollToBottom = () => {
        if (messageBoxRef.current) {
            messageBoxRef.current.scrollTop =
                messageBoxRef.current.scrollHeight;
        }
    };

    // 요약 메시지 창 토글 함수
    const toggleSummaryMessagesOpen = (
        e: React.MouseEvent<HTMLButtonElement>,
    ) => {
        e.stopPropagation(); // 클릭 이벤트 전파 방지
        setIsSummaryMessagesOpen((prev) => !prev); // 상태 반전
    };

    // 요약 메시지 창이 열릴 때 스크롤 아래로 이동
    useEffect(() => {
        scrollToBottom();
    }, [isSummaryMessagesOpen]);

    // 외부 클릭 시 요약 메시지 창 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                messageBoxRef.current &&
                !messageBoxRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsSummaryMessagesOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="text-white ">
            <p
                className={`${!isSummaryMessagesOpen && 'hidden'} absolute left-[50%] translate-x-[-50%] top-[15%] text-dr-body-3 font-semibold mb-4`}
            >
                스터디 진행 요약
            </p>
            <ul
                ref={messageBoxRef}
                className={`${!isSummaryMessagesOpen && 'hidden'} animate-fadeIn absolute top-[50%] left-[50%] h-[60%] w-[40%] translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-lg shadow-lg bg-dr-indigo-300 bg-opacity-80  p-4 z-50`}
            >
                <li className="space-y-2 mt-14">
                    {summaryMessages.map((item, index) => (
                        <div
                            key={index}
                            className="bg-dr-indigo-500 bg-opacity-80 hover:bg-dr-indigo-300 transition duration-200 p-3 rounded-lg shadow-md"
                        >
                            <p className="text-dr-body-4 text-slate-400">
                                {item.time}
                            </p>
                            <p className="text-dr-body-4 text-slate-200">
                                {item.message}
                            </p>
                        </div>
                    ))}
                </li>
            </ul>
            <button
                ref={buttonRef}
                className="fixed bottom-[11.5%] left-[1rem] bg-dr-black bg-opacity-40 rounded-md"
                onClick={(e) => {
                    toggleSummaryMessagesOpen(e);
                }}
            >
                <OpenTotalSummaryButton
                    prevSummary={`${summaryMessages[summaryMessages.length - 1]?.message.slice(0, 10)}`}
                />
            </button>
        </div>
    );
};

export default TotalSummary;
