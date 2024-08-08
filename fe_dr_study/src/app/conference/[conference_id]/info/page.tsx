'use client';

import { conferenceAPI as API } from '@/app/api/axiosInstanceManager';
import { GET, POST } from '@/app/api/routeModule';
import { ConferenceData } from '@/app/group/[group_id]/_types';
import NotExistConference from '@/components/organisms/NotExistConference/NotExistConference';
import ConferenceInfoTemplate from '@/components/template/conference/ConferenceInfoTemplate';
import { ConferenceMember } from '@/interfaces/conference';
import { Moderator } from '@/interfaces/moderator';
import { getSessionStorageItem } from '@/utils/sessionStorage';
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
    const memberData = getSessionStorageItem('memberData');

    const [conferenceData, setConferenceData] = useState<ConferenceData | null>(
        null,
    );
    const [studyMembers, setStudyMembers] = useState<ConferenceMember[]>([]); // 스터디 멤버 상태
    const [moderators, setModerators] = useState<Moderator[]>([]); // 사회자 여부

    const [isFetchFailed, setIsFetchFailed] = useState<boolean>(false);

    useEffect(() => {
        handleGetConferenceInfo();
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

            // 컨퍼런스가 존재하지 않는 경우에는 NotExistConference 컴포넌트를 렌더링
            if (Object.keys(response).includes('errors')) {
                console.error('컨퍼런스 조회 실패');
                setIsFetchFailed(true);
            }
            const { data } = response;

            setConferenceData(data);
            await handleGetStudyMembers(data.studyGroupId);
            console.log('컨퍼런스 조회 성공:', response);
        } catch (error) {
            console.error('컨퍼런스 조회 실패:', error);
        }
    };

    // 스터디 멤버를 가져오는 함수
    const handleGetStudyMembers = async (studyGroupId: number) => {
        try {
            const response = await GET(`v1/groups`, {
                params: `${studyGroupId}/members`,
                isAuth: true,
                revalidateTime: 10,
            });

            console.log('스터디 멤버 리스트 조회 성공:', response);

            setStudyMembers(response.data);
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

            console.log('사회자 리스트 조회 성공:', response);
            const { data } = response;

            setModerators(data);
        } catch (error) {
            console.error('사회자 리스트 조회 실패:', error);
        }
    };

    // 컨퍼런스 개최 요청 함수
    const handleOpenConference = async (moderator: Moderator) => {
        console.log(
            '컨퍼런스 개최 요청 시작. conferenceData =>',
            conferenceData,
        );
        try {
            const response = await POST({
                API: API,
                endPoint: `${conferenceId}/open`,
                body: {
                    moderatorId: moderator.id,
                },
                isAuth: true,
            });

            console.log('컨퍼런스 개최 성공(handleOpenConference):', response);
            router.push(`/conference/${conferenceId}`);
        } catch (error) {
            console.error('컨퍼런스 개최 실패(handleOpenConference):', error);
        }
    };

    if (isFetchFailed) {
        return <NotExistConference />;
    }

    return (
        <ConferenceInfoTemplate
            memberData={memberData}
            conferenceId={params.conference_id}
            conferenceData={conferenceData}
            moderators={moderators}
            studyMembers={studyMembers}
            handleOpenConference={handleOpenConference}
        />
    );
};

export default ConferenceInfoPage;
