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

        handleGetConferenceInfo();
    }, [conferenceId]);

    return (
        <ConferenceInfoTemplate
            conferenceId={params.conference_id}
            conferenceData={conferenceData}
        />
    );
};

export default ConferenceInfoPage;
