'use client';

import { conferenceAPI as API } from '@/app/api/axiosInstanceManager';
import { GET } from '@/app/api/routeModule';
import { ConferenceData } from '@/app/group/[group_id]/_types';
import ConferenceInfoTemplate from '@/components/template/conference/ConferenceInfoTemplate';
import { useEffect, useState } from 'react';

interface ConferenceInfoPageProps {
    params: {
        conference_id: number;
    };
}

const ConferenceInfoPage: React.FC<ConferenceInfoPageProps> = ({ params }) => {
    // any 타입 수정 !필요!
    const [conferenceData, setConferenceData] = useState<any>({});
    const conferenceId = params.conference_id; // 예시로 사용, 실제 ID를 사용해야 합니다.

    useEffect(() => {
        const handleGetConferenceInfo = async () => {
            try {
                const response = await GET(`v1/conferences`, {
                    params: '',
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

        // handleGetConferenceInfo();
    }, [conferenceId]);
    // mock conference data
    useEffect(() => {
        setConferenceData({
            id: 1,
            hostId: 1,
            studyGroupId: 1,
            title: '정보처리기사 시험 대비 컨퍼런스',
            subject: '한 주 회고',
            memberCapacity: 10,
            startTime: '2024-08-04T09:02:19.887Z',
            finishTime: '2024-08-04T09:02:19.887Z',
            imageUrl: '/images/group_thumbnail_1.png',
        });
    }, []);

    if (!conferenceData) {
        return <div>Loading...</div>; // 데이터 로딩 중 표시
    }

    return (
        <ConferenceInfoTemplate
            conferenceId={params.conference_id}
            conferenceData={conferenceData}
        />
    );
};

export default ConferenceInfoPage;
