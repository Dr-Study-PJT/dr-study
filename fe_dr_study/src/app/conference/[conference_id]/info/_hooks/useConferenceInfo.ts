'use client';
import { useEffect, useState } from 'react';
import { conferenceAPI as API } from '@/app/api/axiosInstanceManager';
import { GET, POST } from '@/app/api/routeModule';
import { ConferenceData, ConferenceMember } from '@/interfaces/conference';
import { Moderator } from '@/interfaces/moderator';
import { getSessionStorageItem } from '@/utils/sessionStorage';
import { useRouter } from 'next/navigation';

const useConferenceInfo = (conferenceId: number) => {
    const router = useRouter();

    const memberData = getSessionStorageItem('memberData');

    const [conferenceData, setConferenceData] = useState<ConferenceData | null>(
        null,
    );
    const [studyMembers, setStudyMembers] = useState<ConferenceMember[]>([]);
    const [moderators, setModerators] = useState<Moderator[]>([]);
    const [isFetchFailed, setIsFetchFailed] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            await handleGetConferenceInfo();
            await handleGetModerators();
        };
        fetchData();
    }, [conferenceId]);

    const handleGetConferenceInfo = async () => {
        try {
            const response = await GET(`v1/conferences`, {
                params: `${conferenceId}`,
                isAuth: true,
                revalidateTime: 10,
            });

            if (Object.keys(response).includes('errors')) {
                console.error('컨퍼런스 조회 실패');
                setIsFetchFailed(true);
                return;
            }
            const { data } = response;

            // 호스트가 아닌 경우 대기실로 이동
            console.log(data);
            console.log(memberData.id);
            if (data?.hostId !== memberData.id) {
                router.push(`/conference/${conferenceId}/waiting-room`);
            }

            // 컨퍼런스 데이터 설정
            setConferenceData(data);

            // 스터디 멤버 조회
            await handleGetStudyMembers(data.studyGroupId);
            console.log('컨퍼런스 조회 성공:', response);
        } catch (error) {
            console.error('컨퍼런스 조회 실패:', error);
            setIsFetchFailed(true);
        }
    };

    const handleGetStudyMembers = async (studyGroupId: number) => {
        try {
            const response = await GET(`v1/groups`, {
                params: `${studyGroupId}/members`,
                isAuth: true,
                revalidateTime: 10,
            });

            console.log('스터디 멤버 리스트 조회 성공:', response);
            setStudyMembers(response.data);
        } catch (error) {
            console.error('스터디 멤버 리스트 조회 실패:', error);
        }
    };

    const handleGetModerators = async () => {
        try {
            const response = await GET(`v1/moderators`, {
                params: '',
                isAuth: true,
                revalidateTime: 10,
            });

            console.log('사회자 리스트 조회 성공:', response);
            const { data } = response;
            setModerators(data);
        } catch (error) {
            console.error('사회자 리스트 조회 실패:', error);
        }
    };

    const handleOpenConference = async (moderator: Moderator) => {
        console.log(
            '컨퍼런스 개최 요청 시작. conferenceData =>',
            conferenceData,
        );
        try {
            const response = await POST({
                API: API,
                endPoint: `${conferenceId}/open`,
                body: {
                    moderatorId: moderator.id,
                },
                isAuth: true,
            });

            console.log('컨퍼런스 개최 성공(handleOpenConference):', response);
            router.push(`/conference/${conferenceId}`);

            return response; // 필요한 경우 응답 반환
        } catch (error) {
            console.error('컨퍼런스 개최 실패(handleOpenConference):', error);
        }
    };

    return {
        memberData,
        conferenceData,
        studyMembers,
        moderators,
        isFetchFailed,
        handleOpenConference,
    };
};

export default useConferenceInfo;
