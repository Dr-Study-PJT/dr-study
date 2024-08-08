'use client';

import ConferenceWaitingRoomTemplate from '@/components/template/conference/ConferenceWaitingRoomTemplate';
import useConferenceInfo from '@/hooks/conference/useConferenceInfo';
import useConferenceInvitees from '@/hooks/conference/useConferenceInvitees';

const Page = () => {
    const { conferenceInfo, error: conferenceInfoFetchError } =
        useConferenceInfo();
    const { conferenceInvitees, error: inviteesFetchError } =
        useConferenceInvitees();

    console.log(conferenceInvitees);

    if (conferenceInfoFetchError) {
        return <div>{conferenceInfoFetchError}</div>; // 오류 메시지 표시
    }
    if (inviteesFetchError) {
        return <div>{inviteesFetchError}</div>; // 오류 메시지 표시
    }

    return (
        <ConferenceWaitingRoomTemplate
            conferenceInfo={conferenceInfo}
            conferenceInvitees={conferenceInvitees}
        />
    );
};

export default Page;
