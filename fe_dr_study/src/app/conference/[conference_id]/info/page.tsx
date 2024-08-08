'use client';

import NotExistConference from '@/components/organisms/NotExistConference/NotExistConference';
import ConferenceInfoTemplate from '@/components/template/conference/ConferenceInfoTemplate';
import useConferenceInfo from './_hooks/useConferenceInfo';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ConferenceInfoPageProps {
    params: {
        conference_id: number;
    };
}

const ConferenceInfoPage: React.FC<ConferenceInfoPageProps> = ({ params }) => {
    const router = useRouter();
    const conferenceId = params.conference_id;

    const {
        memberData,
        conferenceData,
        studyMembers,
        moderators,
        isFetchFailed,
        handleOpenConference,
    } = useConferenceInfo(conferenceId);

    useEffect(() => {
        const isStartedConference = conferenceData?.startTime;
        console.log(conferenceData);

        // 컨퍼런스가 시작되었을 경우 대기실로 이동
        if (isStartedConference) {
            router.push(`/conference/${conferenceId}/waiting-room`);
        }
    }, [conferenceData]);

    // 컨퍼런스 정보 조회 실패 시 이용 불가 페이지로 이동
    if (isFetchFailed) {
        return <NotExistConference />;
    }

    return (
        <ConferenceInfoTemplate
            memberData={memberData}
            conferenceId={conferenceId}
            conferenceData={conferenceData}
            moderators={moderators}
            studyMembers={studyMembers}
            handleOpenConference={handleOpenConference}
        />
    );
};

export default ConferenceInfoPage;
