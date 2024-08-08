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
