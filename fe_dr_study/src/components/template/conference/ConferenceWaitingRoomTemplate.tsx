import { Button } from '@/components/atoms';
import HrLine from '@/components/atoms/HrLine/HrLine';
import MeetingIdBox from '@/components/molecules/MeetingIdBox/MeetingIdBox';
import { ConferenceData, Participant } from '@/interfaces/conference';
import { IMemberData } from '@/interfaces/members';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ConferenceWaitingRoomTemplateProps {
    memberData: IMemberData | null;
    conferenceInfo: ConferenceData | null;
    conferenceInvitees: Participant[];
}

const ConferenceWaitingRoomTemplate = ({
    memberData,
    conferenceInfo,
    conferenceInvitees,
}: ConferenceWaitingRoomTemplateProps) => {
    console.log('conferenceInfo =>', conferenceInfo);
    const {
        title,
        subject,
        hostId,
        id,
        imageUrl,
        memberCapacity,
        openTime,
        closeTime,
        startTime,
        finishTime,
        participants,
        studyGroupId,
    } = conferenceInfo || {};

    if (!conferenceInfo) {
        return (
            <div className="text-white">컨퍼런스 정보를 불러오는 중입니다.</div>
        );
    }

    const router = useRouter();
    useEffect(() => {
        // 스터디 멤버가 아니거나 컨퍼런스 초대자가 아닌 경우 홈으로 이동
        if (
            conferenceInfo?.hostId !== memberData?.id &&
            !conferenceInvitees.some((invitee) => invitee.id === memberData?.id)
        ) {
            console.log('스터디 멤버가 아닙니다.');
            router.push('/');
        }
    }, [conferenceInvitees, memberData]);

    return (
        <div className="flex items-center justify-center p-[4rem] bg-dr-indigo-200 text-dr-white">
            <div className="flex flex-col items-center justify-center p-[1rem] w-full max-w-[50rem] h-full rounded-lg bg-dr-indigo-100 shadow-lg">
                <div className="flex flex-col items-start justify-start w-full h-full p-6 gap-dr-10">
                    <h2 className="text-dr-header-3 font-bold">{title}</h2>
                    <div className="flex text-dr-body-3 text-dr-gray-300 gap-dr-10">
                        <p>
                            입장 가능 시간{' '}
                            {/* {openTime?.toLocaleTimeString() || '00:00'} -{' '}
                            {startTime?.toLocaleTimeString() || '00:00'} */}
                        </p>{' '}
                        <p>|</p>
                        <p>
                            스터디 진행 시간{' '}
                            {/* {startTime?.toLocaleTimeString() || '00:00'} -{' '}
                            {closeTime?.toLocaleTimeString() || '00:00'} */}
                        </p>
                        <p>|</p>
                        <p>컨퍼런스 정원: {memberCapacity}명</p>
                    </div>
                    <HrLine />
                    <div className="flex gap-dr-10">
                        <Link href={`/conference/${id}`}>
                            <Button size="lg">컨퍼런스 입장하기</Button>
                        </Link>
                        <Button size="lg" color="gray">
                            <Link href={`/group/${studyGroupId}`}>
                                스터디 그룹 정보
                            </Link>
                        </Button>
                    </div>
                    <HrLine />
                    <div>
                        <h3 className="text-dr-header-2">컨퍼런스 주제</h3>
                        <p className="text-dr-body-2">{subject}</p>
                    </div>
                    <div></div>
                    <HrLine />
                    <MeetingIdBox>{`/conference/${id}`}</MeetingIdBox>
                    <HrLine />
                    <div>
                        <h3 className="mt-6 text-xl font-semibold">
                            참여자 목록
                        </h3>
                        <p>호스트 ID: {hostId}</p>
                        {conferenceInvitees.map((invitee) => (
                            <div
                                key={invitee.id}
                                className="flex items-center mt-2 gap-dr-5"
                            >
                                <div className="relative w-10 h-10 rounded-md overflow-hidden">
                                    <Image
                                        src={invitee.imageUrl}
                                        alt={invitee.nickname}
                                        fill
                                    />
                                </div>
                                <div className="text-sm">
                                    <p>
                                        {invitee.nickname}{' '}
                                        <span className="text-dr-gray-300">
                                            ({invitee.email})
                                        </span>
                                    </p>
                                    <p
                                        className={`text-gray-400 ${invitee.leaved ? 'line-through' : ''}`}
                                    >
                                        {invitee.leaved
                                            ? '탈퇴한 멤버'
                                            : '활동 중인 멤버'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConferenceWaitingRoomTemplate;
