// hooks/useConferenceInfo.ts
import { useEffect, useState } from 'react';
import { conferenceAPI as API } from '@/app/api/axiosInstanceManager';
import { GET, POST } from '@/app/api/routeModule';
import { ConferenceData, ConferenceMember } from '@/interfaces/conference';
import { getSessionStorageItem } from '@/utils/sessionStorage';

const useConferenceInfo = (conferenceId: number) => {
    const memberData = getSessionStorageItem('memberData');

    const [conferenceInfo, setConferenceInfo] = useState<ConferenceData | null>(
        null,
    );
    const [studyMembers, setStudyMembers] = useState<ConferenceMember[]>([]);
    const [isFetchFailed, setIsFetchFailed] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const getConferenceInfo = async () => {
        try {
            const response = await GET(`v1/conferences`, {
                params: `${conferenceId}`,
                isAuth: true,
                revalidateTime: 0,
            });

            if (Object.keys(response).includes('errors')) {
                console.error('컨퍼런스 조회 실패');
                setIsFetchFailed(true);
                setErrorMessage('컨퍼런스 조회 중 오류가 발생했습니다.');
                return;
            }

            const { data } = response;
            setConferenceInfo(data);
            await getStudyMembers(data.studyGroupId);
            console.log('컨퍼런스 조회 성공:', response);
        } catch (error) {
            console.error('컨퍼런스 조회 실패:', error);
            setIsFetchFailed(true);
            setErrorMessage(
                '컨퍼런스 조회 중 예기치 않은 오류가 발생했습니다.',
            );
        }
    };

    const getStudyMembers = async (studyGroupId: number) => {
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
            setErrorMessage('스터디 멤버 조회 중 오류가 발생했습니다.');
        }
    };

    const openConference = async () => {
        console.log(
            '컨퍼런스 개최 요청 시작. conferenceInfo =>',
            conferenceInfo,
        );
        try {
            const response = await POST({
                API: API,
                endPoint: `${conferenceId}/open`,
                body: {},
                isAuth: true,
            });

            return response; // 필요한 경우 응답 반환
        } catch (error) {
            console.error('컨퍼런스 개최 실패(openConference):', error);
            setErrorMessage('컨퍼런스 개최 중 오류가 발생했습니다.');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await getConferenceInfo();
            setLoading(false);
        };

        fetchData();
    }, [conferenceId]);

    return {
        memberData,
        conferenceInfo,
        studyMembers,
        isFetchFailed,
        loading,
        openConference,
        errorMessage, // 에러 메시지 반환
    };
};

export default useConferenceInfo;
