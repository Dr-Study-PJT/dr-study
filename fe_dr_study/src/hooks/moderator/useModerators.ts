import { useEffect, useState } from 'react';
import { GET } from '@/app/api/routeModule';
import { Moderator } from '@/interfaces/moderator';

const useModerators = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [moderators, setModerators] = useState<Moderator[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchModerators = async () => {
        try {
            const response = await GET(`v1/moderators`, {
                params: '',
                isAuth: true,
                revalidateTime: 10,
            });
            return response.data;
        } catch (error) {
            console.error('사회자 리스트 조회 실패:', error);
            setErrorMessage('사회자 리스트를 가져오는 데 실패했습니다.');
            return []; // 오류 발생 시 빈 배열 반환
        }
    };

    const fetchEachModerator = async () => {
        setIsLoading(true); // 데이터 fetch 시작 시 로딩 상태 설정
        const moderators = await fetchModerators();

        if (!moderators?.length) {
            setIsLoading(false); // 로딩 완료
            return;
        }

        const fetchPromises = moderators.map((moderator: any) =>
            GET(`v1/moderators/${moderator.id}`, {
                params: '',
                isAuth: true,
                revalidateTime: 10,
            })
                .then((response) => {
                    return { ...response.data, ...moderator };
                })
                .catch((error) => {
                    console.error('사회자 조회 실패:', error);
                    return null; // 실패한 경우 null 반환
                }),
        );

        const results = await Promise.all(fetchPromises);
        const validModerators = results.filter(
            (moderator) => moderator !== null,
        );

        setModerators(validModerators);
        setIsLoading(false); // 로딩 완료
    };

    useEffect(() => {
        fetchEachModerator();
    }, []);

    return { isLoading, moderators, errorMessage };
};

export default useModerators;
