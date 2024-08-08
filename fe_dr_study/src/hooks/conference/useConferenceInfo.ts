import { useEffect, useState } from 'react';
import { GET } from '@/app/api/routeModule';
import { ConferenceData } from '@/interfaces/conference';
import { useParams, usePathname } from 'next/navigation';

const useConferenceInfo = () => {
    const conferenceId = useParams().conference_id;
    const [conferenceInfo, setConferenceInfo] = useState<ConferenceData | null>(
        null,
    );
    const [studyGroupId, setStudyGroupId] = useState<string | null>(null);
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
                setStudyGroupId(response.data.studyGroupId);
                console.log('컨퍼런스 정보 조회 성공:', response);
            } catch (error) {
                console.error('컨퍼런스 정보 조회 실패:', error);
                setError('컨퍼런스 정보를 가져오는 데 실패했습니다.');
            }
        };

        handleGetConferenceInfo();
    }, [conferenceId]);

    useEffect(() => {
        const handleGetMemberData = async () => {
            try {
                const response = await GET(`v1/conferences/${conferenceId}`, {
                    params: '',
                    isAuth: true,
                    revalidateTime: 10,
                });

                setConferenceInfo(response.data);
                setStudyGroupId(response.data.studyGroupId);
                console.log('컨퍼런스 정보 조회 성공:', response);
            } catch (error) {
                console.error('컨퍼런스 정보 조회 실패:', error);
                setError('컨퍼런스 정보를 가져오는 데 실패했습니다.');
            }
        };
        if (studyGroupId) {
            // handleGetMemberData();
        }
    }, [setStudyGroupId]);

    return { conferenceInfo, error };
};

export default useConferenceInfo;
