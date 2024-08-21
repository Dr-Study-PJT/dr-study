import { useEffect, useState } from 'react';
import { GET } from '@/app/api/routeModule';
import { ConferenceData } from '@/interfaces/conference';
import { useParams } from 'next/navigation';

const useConferenceInfo = () => {
    const { conference_id } = useParams(); // URL 파라미터에서 conference_id 가져오기
    const [conferenceInfo, setConferenceInfo] = useState<ConferenceData | null>(
        null,
    );
    const [studyMembers, setStudyMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getConferenceInfo = async () => {
            setLoading(true); // 데이터 로딩 시작
            try {
                const response = await GET(`v1/conferences/${conference_id}`, {
                    params: '',
                    isAuth: true,
                    revalidateTime: 0,
                });

                setConferenceInfo(response.data);
                const studyGroupId = response.data.studyGroupId;
                await handleGetStudyMembersData(studyGroupId);
            } catch (error) {
                console.error('컨퍼런스 정보 조회 실패:', error);
                setError('컨퍼런스 정보를 가져오는 데 실패했습니다.');
            } finally {
                setLoading(false); // 데이터 로딩 완료
            }
        };

        getConferenceInfo();
    }, [conference_id]);

    const handleGetStudyMembersData = async (studyGroupId: number) => {
        try {
            const response = await GET(`v1/groups/${studyGroupId}/members`, {
                params: '',
                isAuth: true,
                revalidateTime: 0,
            });

            setStudyMembers(response.data);
        } catch (error) {
            console.error('스터디 그룹 멤버 정보 조회 실패:', error);
            setError('스터디 그룹 멤버 정보를 가져오는 데 실패했습니다.');
        }
    };

    return { conferenceInfo, studyMembers, loading, error }; // 로딩 상태 및 스터디 멤버 반환
};

export default useConferenceInfo;
