import { SummaryMessageInterface } from '@/components/template/conference/ConferenceTemplate';
import React, { useEffect, useRef, useState } from 'react';
import OpenTotalSummaryButton from './OpenTotalSummaryButton';

export const TotalSummary = ({
    summaryMessages,
}: {
    summaryMessages: SummaryMessageInterface[];
}) => {
    const [isSummaryMessagesOpen, setIsSummaryMessagesOpen] =
        useState<boolean>(false);

    const messageBoxRef = useRef<HTMLUListElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const scrollToBottom = () => {
        if (messageBoxRef.current) {
            messageBoxRef.current.scrollTop =
                messageBoxRef.current.scrollHeight;
        }
    };

    const toggleSummaryMessagesOpen = (
        e: React.MouseEvent<HTMLButtonElement>,
    ) => {
        e.stopPropagation();

        setIsSummaryMessagesOpen((prev) => !prev);
    };

    useEffect(() => {
        scrollToBottom();
    }, [isSummaryMessagesOpen]);

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
        <div className="text-white">
            <ul
                ref={messageBoxRef}
                className={`${!isSummaryMessagesOpen && 'hidden'} absolute top-[50%] left-[50%] h-[75%] w-[60%] translate-x-[-50%] translate-y-[-50%] overflow-y-scroll rounded-lg shadow-lg bg-dr-indigo-500 bg-opacity-80  p-4`}
            >
                <li className="space-y-2">
                    {summaryMessages.map((item, index) => (
                        <div
                            key={index}
                            className="bg-dr-indigo-500 bg-opacity-80 hover:bg-dr-indigo-300 transition duration-200 p-3 rounded-lg shadow-md"
                        >
                            <p className="text-dr-body-4">{item.time}</p>
                            <p className="text-dr-body-3">{item.message}</p>
                        </div>
                    ))}
                </li>
            </ul>
            <button
                ref={buttonRef}
                className="fixed bottom-[11.5%] left-[1rem] bg-dr-black bg-opacity-40 rounded-full"
                onClick={(e) => {
                    toggleSummaryMessagesOpen(e);
                }}
            >
                <OpenTotalSummaryButton />
            </button>
            <p
                className={`${!isSummaryMessagesOpen && 'hidden'} absolute left-[50%] translate-x-[-50%] top-[15%]`}
            >
                사회 진행 요약
            </p>
        </div>
    );
};

export default TotalSummary;
