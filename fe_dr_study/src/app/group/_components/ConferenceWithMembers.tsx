'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/atoms';
import { IConference } from '../[group_id]/dummy';

interface ListConferenceTodayProps {
    conferences: IConference[];
}

const ListConferenceToday: React.FC<ListConferenceTodayProps> = ({
    conferences,
}) => {
    const router = useRouter();

    const handleConferenceClick = (conferenceId: number) => {
        alert(
            `컨퍼런스ID : ${conferenceId} \n컨퍼런스 PDP 정보 모달로 띄워주는 창 구현해야함`,
        );
    };

    const handleJoinConferenceClick = (
        e: React.MouseEvent<HTMLElement>,
        conferenceId: number,
    ) => {
        e.stopPropagation();
        router.push(`/conference/${conferenceId}`);
    };

    return (
        <div className="LIST-CONFERENCE-TODAY space-y-4">
            {conferences?.map((conference, index) => (
                <div
                    key={index}
                    onClick={() => handleConferenceClick(conference.id)}
                    className={`CONFERENCE-CARD h-max min-h-32 p-6 rounded-lg shadow-md cursor-pointer transition-colors duration-200 ${
                        conference.finishTime
                            ? 'bg-[#212534] hover:bg-[#2125347c]'
                            : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                >
                    <div className="flex flex-col justify-between mb-2">
                        <div className="text-white font-bold text-lg">
                            {conference.title}
                        </div>
                        <div className="text-dr-gray-100 text-dr-body-4">
                            {conference.finishTime
                                ? `${conference.startTime} ~ ${conference.finishTime} | 종료`
                                : `${conference.startTime} ~ 진행 중`}
                        </div>
                    </div>
                    <div className="mt-4 w-full flex flex-row justify-between items-end">
                        <div className="BL-INFO-MEMBER-LIST flex flex-col gap-1">
                            <div className="text-dr-body-4 text-dr-gray-100">
                                {`${conference.participants.length} / 8`}
                            </div>
                            <ul className="LIST-MEMBER-IMAGES flex flex-row gap-1">
                                {conference.participants
                                    .slice(0, 3)
                                    .map((participant, i) => (
                                        <li key={i}>
                                            <div className="relative overflow-hidden w-10 h-10 rounded-xl">
                                                <Image
                                                    alt="avatar"
                                                    src={`/images/member_thumbnail_${participant.id}.png`}
                                                    layout="fill"
                                                />
                                            </div>
                                        </li>
                                    ))}
                                {(conference?.participants?.length as number) >
                                    3 && (
                                    <li key="extra">
                                        <button className="relative overflow-hidden w-10 h-10 rounded-xl border-[1px] border-dr-coral-100 bg-dr-coral-200 hover:bg-dr-coral-100 transition-colors duration-200 flex items-center justify-center">
                                            <span className="text-white font-semibold text-dr-body-3">
                                                +
                                                {(conference?.participants
                                                    ?.length as number) - 3}
                                            </span>
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                        {!conference.finishTime && (
                            <Button
                                classNameStyles="!h-8 bg-dr-coral-100"
                                onClick={(e) =>
                                    handleJoinConferenceClick(e, conference.id)
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
