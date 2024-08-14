'use client';

import ConferenceWaitingRoomTemplate from '@/components/template/conference/ConferenceWaitingRoomTemplate';
import useConferenceInfo from '@/hooks/conference/useConferenceInfo';
import useConferenceInvitees from '@/hooks/conference/useConferenceInvitees';
import { getSessionStorageItem } from '@/utils/sessionStorage';
import { showToast } from '@/utils/toastUtil';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

interface ConferenceWaitingRoomPageProps {
    searchParams: { error: string };
}

const Page = ({ searchParams }: ConferenceWaitingRoomPageProps) => {
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

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (searchParams.error === 'join_failed') {
                showToast('error', '컨퍼런스 입장에 실패했습니다.');
            } else if (searchParams.error === 'not_open') {
                showToast('error', '컨퍼런스가 개최되지 않았습니다.');
            } else if (searchParams.error === 'already_open') {
                showToast('error', '컨퍼런스가 이미 개최되었습니다.');
            } else if (searchParams.error === 'finished_conference') {
                showToast('error', '컨퍼런스가 종료되었습니다.');
            }
        }, 1000);
        return () => clearTimeout(timeout);
    }, [searchParams]);

    return (
        <>
            <ConferenceWaitingRoomTemplate
                memberData={memberData}
                conferenceInfo={conferenceInfo}
                conferenceInvitees={conferenceInvitees}
            />
            <ToastContainer />
        </>
    );
};

export default Page;
