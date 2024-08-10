'use client';

import ModeratorTemplate from '@/components/template/moderator/ModeratorTemplate';
import { useEffect, useState } from 'react';
import { GET } from '../api/routeModule';
import { Moderator } from '@/interfaces/moderator';

const ModeratorListPage = () => {
    const [moderators, setModerators] = useState<Moderator[]>([]);

    useEffect(() => {
        const fetchModerators = async () => {
            try {
                const response = await GET(`v1/moderators`, {
                    params: '',
                    isAuth: true,
                    revalidateTime: 10,
                });
                console.log('사회자 리스트 조회 성공:', response);
                setModerators(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchModerators();
    }, []);
    return <ModeratorTemplate moderators={moderators} />;
};

export default ModeratorListPage;
