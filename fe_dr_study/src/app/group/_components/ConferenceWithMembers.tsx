'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/atoms';
import { IConference } from '../[group_id]/dummy';
import { formatDate, getDateTimePart } from '@/utils/date';
import { getSessionStorageItem } from '@/utils/sessionStorage';
import ConferenceMemberList from './ConferenceMemberList';

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

    const memberData = getSessionStorageItem('memberData');

    useEffect(() => {
        const filteredConferences = conferences?.filter(
            (conference) => !conference.closeTime,
        );

        setTodayConferences(filteredConferences);
    }, [conferences]);

    const handleConferenceClick = (conference: IConference) => {
        const isStartedConference = conference.startTime;

        if (!isStartedConference && memberData.id == conference.hostId) {
            router.push(`/conference/${conference.id}/info`);
            return;
        }

        router.push(`/conference/${conference.id}/waiting-room`);
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
                    onClick={() => handleConferenceClick(conference)}
                    className={`CONFERENCE-CARD h-max min-h-32 p-6 rounded-lg shadow-md cursor-pointer transition-colors duration-200 ${getConferenceCardClass(conference)}`}
                >
                    <div className="flex flex-col justify-between mb-2">
                        <div className="text-white font-bold text-lg">
                            {conference.title}
                        </div>
                        <div className="text-dr-gray-200 text-dr-body-4">
                            {renderTimeInfo(conference)}
                        </div>
                    </div>

                    <div className="mt-4 w-full flex flex-row justify-between items-end">
                        <ConferenceMemberList
                            participants={conference.participants}
                            memberCapacity={conference.memberCapacity}
                        />
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
