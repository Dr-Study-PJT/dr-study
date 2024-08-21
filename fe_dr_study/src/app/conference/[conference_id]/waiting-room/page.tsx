'use client';

import ConferenceWaitingRoomTemplate from '@/components/template/conference/ConferenceWaitingRoomTemplate';
import { URLs } from '@/constants/URLs';
import useConferenceInfo from '@/hooks/conference/useConferenceInfo';
import useConferenceInvitees from '@/hooks/conference/useConferenceInvitees';
import { getSessionStorageItem } from '@/utils/sessionStorage';
import { showToast } from '@/utils/toastUtil';
import { redirect } from 'next/navigation';
import { useEffect, useRef } from 'react';

interface ConferenceWaitingRoomPageProps {
    searchParams: { error: string };
}

const Page = ({ searchParams }: ConferenceWaitingRoomPageProps) => {
    const { conferenceInfo, error: conferenceInfoFetchError } =
        useConferenceInfo();
    const { conferenceInvitees: invitees, error: inviteesFetchError } =
        useConferenceInvitees();
    const memberData = getSessionStorageItem('memberData');

    const isToastShown = useRef(false);

    useEffect(() => {
        // 1. 로그인하지 않은 경우 로그인 페이지로 리다이렉트
        if (!memberData) {
            redirect(URLs.LOGIN);
        }

        if (conferenceInfo) {
            // 2. 초대가 되어있지 않은 경우 그룹 페이지로 리다이렉트
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
        }
    }, [conferenceInfo, invitees, memberData]);

    useEffect(() => {
        if (!isToastShown.current) {
            if (searchParams.error === 'join_failed') {
                showToast('error', '컨퍼런스 입장에 실패했습니다.');
            } else if (searchParams.error === 'not_open') {
                showToast('error', '컨퍼런스가 개최되지 않았습니다.');
            } else if (searchParams.error === 'already_open') {
                showToast('error', '컨퍼런스가 이미 개최되었습니다.');
            } else if (searchParams.error === 'finished_conference') {
                showToast('success', '컨퍼런스가 종료되었습니다.');
            }
            isToastShown.current = true;
        }
    }, []);

    return (
        <ConferenceWaitingRoomTemplate
            conferenceInfo={conferenceInfo}
            conferenceInvitees={invitees}
        />
    );
};

export default Page;
