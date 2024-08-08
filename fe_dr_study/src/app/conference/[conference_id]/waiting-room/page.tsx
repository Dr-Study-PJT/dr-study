'use client';

import ConferenceWaitingRoomTemplate from '@/components/template/conference/ConferenceWaitingRoomTemplate';
import useConferenceInfo from '@/hooks/conference/useConferenceInfo';
import useConferenceInvitees from '@/hooks/conference/useConferenceInvitees';
import { getSessionStorageItem } from '@/utils/sessionStorage';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Page = () => {
    const { conferenceInfo, error: conferenceInfoFetchError } =
        useConferenceInfo();
    const { conferenceInvitees, error: inviteesFetchError } =
        useConferenceInvitees();

    const memberData = getSessionStorageItem('memberData');

    if (conferenceInfoFetchError) {
        return <div>{conferenceInfoFetchError}</div>; // 오류 메시지 표시
    }
    if (inviteesFetchError) {
        return <div>{inviteesFetchError}</div>; // 오류 메시지 표시
    }

    return (
        <ConferenceWaitingRoomTemplate
            memberData={memberData}
            conferenceInfo={conferenceInfo}
            conferenceInvitees={conferenceInvitees}
        />
    );
};

export default Page;
