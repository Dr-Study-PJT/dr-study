'use client';

import ModeratorTemplate from '@/components/template/moderator/ModeratorTemplate';
import { useEffect, useState } from 'react';
import { GET } from '../api/routeModule';
import { Moderator } from '@/interfaces/moderator';

const mockModerators: Moderator[] = [
    {
        id: 1,
        name: 'SSAFY 면접 스터디',
        creatorId: 1,
        prompt: `SSAFY 면접 스터디를 시작하겠습니다.
        SSAFY 면접 스터디는 SSAFY 지원자들을 위한 스터디입니다.
        SSAFY 지원자들은 이 스터디를 통해 SSAFY 면접에 대비할 수 있습니다.
        `,
        voiceType: '여성',
        characterType: '어두운',
        modelType: 2,
        thumbnailUrl:
            'https://plus.unsplash.com/premium_photo-1677094310899-02303289cadf?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 2,
        name: '기술 면접 스터디',
        creatorId: 1,
        voiceType: '남성',
        characterType: '밝은',
        modelType: 3,
        thumbnailUrl:
            'https://images.unsplash.com/photo-1527430253228-e93688616381?q=80&w=2834&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 3,
        name: '코딩 테스트 스터디',
        creatorId: 1,
        voiceType: '여성',
        characterType: '중립적인',
        modelType: 1,
        thumbnailUrl:
            'https://plus.unsplash.com/premium_photo-1680509034814-e733c5f873ac?q=80&w=2827&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 4,
        name: 'Micheal',
        creatorId: 1,
        voiceType: '남성',
        characterType: '밝은',
        modelType: 2,
        thumbnailUrl:
            'https://images.unsplash.com/photo-1593349480506-8433634cdcbe?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 5,
        name: '세상을 놀라게 할 스터디 방법론 스터디',
        creatorId: 1,
        voiceType: '여성',
        characterType: '어두운',
        modelType: 3,
        thumbnailUrl:
            'https://plus.unsplash.com/premium_photo-1680700308578-b40c7418e997?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 6,
        name: 'Caroline',
        creatorId: 1,
        voiceType: '남성',
        characterType: '밝은',
        modelType: 2,
        thumbnailUrl:
            'https://plus.unsplash.com/premium_photo-1677094310899-02303289cadf?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 7,
        name: 'Bob',
        creatorId: 1,
        voiceType: '여성',
        characterType: '중립적인',
        modelType: 1,
        thumbnailUrl:
            'https://images.unsplash.com/photo-1527430253228-e93688616381?q=80&w=2834&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 8,
        name: '지금까지 이런 맛은 없었다 스터디',
        creatorId: 1,
        voiceType: '남성',
        characterType: '어두운',
        modelType: 3,
        thumbnailUrl:
            'https://plus.unsplash.com/premium_photo-1680509034814-e733c5f873ac?q=80&w=2827&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 9,
        name: 'Pamela',
        creatorId: 1,
        voiceType: '여성',
        characterType: '밝은',
        modelType: 2,
        thumbnailUrl:
            'https://images.unsplash.com/photo-1593349480506-8433634cdcbe?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 10,
        name: 'Nvidia',
        creatorId: 1,
        voiceType: '남성',
        characterType: '중립적인',
        modelType: 1,
        thumbnailUrl:
            'https://plus.unsplash.com/premium_photo-1680700308578-b40c7418e997?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 11,
        name: 'Ukjin',
        creatorId: 1,
        voiceType: '여성',
        characterType: '어두운',
        modelType: 1,
        thumbnailUrl:
            'https://images.unsplash.com/photo-1527430253228-e93688616381?q=80&w=2834&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 12,
        name: '최고의 스터디 방법론 스터디',
        creatorId: 1,
        voiceType: '남성',
        characterType: '밝은',
        modelType: 2,
        thumbnailUrl:
            'https://plus.unsplash.com/premium_photo-1677094310899-02303289cadf?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 13,
        name: 'Diamond',
        creatorId: 1,
        voiceType: '여성',
        characterType: '중립적인',
        modelType: 3,
        thumbnailUrl:
            'https://plus.unsplash.com/premium_photo-1680509034814-e733c5f873ac?q=80&w=2827&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 14,
        name: '최모더레이터2',
        creatorId: 1,
        voiceType: '남성',
        characterType: '밝은',
        modelType: 2,
        thumbnailUrl:
            'https://images.unsplash.com/photo-1593349480506-8433634cdcbe?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 15,
        name: '정모더레이터2',
        creatorId: 1,
        voiceType: '여성',
        characterType: '어두운',
        modelType: 3,
        thumbnailUrl:
            'https://plus.unsplash.com/premium_photo-1680700308578-b40c7418e997?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 16,
        name: '이모더레이터3',
        creatorId: 1,
        voiceType: '남성',
        characterType: '중립적인',
        modelType: 1,
        thumbnailUrl:
            'https://images.unsplash.com/photo-1527430253228-e93688616381?q=80&w=2834&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 17,
        name: '김모더레이터3',
        creatorId: 1,
        voiceType: '여성',
        characterType: '밝은',
        modelType: 2,
        thumbnailUrl:
            'https://plus.unsplash.com/premium_photo-1677094310899-02303289cadf?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 18,
        name: '박모더레이터3',
        creatorId: 1,
        voiceType: '남성',
        characterType: '어두운',
        modelType: 3,
        thumbnailUrl:
            'https://plus.unsplash.com/premium_photo-1680509034814-e733c5f873ac?q=80&w=2827&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 19,
        name: '최모더레이터3',
        creatorId: 1,
        voiceType: '여성',
        characterType: '밝은',
        modelType: 2,
        thumbnailUrl:
            'https://images.unsplash.com/photo-1593349480506-8433634cdcbe?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 20,
        name: '정모더레이터3',
        creatorId: 1,
        voiceType: '남성',
        characterType: '중립적인',
        modelType: 1,
        thumbnailUrl:
            'https://plus.unsplash.com/premium_photo-1680700308578-b40c7418e997?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
];

const ModeratorListPage = () => {
    const [moderators, setModerators] = useState<Moderator[]>(mockModerators);

    useEffect(() => {
        const fetchModerators = async () => {
            try {
                const response = await GET(`v1/moderators`, {
                    params: '',
                    isAuth: true,
                    revalidateTime: 10,
                });
                console.log('사회자 리스트 조회 성공:', response);
                setModerators(mockModerators);
            } catch (error) {
                console.error(error);
            }
        };
        fetchModerators();
    }, []);
    return <ModeratorTemplate moderators={moderators} />;
};

export default ModeratorListPage;
