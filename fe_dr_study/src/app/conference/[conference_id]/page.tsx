'use client';

import ConferenceTemplate from '@/components/template/conference/ConferenceTemplate';
import useConferenceInfo from '@/hooks/conference/useConferenceInfo';
import { getSessionStorageItem } from '@/utils/sessionStorage';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ConferencePageProps {
    params: {
        conference_id: number;
    };
}

const ConferencePage: React.FC<ConferencePageProps> = ({ params }) => {
    const router = useRouter();

    const { conferenceInfo, error } = useConferenceInfo();
    const memberData = getSessionStorageItem('memberData');

    // // 컨퍼런스 정보 조회 실패 시 컨퍼런스 정보 페이지로 이동
    // useEffect(() => {}, [conferenceInfo]);

    // // 로그인 여부 확인
    // useEffect(() => {}, [memberData]);

    // 오픈 여부 확인
    useEffect(() => {
        if (conferenceInfo && !conferenceInfo.openTime) {
            router.push(
                `/conference/${params.conference_id}/info?error=not_open`,
            );
        }

        console.log(memberData);
        if (!memberData) {
            router.push('/auth/login');
        }

        if (error) {
            router.push(`/conference/${params.conference_id}/info`);
        }
    }, [memberData, conferenceInfo]);

    return conferenceInfo ? (
        <ConferenceTemplate conferenceInfo={conferenceInfo} />
    ) : null;
};

export default ConferencePage;
