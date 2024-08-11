'use client';

import ConferenceWaitingRoomTemplate from '@/components/template/conference/ConferenceWaitingRoomTemplate';
import useConferenceInfo from '@/hooks/conference/useConferenceInfo';
import useConferenceInvitees from '@/hooks/conference/useConferenceInvitees';
import { getSessionStorageItem } from '@/utils/sessionStorage';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Page = () => {
    const router = useRouter();
    const pathname = usePathname();

    const { conferenceInfo, error: conferenceInfoFetchError } =
        useConferenceInfo();
    const { conferenceInvitees, error: inviteesFetchError } =
        useConferenceInvitees();

    const memberData = getSessionStorageItem('memberData');

    useEffect(() => {
        console.log('conferenceInvitees 26번 라인 =>', conferenceInvitees);
    }, [conferenceInvitees]);

    if (conferenceInfoFetchError || inviteesFetchError) {
        router.push(pathname + '/not-found');
        return null;
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
