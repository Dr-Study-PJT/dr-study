'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/atoms';
import { IConference } from '../../[group_id]/dummy';
import { formatDate, getDateTimePart } from '@/utils/date';
import { getSessionStorageItem } from '@/utils/sessionStorage';
import Link from 'next/link';
import ConferenceMemberList from '../ConferenceMemberList';
import Image from 'next/image';

interface ListConferenceTodayProps {
    conferences: IConference[];
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

const ListConferenceHistoryContent: React.FC<ListConferenceTodayProps> = ({
    conferences,
}) => {
    const router = useRouter();
    const [todayConferences, setHistoryConferences] = useState<IConference[]>(
        [],
    );

    const memberData = getSessionStorageItem('memberData');

    useEffect(() => {
        const filteredConferences = conferences?.filter(
            (conference) => conference.closeTime !== null,
        );

        setHistoryConferences(filteredConferences);
    }, [conferences]);

    const handleConferenceClick = (conference: IConference) => {
        const isSOpenedConference = conference.openTime;

        if (isSOpenedConference) {
            router.push(`/conference/${conference.id}/waiting-room`);
        } else if (!isSOpenedConference && memberData.id == conference.hostId) {
            router.push(`/conference/${conference.id}/info`);
        } else {
            router.push(`/conference/${conference.id}/waiting-room`);
        }
    };

    return (
        <div className="LIST-CONFERENCE-HISTORY space-y-4">
            {todayConferences.length > 0 ? (
                todayConferences.map((conference, index) => (
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
                        </div>
                    </div>
                ))
            ) : (
                <div className="NO-CONFERENCE-CARD h-max min-h-32 p-6 rounded-lg shadow-md text-dr-header-1 font-bold bg-[#212534] text-dr-gray-200 flex items-center justify-center cursor-default hover:bg-[#2125347c] transition-colors duration-200">
                    완료된 스터디 이력이 없어요.
                </div>
            )}
        </div>
    );
};

export default ListConferenceHistoryContent;
