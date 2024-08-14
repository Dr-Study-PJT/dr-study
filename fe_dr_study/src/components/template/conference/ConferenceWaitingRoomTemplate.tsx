import { Button } from '@/components/atoms';
import HrLine from '@/components/atoms/HrLine/HrLine';
import MeetingIdBox from '@/components/molecules/MeetingIdBox/MeetingIdBox';
import { ConferenceData, Participant } from '@/interfaces/conference';
import { IMemberData } from '@/interfaces/members';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import MemberAvatar from '@/components/molecules/MemberAvatar';
import { FaCrown } from 'react-icons/fa';
import { LoadingLottie } from '@/app/_components/Lottie/Loading/LoadingLottie';
import { ToastContainer } from 'react-toastify';
import { showToast } from '@/utils/toastUtil';

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

    const router = useRouter();

    useEffect(() => {
        // 스터디 멤버가 아니거나 컨퍼런스 초대자가 아닌 경우 홈으로 이동
        if (
            conferenceInfo?.hostId !== memberData?.id &&
            conferenceInvitees.length &&
            !conferenceInvitees.some((invitee) => invitee.id === memberData?.id)
        ) {
            // 직전 페이지로 이동
            router.push(`/group/${studyGroupId}?error=not-invited`);
        }
    }, [conferenceInvitees, memberData]);

    if (!conferenceInfo) {
        return <LoadingLottie />;
    }

    return (
        <div className="flex items-center justify-center p-[4rem] bg-dr-indigo-200 text-dr-white">
            <div className="flex flex-col items-center justify-center p-[1rem] w-full max-w-[50rem] h-full rounded-lg bg-dr-indigo-100 shadow-lg">
                <div className="flex flex-col items-start justify-start w-full h-full p-6 gap-dr-10">
                    <h2 className="text-dr-header-3 font-bold">
                        {title}
                        {closeTime && (
                            <span className="ml-3 text-dr-body-3 text-dr-gray-300">
                                (종료된 컨퍼런스)
                            </span>
                        )}
                    </h2>
                    <div className="relative flex items-center justify-center w-full h-[20rem] rounded-lg overflow-hidden">
                        <Image
                            src={imageUrl || '/images/conference-default.jpg'}
                            alt="conference-image"
                            fill
                            objectFit="cover"
                        />
                    </div>
                    <div className="flex gap-dr-10">
                        {closeTime ? null : (
                            <Link href={`/conference/${id}`}>
                                <Button size="lg">컨퍼런스 입장하기</Button>
                            </Link>
                        )}
                    </div>
                    <div>
                        <h3 className="text-dr-header-2">컨퍼런스 주제</h3>
                        <p className="text-dr-body-2">{subject}</p>
                    </div>
                    <div></div>
                    <HrLine />
                    <MeetingIdBox>{`${process.env.NEXT_PUBLIC_HOST}/conference/${id}`}</MeetingIdBox>
                    <HrLine />
                    <div>
                        <div className="flex justify-center items-center content-center">
                            <p className="mt-6 text-xl font-semibold">
                                참여자 목록
                            </p>
                        </div>

                        {conferenceInvitees.map((invitee) => (
                            <div
                                key={invitee.id}
                                className="flex items-center mt-2 gap-dr-5 relative"
                            >
                                {invitee.id === hostId && (
                                    <FaCrown className="absolute top-[-0.5rem] right-0.5rem text-yellow-400 text-lg z-20" />
                                )}
                                <MemberAvatar
                                    member={{
                                        id: invitee.id,
                                        nickname: invitee.nickname,
                                        imageUrl: invitee.imageUrl,
                                    }}
                                />
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
                    <Button size="lg" color="gray">
                        <Link href={`/group/${studyGroupId}`}>
                            스터디 그룹 정보
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConferenceWaitingRoomTemplate;
