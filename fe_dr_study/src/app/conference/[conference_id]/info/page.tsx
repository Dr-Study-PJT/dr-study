'use client';

import NotExistConference from '@/components/organisms/NotExistConference/NotExistConference';
import ConferenceInfoTemplate from '@/components/template/conference/ConferenceInfoTemplate';
import useConferenceInfo from './_hooks/useConferenceInfo';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { showToast } from '@/utils/toastUtil';

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
    const router = useRouter();
    const conferenceId = params.conference_id;

    const {
        memberData,
        conferenceData,
        studyMembers,
        isFetchFailed,
        handleOpenConference,
    } = useConferenceInfo(conferenceId);

    useEffect(() => {
        const isStartedConference = conferenceData?.openTime;
        // 컨퍼런스가 시작되었을 경우 대기실로 이동
        if (isStartedConference) {
            router.push(
                `/conference/${conferenceId}/waiting-room?error=already_open`,
            );
        }
    }, [conferenceData]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (searchParams.error === 'not_open') {
                showToast('error', '컨퍼런스가 아직 개최되지 않았습니다.');
            }
        }, 1000);
        return () => clearTimeout(timeout);
    }, [searchParams]);

    // 컨퍼런스 정보 조회 실패 시 이용 불가 페이지로 이동
    if (isFetchFailed) {
        return <NotExistConference />;
    }

    return (
        <>
            <ConferenceInfoTemplate
                memberData={memberData}
                conferenceId={conferenceId}
                conferenceData={conferenceData}
                studyMembers={studyMembers}
                handleOpenConference={handleOpenConference}
            />
        </>
    );
};

export default ConferenceInfoPage;
