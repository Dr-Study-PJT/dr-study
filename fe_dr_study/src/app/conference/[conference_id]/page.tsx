'use client';

import { LoadingLottie } from '@/app/_components/Lottie/Loading/LoadingLottie';
import ConferenceTemplate from '@/components/template/conference/ConferenceTemplate';
import { URLs } from '@/constants/URLs';
import useConferenceInfo from '@/hooks/conference/useConferenceInfo';
import useConferenceInvitees from '@/hooks/conference/useConferenceInvitees';
import { getSessionStorageItem } from '@/utils/sessionStorage';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

interface ConferencePageProps {
    searchParams?: {
        groupId?: string;
        conferenceId?: string;
    };
}

const ConferencePage: React.FC<ConferencePageProps> = ({ searchParams }) => {
    const { conferenceInfo, error } = useConferenceInfo();
    const { conferenceInvitees: invitees, error: inviteesError } =
        useConferenceInvitees();
    const memberData = getSessionStorageItem('memberData');

    useEffect(() => {
        // 1. 비로그인
        if (!memberData) {
            redirect(URLs.LOGIN); // 로그인 페이지로 리다이렉트
        }

        if (conferenceInfo) {
            // 2. 초대여부
            if (
                conferenceInfo?.hostId !== memberData.id &&
                !invitees.map((invitee) => invitee.id).includes(memberData.id)
            ) {
                redirect(
                    URLs.GROUP(conferenceInfo.studyGroupId.toString() || ''),
                ); // 그룹 페이지로 리다이렉트
            }
            // 3. 개방여부
            if (!conferenceInfo?.openTime) {
                redirect(
                    URLs.CONFERENCE_WAITING_ROOM(
                        conferenceInfo.id.toString() || '',
                    ),
                );
            }
        }
    }, [conferenceInfo, invitees, memberData]);

    return conferenceInfo ? (
        <ConferenceTemplate
            conferenceInfo={conferenceInfo}
            memberData={memberData}
        />
    ) : (
        <LoadingLottie />
    );
};

export default ConferencePage;
