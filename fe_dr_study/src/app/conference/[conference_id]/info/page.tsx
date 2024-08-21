'use client';

import ConferenceInfoTemplate from '@/components/template/conference/ConferenceInfoTemplate';
import useConferenceInfo from './_hooks/useConferenceInfo';
import { redirect, usePathname } from 'next/navigation';
import { showToast } from '@/utils/toastUtil';
import { getSessionStorageItem } from '@/utils/sessionStorage';
import { URLs } from '@/constants/URLs';
import Loading from '@/app/loading';

interface ConferenceInfoPageProps {
    params: {
        conference_id: number;
    };
    searchParams: { error: string };
}

const ConferenceInfoPage: React.FC<ConferenceInfoPageProps> = ({
    params,
    searchParams,
}) => {
    const currentUrl = usePathname();
    const conferenceId = params.conference_id;

    const memberData = getSessionStorageItem('memberData');

    const {
        conferenceInfo,
        studyMembers,
        openConference,
        loading,
        errorMessage,
    } = useConferenceInfo(conferenceId);

    // 로딩 중인 경우 로딩 컴포넌트를 렌더링
    if (loading) {
        return <Loading />;
    }

    // 에러가 발생한 경우 404 페이지로 리다이렉트
    if (errorMessage) {
        return redirect(URLs.NOT_FOUND(currentUrl));
    }

    // 1. 로그인하지 않은 경우 로그인 페이지로 리다이렉트
    if (!memberData) {
        redirect(URLs.LOGIN());
    }

    // 2. 시작 시간이 있으면 대기실로 이동
    if (conferenceInfo?.openTime) {
        redirect(
            URLs.CONFERENCE_WAITING_ROOM(
                conferenceInfo?.id.toString() || '',
                'already_open',
            ),
        );
    }
    // 3. 호스트가 아닌 경우 그룹 페이지로 이동
    if (conferenceInfo?.hostId !== memberData.id) {
        redirect(
            URLs.GROUP(
                conferenceInfo?.studyGroupId.toString() || '',
                'not_host',
            ),
        );
    }

    if (searchParams.error === 'not_open') {
        showToast('error', '컨퍼런스가 아직 개최되지 않았습니다.');
    }

    return (
        <ConferenceInfoTemplate
            memberData={memberData}
            conferenceId={conferenceId}
            conferenceData={conferenceInfo}
            studyMembers={studyMembers}
            handleOpenConference={openConference}
        />
    );
};

export default ConferenceInfoPage;
