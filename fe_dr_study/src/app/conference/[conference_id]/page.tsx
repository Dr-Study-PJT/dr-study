'use client';

import Loading from '@/app/loading';
import ConferenceTemplate from '@/components/template/conference/ConferenceTemplate';
import { URLs } from '@/constants/URLs';
import useConferenceInfo from '@/hooks/conference/useConferenceInfo';
import useConferenceInvitees from '@/hooks/conference/useConferenceInvitees';
import { getSessionStorageItem } from '@/utils/sessionStorage';
import { redirect, usePathname } from 'next/navigation';

interface ConferencePageProps {
    searchParams?: {
        groupId?: string;
        conferenceId?: string;
    };
}

const ConferencePage: React.FC<ConferencePageProps> = () => {
    const currentUrl = usePathname();

    const {
        conferenceInfo,
        loading: conferenceInfoLoading,
        error: conferenceInfoError,
    } = useConferenceInfo();
    const {
        conferenceInvitees: invitees,
        loading: inviteesLoading,
        error: inviteesError,
    } = useConferenceInvitees();
    const memberData = getSessionStorageItem('memberData');

    // 로딩 중인 경우 로딩 컴포넌트를 렌더링
    if (conferenceInfoLoading || inviteesLoading) {
        return <Loading />;
    }

    // 에러가 발생한 경우 404 페이지로 리다이렉트
    if (conferenceInfoError || inviteesError) {
        return redirect(URLs.NOT_FOUND(currentUrl));
    }

    // 1. 로그인하지 않은 경우 로그인 페이지로 리다이렉트
    if (!memberData) {
        redirect(URLs.LOGIN());
    }

    if (conferenceInfo) {
        // 2. 스터디 그룹에 초대되지 않은 경우 그룹 페이지로 리다이렉트
        if (
            conferenceInfo?.hostId !== memberData.id &&
            !invitees.map((invitee) => invitee.id).includes(memberData.id)
        ) {
            redirect(
                URLs.GROUP(
                    conferenceInfo.studyGroupId.toString() || '',
                    'not_invited',
                ),
            );
        }
        // 3. 컨퍼런스가 개회되지 않은 경우 대기실 페이지로 리다이렉트
        if (!conferenceInfo?.openTime) {
            redirect(
                URLs.CONFERENCE_WAITING_ROOM(
                    conferenceInfo.id.toString() || '',
                ),
            );
        }
    }

    return (
        <ConferenceTemplate
            conferenceInfo={conferenceInfo}
            memberData={memberData}
        />
    );
};

export default ConferencePage;
