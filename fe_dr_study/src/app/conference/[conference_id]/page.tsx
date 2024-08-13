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

    useEffect(() => {
        // conferenceInfo가 없으면 conferenceInfo를 가져오는 중이거나 에러가 발생한 상태
        if (conferenceInfo && !conferenceInfo.openTime) {
            router.push(
                `/conference/${params.conference_id}/info?error=not_open`,
            );
        }

        // memberData가 없으면 로그인 페이지로 이동
        if (!memberData) {
            router.push('/auth/login');
        }

        // 에러가 발생하면 conferenceInfo가 없는 상태이므로 conferenceInfo 페이지로 이동
        if (error) {
            router.push(`/conference/${params.conference_id}/info`);
        }
    }, [memberData, conferenceInfo]);

    return conferenceInfo ? (
        <ConferenceTemplate conferenceInfo={conferenceInfo} />
    ) : null;
};

export default ConferencePage;
