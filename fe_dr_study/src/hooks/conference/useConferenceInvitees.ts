import { useEffect, useState } from 'react';
import { GET } from '@/app/api/routeModule';
import { Participant } from '@/interfaces/conference';
import { useParams } from 'next/navigation';

const useConferenceInvitees = () => {
    const conferenceId = useParams().conference_id;
    const [conferenceInvitees, setConferenceInvitees] = useState<Participant[]>(
        [],
    );
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleGetConferenceInfo = async () => {
            try {
                const response = await GET(
                    `v1/conferences/${conferenceId}/invitees`,
                    {
                        params: '',
                        isAuth: true,
                        revalidateTime: 10,
                    },
                );

                setConferenceInvitees(response.data);
                console.log(
                    '컨퍼런스에 초대받은 유저 정보 조회 성공:',
                    response,
                );
            } catch (error) {
                console.error(
                    '컨퍼런스에 초대받은 유저 정보 조회 실패:',
                    error,
                );
                setError(
                    '컨퍼런스에 초대받은 유저 정보를 가져오는 데 실패했습니다.',
                );
            }
        };

        handleGetConferenceInfo();
    }, [conferenceId]);

    return { conferenceInvitees, error };
};

export default useConferenceInvitees;
