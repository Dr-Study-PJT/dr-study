'use client';

import { Button } from '@/components/atoms';
import HrLine from '@/components/atoms/HrLine/HrLine';
import ToolTip from '@/components/atoms/Tooltip/ToolTip';
import MeetingIdBox from '@/components/molecules/MeetingIdBox/MeetingIdBox';
import InviteMembersBox from '@/components/organisms/InviteMembersBox/InviteMembersBox';
import SelectModeratorBox from '@/components/organisms/SelectModeratorBox/SelectModeratorBox';
import { ConferenceData, ConferenceMember } from '@/interfaces/conference';
import { Moderator } from '@/interfaces/moderator';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ConferenceInfoProps {
    memberData: any; // any 타입 수정 !필요!
    conferenceId: number; // 회의 ID
    conferenceData: ConferenceData | null; // 회의 데이터
    moderators: Moderator[]; // 사회자 리스트
    studyMembers: ConferenceMember[]; // 스터디 멤버 리스트
    handleOpenConference: (moderator: Moderator) => void; // 컨퍼런스 개최 함수
}

const ConferenceInfoTemplate = ({
    memberData,
    conferenceId,
    conferenceData,
    moderators,
    studyMembers,
    handleOpenConference,
}: ConferenceInfoProps) => {
    console.log(conferenceData);
    const [isMemberInvited, setIsMemberInvited] = useState<boolean>(false); // 멤버 초대 여부
    // const [isClosedConference, setIsClosedConference] = useState<boolean>(
    //     (!conferenceData && true) || false,
    // ); // 컨퍼런스 종료 여부

    const [selectedModerator, setSelectedModerator] =
        useState<Moderator | null>(null);
    const [isModeratorSelected, setIsModeratorInvited] =
        useState<boolean>(false); // 사회자 선택 여부
    const [currentTime, setCurrentTime] = useState('0000. 0. 0. 오후 0:00:00');

    return (
        <div className="flex items-center justify-center p-[6rem] bg-dr-indigo-200 text-dr-white ">
            <div className="flex flex-col gap-dr-5 w-full h-full border-2 border-dr-gray-500 p-4 rounded-md p-[2rem] max-w-[50rem] ">
                <div className="flex">
                    <div className="flex-1 rounded-lg">
                        <h2 className="text-dr-header-3 font-bold mb-2 text-dr-primary ">
                            {conferenceData?.title}
                        </h2>
                        <div className="flex flex-col gap-3 text-dr-body-1">
                            <p className="text-dr-body-4 text-dr-gray-300">
                                <span>
                                    {(conferenceData?.startTime &&
                                        new Date(
                                            conferenceData.startTime,
                                        ).toLocaleTimeString()) ||
                                        currentTime}{' '}
                                    |{' '}
                                    {(conferenceData?.finishTime &&
                                        new Date(
                                            conferenceData.finishTime,
                                        ).toLocaleTimeString()) ||
                                        currentTime}{' '}
                                </span>
                            </p>
                            <div className="relative w-[10rem] h-[10rem] rounded-lg overflow-hidden">
                                <Image
                                    src={'/images/group_thumbnail_1.png'}
                                    alt={'group-thumbnail'}
                                    fill
                                />
                            </div>
                            <p className="text-dr-body-3">
                                <span className="">컨퍼런스 주제:</span>{' '}
                                {conferenceData?.subject}
                            </p>
                        </div>
                    </div>
                </div>
                <HrLine />
                <MeetingIdBox>
                    {conferenceData?.id
                        ? `${process.env.NEXT_PUBLIC_HOST}/conference/${conferenceData.id}`
                        : 'Conference URL'}
                </MeetingIdBox>

                <HrLine />

                <SelectModeratorBox
                    moderators={moderators}
                    setIsModeratorInvited={setIsModeratorInvited}
                    selectedModerator={selectedModerator}
                    setSelectedModerator={setSelectedModerator}
                />

                <HrLine />
                <InviteMembersBox
                    memberData={memberData}
                    members={studyMembers}
                    conferenceId={conferenceId}
                    setIsMemberInvited={setIsMemberInvited}
                    capacity={conferenceData?.memberCapacity}
                />
                <HrLine />
                <div className="py-[1rem]">
                    <Button
                        onClick={() =>
                            handleOpenConference(selectedModerator as Moderator)
                        }
                        color={`${isMemberInvited && isModeratorSelected ? 'coral' : 'gray'}`}
                        disabled={!isMemberInvited && !isModeratorSelected}
                        size="lg"
                        classNameStyles={`relative group ${!isMemberInvited ? 'cursor-not-allowed' : ''}`}
                    >
                        컨퍼런스 개최
                        <div className="text-start absolute top-[-0.25rem] hidden group-hover:block bg-black text-white text-dr-body-4 rounded -mt-10 left-[100%] transform -translate-x-1/2 whitespace-nowrap">
                            {!isMemberInvited && (
                                <ToolTip
                                    isVisible={!isMemberInvited}
                                    content="- 한 명 이상 초대하여 컨퍼런스를 시작할 수 있습니다."
                                />
                            )}
                            {!isModeratorSelected && (
                                <ToolTip
                                    isVisible={!isModeratorSelected}
                                    content="- AI 사회자를 선택하여 컨퍼런스를 시작할 수 있습니다."
                                />
                            )}
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConferenceInfoTemplate;
