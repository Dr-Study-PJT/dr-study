'use client';

import { Button } from '@/components/atoms';
import HrLine from '@/components/atoms/HrLine/HrLine';
import ToolTip from '@/components/atoms/Tooltip/ToolTip';
import MeetingIdBox from '@/components/molecules/MeetingIdBox/MeetingIdBox';
import InviteMembersBox from '@/components/organisms/InviteMembersBox/InviteMembersBox';
import { ConferenceData, ConferenceMember } from '@/interfaces/conference';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ConferenceInfoProps {
    memberData: any; // any 타입 수정 필요
    conferenceId: number; // 회의 ID
    conferenceData: ConferenceData | null; // 회의 데이터
    studyMembers: ConferenceMember[]; // 스터디 멤버 리스트
    handleOpenConference: () => void; // 컨퍼런스 개최 함수
}

const ConferenceInfoTemplate = ({
    memberData,
    conferenceId,
    conferenceData,
    studyMembers,
    handleOpenConference,
}: ConferenceInfoProps) => {
    const [isMemberInvited, setIsMemberInvited] = useState<boolean>(false); // 멤버 초대 여부
    const [isHostOnly, setIsHostOnly] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState('0000. 0. 0. 오후 0:00:00');

    useEffect(() => {
        setIsHostOnly(
            memberData?.id === conferenceData?.hostId &&
                conferenceData?.participants.length === 0,
        );
    }, [conferenceData]);

    return (
        <div className="flex items-center justify-center p-[6rem] bg-dr-indigo-200 text-dr-white ">
            <div className="flex flex-col gap-dr-5 w-full h-full border-2 border-slate-700 p-12 rounded-md max-w-[50rem] ">
                <div className="flex justify-start gap-8">
                    <div className="rounded-lg flex">
                        <div className="relative w-[7rem] h-[7rem] rounded-lg overflow-hidden">
                            <Image
                                src={'/images/group_thumbnail_1.png'}
                                alt={'group-thumbnail'}
                                fill
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-dr-header-3 font-bold mb-2 text-dr-primary ">
                            {conferenceData?.title}
                        </h2>
                        <div className="flex flex-col gap-3 text-dr-body-1">
                            <p className="text-dr-body-3 text-slate-300 border-slate-700">
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
                <InviteMembersBox
                    memberData={memberData}
                    members={studyMembers}
                    conferenceId={conferenceId}
                    isMemberInvited={isMemberInvited}
                    setIsMemberInvited={setIsMemberInvited}
                    capacity={conferenceData?.memberCapacity}
                    conferenceData={conferenceData}
                />
                <HrLine />
                <div className="py-[1rem]">
                    <Button
                        onClick={handleOpenConference}
                        color={`${
                            isHostOnly || isMemberInvited ? 'coral' : 'gray'
                        }`}
                        disabled={!isHostOnly && !isMemberInvited}
                        size="md"
                        classNameStyles={`relative group ${
                            !isHostOnly && !isMemberInvited
                                ? 'cursor-not-allowed'
                                : ''
                        }`}
                    >
                        컨퍼런스 개최
                        <div className="text-start absolute top-[-0.25rem] hidden group-hover:block bg-black text-white text-dr-body-4 rounded -mt-10 left-[100%] transform -translate-x-1/2 whitespace-nowrap">
                            {!isMemberInvited && (
                                <ToolTip
                                    isVisible={!isMemberInvited}
                                    content="- 한 명의 멤버도 초대하지 않은 상태입니다."
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
