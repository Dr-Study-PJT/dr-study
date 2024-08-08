'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/atoms';
import { IConference } from '../[group_id]/dummy';
import { formatDate, getDateTimePart } from '@/utils/date';
import { FaUsers } from 'react-icons/fa';

interface ListConferenceTodayProps {
    conferences: IConference[];
    isMember: boolean;
}

export const getConferenceCardClass = (conference: IConference) => {
    if (conference.finishTime) {
        return 'bg-[#212534] hover:bg-[#2125347c]';
    } else if (conference.openTime && !conference.startTime) {
        return 'bg-blue-500 hover:bg-blue-600';
    } else if (
        conference.openTime &&
        conference.startTime &&
        !conference.closeTime
    ) {
        return 'bg-blue-500 hover:bg-blue-600';
    } else {
        return 'bg-[#212534] hover:bg-[#2125347c]';
    }
};

export const renderTimeInfo = (conference: IConference) => {
    const { openTime, startTime, closeTime, finishTime } = conference;
    const timeInfo = [];

    if (openTime)
        timeInfo.push(`${getDateTimePart(formatDate(openTime), 'time')} 개회`);
    if (startTime)
        timeInfo.push(`${getDateTimePart(formatDate(startTime), 'time')} 시작`);
    if (closeTime)
        timeInfo.push(`${getDateTimePart(formatDate(closeTime), 'time')} 폐회`);
    if (finishTime)
        timeInfo.push(
            `${getDateTimePart(formatDate(finishTime), 'time')} 종료`,
        );
    if (!openTime && !startTime && !closeTime && !finishTime)
        timeInfo.push('예정된 컨퍼런스');

    return timeInfo.join(' ~ ');
};

const ListConferenceToday: React.FC<ListConferenceTodayProps> = ({
    conferences,
    isMember,
}) => {
    const router = useRouter();
    const [todayConferences, setTodayConferences] = useState<IConference[]>([]);

    useEffect(() => {
        console.log('conferences:', conferences);
        const filteredConferences = conferences?.filter(
            (conference) => !conference.closeTime,
        );
        console.log('filteredConferences:', filteredConferences);

        setTodayConferences(filteredConferences);
    }, [conferences]);

    const handleConferenceClick = (conferenceId: number) => {
        router.push(`/conference/${conferenceId}/waiting-room`);
    };

    const handleJoinConferenceClick = (
        e: React.MouseEvent<HTMLElement>,
        conferenceId: number,
    ) => {
        e.stopPropagation();
        router.push(`/conference/${conferenceId}/waiting-room`);
    };

    return (
        <div className="LIST-CONFERENCE-TODAY space-y-4">
            {todayConferences?.map((conference, index) => (
                <div
                    key={index}
                    onClick={() => handleConferenceClick(conference.id)}
                    className={`CONFERENCE-CARD h-max min-h-32 p-6 rounded-lg shadow-md cursor-pointer transition-colors duration-200 ${getConferenceCardClass(conference)}`}
                >
                    <div className="flex flex-col justify-between mb-2">
                        <div className="text-white font-bold text-lg">
                            {conference.title}
                        </div>
                        <div className="text-dr-gray-100 text-dr-body-4">
                            {renderTimeInfo(conference)}
                        </div>
                    </div>

                    <div className="mt-4 w-full flex flex-row justify-between items-end">
                        <div className="BL-INFO-MEMBER-LIST flex flex-col gap-1">
                            <div className="flex flex-row gap-1 text-dr-gray-300">
                                <FaUsers className="text-dr-gray-300 text-dr-body-3 self-center pb-0" />
                                <div className="text-dr-body-4 text-dr-gray-300">
                                    {`${conference.participants.length} / ${conference.memberCapacity}`}
                                </div>
                            </div>

                            <ul className="LIST-MEMBER-IMAGES flex flex-row gap-1">
                                {conference.participants
                                    .slice(0, 3)
                                    .map((participant, i) => (
                                        <li key={i}>
                                            <div className="relative overflow-hidden w-10 h-10 rounded-xl">
                                                <Image
                                                    alt="avatar"
                                                    src={participant.imageUrl}
                                                    layout="fill"
                                                />
                                            </div>
                                        </li>
                                    ))}
                                {conference.participants.length > 3 && (
                                    <li key="extra">
                                        <button className="relative overflow-hidden w-10 h-10 rounded-xl border-[1px] border-dr-coral-100 bg-dr-coral-200 hover:bg-dr-coral-100 transition-colors duration-200 flex items-center justify-center">
                                            <span className="text-white font-semibold text-dr-body-3">
                                                +
                                                {conference.participants
                                                    .length - 3}
                                            </span>
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                        {conference?.openTime &&
                            !conference?.startTime &&
                            !conference?.finishTime &&
                            isMember && (
                                <Button
                                    classNameStyles="!h-8 bg-dr-coral-100"
                                    onClick={(e) =>
                                        handleJoinConferenceClick(
                                            e,
                                            conference.id,
                                        )
                                    }
                                >
                                    스터디 참여
                                </Button>
                            )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListConferenceToday;
