'use client';

import ConferenceInfoTemplate from '@/components/template/conference/ConferenceInfoTemplate';
import useConferenceInfo from './_hooks/useConferenceInfo';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { showToast } from '@/utils/toastUtil';
import { getSessionStorageItem } from '@/utils/sessionStorage';
import { URLs } from '@/constants/URLs';
import { LoadingLottie } from '@/app/_components/Lottie/Loading/LoadingLottie';

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
    const conferenceId = params.conference_id;

    const { conferenceInfo, studyMembers, handleOpenConference } =
        useConferenceInfo(conferenceId);

    // const { conferenceInfo, error } = useConferenceInfo();
    const memberData = getSessionStorageItem('memberData');

    useEffect(() => {
        // 1. 로그인하지 않은 경우 로그인 페이지로 리다이렉트
        if (!memberData) {
            redirect(URLs.LOGIN);
        }

        if (conferenceInfo) {
            console.log(conferenceInfo);
            // 2. 시작 시간이 있으면 대기실로 이동
            if (conferenceInfo.openTime) {
                redirect(
                    URLs.CONFERENCE_WAITING_ROOM(
                        conferenceInfo.id.toString() || '',
                        'already_open',
                    ),
                );
            }
            // 3. 호스트가 아닌 경우 그룹 페이지로 이동
            if (conferenceInfo?.hostId !== memberData.id) {
                redirect(
                    URLs.GROUP(
                        conferenceInfo.studyGroupId.toString() || '',
                        'not_host',
                    ),
                );
            }
        }
    }, [conferenceInfo]);

    useEffect(() => {
        if (searchParams.error === 'not_open') {
            showToast('error', '컨퍼런스가 아직 개최되지 않았습니다.');
        }
    }, [searchParams]);

    return conferenceInfo ? (
        <ConferenceInfoTemplate
            memberData={memberData}
            conferenceId={conferenceId}
            conferenceData={conferenceInfo}
            studyMembers={studyMembers}
            handleOpenConference={handleOpenConference}
        />
    ) : (
        <LoadingLottie />
    );
};

export default ConferenceInfoPage;
