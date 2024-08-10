import { IConference } from '@/app/group/[group_id]/dummy';
import { ConferenceParticipantList } from '@/app/group/_components/ListConferenceTodays';
import Image from 'next/image';
import React from 'react';

interface ConferenceListProps {
    conferences: IConference[] | null;
}

const ConferenceList = ({ conferences }: ConferenceListProps) => {
    console.log('conferences => ', conferences);

    if (!conferences) {
        return <div>데이터가 없습니다.</div>;
    }

    const formatDateTime = (dateString: any) => {
        const options: {
            year: 'numeric' | '2-digit';
            month: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
            day: 'numeric' | '2-digit';
            hour: 'numeric' | '2-digit';
            minute: 'numeric' | '2-digit';
            hour12: boolean;
        } = {
            year: 'numeric', // '2-digit' 또는 'numeric' 중 하나로 설정
            month: '2-digit', // '2-digit', 'numeric', 'long', 'short', 'narrow' 중 하나로 설정
            day: '2-digit', // '2-digit' 또는 'numeric' 중 하나로 설정
            hour: '2-digit', // '2-digit' 또는 'numeric' 중 하나로 설정
            minute: '2-digit', // '2-digit' 또는 'numeric' 중 하나로 설정
            hour12: false, // true 또는 false
        };

        return new Date(dateString).toLocaleString('ko-KR', options);
    };

    return (
        <div className="flex flex-col w-full p-[2rem] text-dr-white rounded-lg gap-dr-30">
            <p className="text-center text-dr-header-2">종료된 컨퍼런스</p>
            <div className="flex pb-[1.5rem] gap-dr-30 overflow-x-scroll">
                {conferences.map((conference) => (
                    <div className="min-w-[15rem] shadow-2xl hover:bg-dr-indigo-0 rounded-lg duration-200">
                        <div
                            key={conference.id}
                            className=" relative flex flex-col items-center w-full h-[7rem] bg-dr-indigo-500 rounded-tr-lg rounded-tl-lg "
                        >
                            <div className="absolute bottom-[0] left-[50%] translate-x-[-50%] translate-y-[50%] w-[6rem] h-[6rem] rounded-full overflow-hidden">
                                <Image
                                    src={conference.imageUrl}
                                    alt="conference image"
                                    fill
                                />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center pt-[3.5rem] px-[1rem]">
                            <div className="text-dr-header-2 font-semibold">
                                {conference.title}
                            </div>
                            <div className="flex text-dr-body-4 text-dr-gray-300">
                                <div>
                                    {formatDateTime(conference?.openTime) ||
                                        '24. 01. 01. 00:00'}{' '}
                                    ~{' '}
                                    {formatDateTime(conference?.finishTime) ||
                                        '24. 01. 01. 00:00'}
                                </div>
                            </div>
                            <div className="pt-[1rem]">
                                <ConferenceParticipantList
                                    conference={conference}
                                    isNameVisible
                                />
                            </div>
                            <div className="text-dr-body-4 py-[1rem] text-center">
                                <p className="text-dr-body-4 font-semibold">
                                    컨퍼런스 주제
                                </p>
                                {conference.subject}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConferenceList;
