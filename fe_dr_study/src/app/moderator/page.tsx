'use client';

import ModeratorTemplate from '@/components/template/moderator/ModeratorTemplate';
import { useEffect, useState } from 'react';
import { GET } from '../api/routeModule';
import { Moderator } from '@/interfaces/moderator';
import Loading from '../loading';

const ModeratorListPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [moderators, setModerators] = useState<Moderator[]>([]);

    const fetchModerators = async () => {
        try {
            const response = await GET(`v1/moderators`, {
                params: '',
                isAuth: true,
                revalidateTime: 10,
            });
            console.log('사회자 리스트 조회 성공:', response);
            return response.data;
        } catch (error) {
            console.error(error);
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
        console.log('results:', results);
        const validModerators = results.filter(
            (moderator) => moderator !== null,
        );
        console.log('validModerators:', validModerators);

        setModerators(validModerators);
        setIsLoading(false); // 로딩 완료
    };

    useEffect(() => {
        fetchEachModerator();
    }, []);

    if (isLoading) {
        return <Loading />; // 로딩 중일 때 Loading 컴포넌트 반환
    }

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <ModeratorTemplate moderators={moderators} />
            )}
            ;
        </>
    );
};

export default ModeratorListPage;
