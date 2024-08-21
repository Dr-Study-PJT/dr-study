import { useEffect, useState } from 'react';
import { GET } from '@/app/api/routeModule';
import { Participant } from '@/interfaces/conference';
import { useParams } from 'next/navigation';

const useConferenceInvitees = () => {
    const { conference_id } = useParams(); // URL 파라미터에서 conference_id 가져오기
    const [conferenceInvitees, setConferenceInvitees] = useState<Participant[]>(
        [],
    );
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleGetConferenceInfo = async () => {
            setLoading(true); // 데이터 로딩 시작
            try {
                const response = await GET(
                    `v1/conferences/${conference_id}/invitees`,
                    {
                        params: '',
                        isAuth: true,
                        revalidateTime: 0,
                    },
                );

                setConferenceInvitees(response.data);
            } catch (error) {
                console.error(
                    '컨퍼런스에 초대받은 유저 정보 조회 실패:',
                    error,
                );
                setError(
                    '컨퍼런스에 초대받은 유저 정보를 가져오는 데 실패했습니다.',
                );
            } finally {
                setLoading(false); // 데이터 로딩 완료
            }
        };

        handleGetConferenceInfo();
    }, [conference_id]);

    return { conferenceInvitees, loading, error }; // 로딩 상태 추가
};

export default useConferenceInvitees;
