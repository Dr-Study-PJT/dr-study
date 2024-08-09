import { IConference } from '@/app/group/[group_id]/dummy';
import { ConferenceParticipantList } from '@/app/group/_components/ConferenceWithMembers';
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
        const options = {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, // 24시간 형식
        };
        return new Date(dateString).toLocaleString('ko-KR', options);
    };

    return (
        <div className="flex flex-col w-full p-[2rem] text-dr-white rounded-lg gap-dr-30 overflow-hidden">
            <p className="text-center text-dr-header-2">종료된 컨퍼런스</p>
            <div className="flex gap-dr-30 overflow-x-scroll">
                {conferences.map((conference) => (
                    <div className="shadow-2xl hover:bg-dr-indigo-0 rounded-lg duration-200">
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
