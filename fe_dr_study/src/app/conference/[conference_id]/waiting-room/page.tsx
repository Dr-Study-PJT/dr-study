'use client';

import Loading from '@/app/loading';
import ConferenceWaitingRoomTemplate from '@/components/template/conference/ConferenceWaitingRoomTemplate';
import { URLs } from '@/constants/URLs';
import useConferenceInfo from '@/hooks/conference/useConferenceInfo';
import useConferenceInvitees from '@/hooks/conference/useConferenceInvitees';
import { getSessionStorageItem } from '@/utils/sessionStorage';
import { redirect, usePathname } from 'next/navigation';

const Page = () => {
    const currentUrl = usePathname();
    const memberData = getSessionStorageItem('memberData');

    const {
        conferenceInfo,
        loading: loadingInfo,
        error: errorInfo,
    } = useConferenceInfo();
    const {
        conferenceInvitees,
        loading: loadingInvitees,
        error: errorInvitees,
    } = useConferenceInvitees();

    // 로딩 중인 경우 로딩 컴포넌트를 렌더링
    const loading = loadingInfo || loadingInvitees;
    if (loading) {
        return <Loading />;
    }

    // 에러가 발생한 경우 404 페이지로 리다이렉트
    if (errorInfo || errorInvitees) {
        return redirect(URLs.NOT_FOUND(currentUrl));
    }

    // 1. 로그인하지 않은 경우 로그인 페이지로 리다이렉트
    if (!memberData) {
        redirect(URLs.LOGIN());
    }

    // 2. 스터디 그룹에 초대되지 않은 경우 그룹 페이지로 리다이렉트
    if (
        conferenceInfo?.hostId !== memberData.id &&
        !conferenceInvitees.map((invitee) => invitee.id).includes(memberData.id)
    ) {
        redirect(
            URLs.GROUP(
                conferenceInfo?.studyGroupId.toString() || '',
                'not_invited',
            ),
        );
    }

    return (
        <ConferenceWaitingRoomTemplate
            conferenceInfo={conferenceInfo}
            conferenceInvitees={conferenceInvitees}
        />
    );
};

export default Page;
