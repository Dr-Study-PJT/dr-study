'use client';

import { conferenceAPI as API } from '@/app/api/axiosInstanceManager';
import { GET, POST } from '@/app/api/routeModule';
import { Button } from '@/components/atoms';
import { PageContainer } from '@/components/atoms/PageContainer/PageContainer';
import ToolTip from '@/components/atoms/Tooltip/ToolTip';
import InviteMembersBox from '@/components/organisms/InviteMembersBox/InviteMembersBox';
import { ConferenceData, ConferenceMember } from '@/interfaces/conference';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ConferenceInfoProps {
    conferenceId: number; // 회의 ID
    conferenceData: ConferenceData; // 회의 데이터
}

const ConferenceInfoTemplate = ({
    conferenceId,
    conferenceData,
}: ConferenceInfoProps) => {
    const { studyGroupId, hostId } = conferenceData; // 회의에서 사용되는 스터디 그룹 ID와 호스트 ID

    const [studyMembers, setStudyMembers] = useState<ConferenceMember[]>([]); // 스터디 멤버 상태
    const [isMemberInvited, setIsMemberInvited] = useState<boolean>(false); // 멤버 초대 상태

    // 스터디 멤버를 가져오는 함수
    useEffect(() => {
        const handleGetStudyMembers = async () => {
            try {
                const response = await GET(`v1/groups`, {
                    params: '',
                    isAuth: true,
                    revalidateTime: 10,
                });

                console.log('컨퍼런스 조회 성공:', response.data);
                const { data } = response.data;

                setStudyMembers(data);
            } catch (error) {
                console.error('컨퍼런스 조회 실패:', error);
            }
        };

        // 실제 API 호출 주석 처리
        // handleGetStudyMembers();
    }, []);

    // 모의 스터디 멤버 데이터 설정
    useEffect(() => {
        setStudyMembers([
            {
                id: 1,
                nickname: '박경모',
                imageId: 1,
                role: '팀원',
                joinDate: '2024-08-04T09:38:48.270Z', // 가입 날짜
            },
            {
                id: 2,
                nickname: '장철현',
                imageId: 2,
                role: '팀원',
                joinDate: '2024-08-04T09:38:48.270Z', // 가입 날짜
            },
            {
                id: 3,
                nickname: '조성우',
                imageId: 3,
                role: '팀원',
                joinDate: '2024-08-04T09:38:48.270Z', // 가입 날짜
            },
        ]);
    }, []);

    const handleOpenConference = async () => {
        try {
            const response = await POST({
                API: API,
                endPoint: `${conferenceId}/open`,
                body: '',
                isAuth: true,
            });

            console.log(
                '컨퍼런스 개최 성공(handleOpenConference):',
                response.data,
            );
        } catch (error) {
            console.error('컨퍼런스 개최 실패(handleOpenConference):', error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center bg-dr-dark-300 p-[4rem]">
            <div className="flex flex-col gap-dr-5 w-full h-full">
                <h2 className="text-3xl font-bold text-dr-white">
                    {conferenceData.title}
                </h2>
                <Image
                    src={'/images/group_thumbnail_1.png'}
                    alt={'group-thumbnail'}
                    width={300}
                    height={300}
                    className="border-2 border-dr-yellow rounded-lg"
                />
                <div className="flex flex-col gap-dr-5 text-dr-body-1 text-dr-white">
                    <p>컨퍼런스 ID: {conferenceData.id}</p>
                    <p>주제: {conferenceData.subject}</p>
                    <p>최대 참여 인원: {conferenceData.memberCapacity}</p>
                    <p>
                        참여 멤버 (최대 인원: {conferenceData.memberCapacity})
                    </p>
                    <div>
                        {studyMembers ? (
                            <InviteMembersBox
                                members={studyMembers}
                                conferenceId={conferenceId}
                                setIsMemberInvited={setIsMemberInvited}
                            />
                        ) : (
                            <div>Loading...</div>
                        )}
                    </div>
                    <div>
                        <p>
                            예정 시작 시간:
                            {new Date(
                                conferenceData.startTime,
                            ).toLocaleString()}
                        </p>
                        <p>
                            예정 종료 시간:
                            {new Date(
                                conferenceData.finishTime,
                            ).toLocaleString()}
                        </p>
                    </div>

                    <Button
                        onClick={() => handleOpenConference}
                        color={`${!isMemberInvited ? 'gray' : 'coral'}`}
                        disabled={!isMemberInvited}
                        rounded={true}
                        size="lg"
                        classNameStyles={`relative group ${!isMemberInvited ? 'cursor-not-allowed' : ''}`}
                    >
                        컨퍼런스 개최
                        <ToolTip
                            isVisible={!isMemberInvited}
                            content="한 명 이상 초대하여 컨퍼런스를 시작할 수 있습니다."
                        />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConferenceInfoTemplate;
