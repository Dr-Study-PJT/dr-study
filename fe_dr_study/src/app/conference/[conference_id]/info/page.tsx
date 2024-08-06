'use client';

import { conferenceAPI as API } from '@/app/api/axiosInstanceManager';
import { GET, POST } from '@/app/api/routeModule';
import { ConferenceData } from '@/app/group/[group_id]/_types';
import ConferenceInfoTemplate from '@/components/template/conference/ConferenceInfoTemplate';
import { ConferenceMember } from '@/interfaces/conference';
import { Moderator } from '@/interfaces/moderator';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ConferenceInfoPageProps {
    params: {
        conference_id: number;
    };
}

const ConferenceInfoPage: React.FC<ConferenceInfoPageProps> = ({ params }) => {
    const router = useRouter();
    const conferenceId = params.conference_id;

    const [conferenceData, setConferenceData] = useState<any>({}); // any 타입 수정 !필요!

    const [studyMembers, setStudyMembers] = useState<ConferenceMember[]>([]); // 스터디 멤버 상태

    const [moderators, setModerators] = useState<Moderator[]>([]); // 사회자 여부
    const [isModeratorInvited, setIsModeratorInvited] =
        useState<boolean>(false); // 사회자 선택 여부

    useEffect(() => {
        handleGetConferenceInfo();
        handleGetStudyMembers();
        handleGetModerators();
    }, []);

    // 컨퍼런스 정보를 가져오는 함수
    const handleGetConferenceInfo = async () => {
        try {
            const response = await GET(`v1/conferences`, {
                params: `${conferenceId}`,
                isAuth: true,
                revalidateTime: 10,
            });

            console.log('컨퍼런스 조회 성공:', response.data);
            const { data } = response.data;

            setConferenceData(data);
        } catch (error) {
            console.error('컨퍼런스 조회 실패:', error);
        }
    };

    // 스터디 멤버를 가져오는 함수
    const handleGetStudyMembers = async () => {
        try {
            const response = await GET(`v1/groups`, {
                params: `${1}/members`,
                isAuth: true,
                revalidateTime: 10,
            });

            console.log('스터디 멤버 리스트 조회 성공:', response.data);

            setStudyMembers(response.data.content);
        } catch (error) {
            console.error('스터디 멤버 리스트 조회 실패:', error);
        }
    };

    // 사회자 리스트를 가져오는 함수
    const handleGetModerators = async () => {
        try {
            const response = await GET(`v1/moderators`, {
                params: '',
                isAuth: true,
                revalidateTime: 10,
            });

            console.log('사회자 리스트 조회 성공:', response.data);
            const { data } = response.data;

            setModerators(data);
        } catch (error) {
            console.error('사회자 리스트 조회 실패:', error);
        }
    };

    // 컨퍼런스 개최 요청 함수
    const handleOpenConference = async () => {
        console.log(
            '컨퍼런스 개최 요청 시작. conferenceData =>',
            conferenceData,
        );
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
            router.push(`/conference/${conferenceId}`);
        } catch (error) {
            console.error('컨퍼런스 개최 실패(handleOpenConference):', error);
        }
    };

    // mock conference data
    // useEffect(() => {
    //     setConferenceData({
    //         id: 1,
    //         hostId: 1,
    //         studyGroupId: 1,
    //         title: '정보처리기사 시험 대비 컨퍼런스',
    //         subject: '한 주 회고',
    //         memberCapacity: 10,
    //         startTime: '2024-08-04T09:02:19.887Z',
    //         finishTime: '2024-08-04T09:02:19.887Z',
    //         imageUrl: '/images/group_thumbnail_1.png',
    //     });
    // }, []);

    // if (!conferenceData) {
    //     return <div>Loading...</div>; // 데이터 로딩 중 표시
    // }

    return (
        <ConferenceInfoTemplate
            conferenceId={params.conference_id}
            conferenceData={conferenceData}
            moderators={moderators}
            studyMembers={studyMembers}
            handleOpenConference={handleOpenConference}
        />
    );
};

export default ConferenceInfoPage;
