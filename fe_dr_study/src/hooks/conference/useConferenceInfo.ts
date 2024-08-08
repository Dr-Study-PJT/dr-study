import { useEffect, useState } from 'react';
import { GET } from '@/app/api/routeModule';
import { ConferenceData } from '@/interfaces/conference';
import { useParams, usePathname } from 'next/navigation';

const useConferenceInfo = () => {
    const conferenceId = useParams().conference_id;
    const [conferenceInfo, setConferenceInfo] = useState<ConferenceData | null>(
        null,
    );
    const [studyMembers, setStudyMembers] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleGetConferenceInfo = async () => {
            try {
                const response = await GET(`v1/conferences/${conferenceId}`, {
                    params: '',
                    isAuth: true,
                    revalidateTime: 10,
                });

                setConferenceInfo(response.data);
                const studyGroupId = response.data.studyGroupId;
                console.log('컨퍼런스 정보 조회 성공:', response);
                await handleGetStudyMembersData(studyGroupId);
            } catch (error) {
                console.error('컨퍼런스 정보 조회 실패:', error);
                setError('컨퍼런스 정보를 가져오는 데 실패했습니다.');
            }
        };

        handleGetConferenceInfo();
    }, [conferenceId]);

    const handleGetStudyMembersData = async (studyGroupId: number) => {
        try {
            const response = await GET(`v1/groups/${studyGroupId}/members`, {
                params: '',
                isAuth: true,
                revalidateTime: 10,
            });

            console.log('스터디 그룹 멤버 정보 조회 성공:', response);
            setStudyMembers(response.data);
        } catch (error) {
            console.error('스터디 그룹 멤버 정보 조회 실패:', error);
            setError('스터디 그룹 멤버 정보를 가져오는 데 실패했습니다.');
        }
    };

    return { conferenceInfo, error };
};

export default useConferenceInfo;
