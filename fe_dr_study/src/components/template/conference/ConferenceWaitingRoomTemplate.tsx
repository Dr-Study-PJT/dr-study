import { Button } from '@/components/atoms';
import HrLine from '@/components/atoms/HrLine/HrLine';
import MeetingIdBox from '@/components/molecules/MeetingIdBox/MeetingIdBox';
import { ConferenceData, Participant } from '@/interfaces/conference';
import Image from 'next/image';
import Link from 'next/link';

interface ConferenceWaitingRoomTemplateProps {
    conferenceInfo: ConferenceData | null;
    conferenceInvitees: Participant[];
}

const ConferenceWaitingRoomTemplate = ({
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

    return (
        <div className="flex items-center justify-center p-[4rem] bg-dr-indigo-200 text-dr-white">
            <div className="flex flex-col items-center justify-center p-[1rem] w-full max-w-[50rem] h-full rounded-lg bg-dr-indigo-100 shadow-lg">
                <div className="flex flex-col items-start justify-start w-full h-full p-6 gap-dr-10">
                    <h2 className="text-dr-header-3 font-bold">{title}</h2>
                    <div className="flex text-dr-body-3 text-dr-gray-300 gap-dr-10">
                        <p>
                            입장 가능 시간{' '}
                            {openTime?.toLocaleTimeString() || '00:00'} -{' '}
                            {startTime?.toLocaleTimeString() || '00:00'}
                        </p>{' '}
                        <p>|</p>
                        <p>
                            스터디 진행 시간{' '}
                            {startTime?.toLocaleTimeString() || '00:00'} -{' '}
                            {closeTime?.toLocaleTimeString() || '00:00'}
                        </p>
                        <p>|</p>
                        <p>컨퍼런스 정원: {memberCapacity}명</p>
                    </div>
                    <HrLine />
                    <div className="flex gap-dr-10">
                        <Button size="lg">
                            <Link
                                href={`${process.env.NEXT_PUBLIC_HOST}/conference/${id}`}
                            >
                                컨퍼런스 입장하기
                            </Link>
                        </Button>
                        <Button size="lg" color="gray">
                            <Link
                                href={`${process.env.NEXT_PUBLIC_HOST}/group/${studyGroupId}`}
                            >
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
                    <MeetingIdBox>
                        {`${process.env.NEXT_PUBLIC_HOST}/conference/${id}`}
                    </MeetingIdBox>
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
