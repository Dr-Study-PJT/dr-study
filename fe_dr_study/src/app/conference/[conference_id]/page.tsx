'use client';

import ConferenceTemplate from '@/components/template/conference/ConferenceTemplate';
import useConferenceInfo from '@/hooks/conference/useConferenceInfo';
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

    // 컨퍼런스 정보 조회 실패 시 컨퍼런스 정보 페이지로 이동
    useEffect(() => {
        if (error) {
            router.push(`/conference/${params.conference_id}/info`);
        }
    }, [conferenceInfo]);

    return <ConferenceTemplate conferenceId={params.conference_id} />;
};

export default ConferencePage;
