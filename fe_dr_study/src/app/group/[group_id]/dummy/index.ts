import { GroupData, ArticleData, ConferenceData } from '../_types';

export const dummyConferenceListData: ConferenceData[] = [
    {
        id: 1,
        title: '일일 정기 면접 스터디',
        isEnd: true,
        startTime: '10:00',
        targetEndTime: '11:30',
        participants: [
            { id: 1, nickname: '조성우', avatarUrl: '/images/member_1.png' },
            { id: 1, nickname: '조성우', avatarUrl: '/images/member_1.png' },
            { id: 1, nickname: '조성우', avatarUrl: '/images/member_1.png' },
            { id: 1, nickname: '조성우', avatarUrl: '/images/member_1.png' },
        ],
    },
    {
        id: 1,
        title: '주간 토론면접 대비 스터디',
        isEnd: false,
        startTime: '14:30',
        targetEndTime: '16:30',
        participants: [
            { id: 1, nickname: '조성우', avatarUrl: '/images/member_1.png' },
            { id: 1, nickname: '조성우', avatarUrl: '/images/member_1.png' },
            { id: 1, nickname: '조성우', avatarUrl: '/images/member_1.png' },
            { id: 1, nickname: '조성우', avatarUrl: '/images/member_1.png' },
        ],
    },
];

export const dummyGroupData: GroupData = {
    id: '1',
    title: '삼성전자 면접 스터디',
    created_at: '2024.07.22',
    due_date: '2024.08.16',
    description:
        '삼성전자 면접에 대비하는 스터디 그룹입니다. 주 2회정도 운영하며, 면접 스터디에 특화된 AI 사회자를 주로 사용합니다.',
    thumbnailUrl: '',
    members: [
        { id: 1, nickname: '조성우', avatarUrl: '/images/member_1.png' },
        { id: 2, nickname: '신재민', avatarUrl: '/images/member_2.png' },
        { id: 3, nickname: '장철현', avatarUrl: '/images/member_3.png' },
    ],
};

export const dummyArticlesData: ArticleData[] = [
    {
        id: 1,
        title: '스터디 운영방식에 대한 논의 필요성',
        content:
            '지금까지 1달 가량 스터디를 진행해왔는데, 스터디 방식에 대한 고민과 개선의 필요성을 느껴',
        tags: ['스터디 운영', '공지사항'],
        timeAgo: '3시간 전',
        member: {
            id: 1,
            nickname: '조성우',
            avatarUrl: '/images/member_1.png',
        },
    },
    {
        id: 2,
        title: '스터디 운영방식에 대한 논의 필요성',
        content:
            '지금까지 1달 가량 스터디를 진행해왔는데, 스터디 방식에 대한 고민과 개선의 필요성을 느껴',
        tags: ['스터디 운영', '공지사항'],
        timeAgo: '3시간 전',
        member: {
            id: 1,
            nickname: '조성우',
            avatarUrl: '/images/member_1.png',
        },
    },
    {
        id: 3,
        title: '스터디 운영방식에 대한 논의 필요성',
        content:
            '지금까지 1달 가량 스터디를 진행해왔는데, 스터디 방식에 대한 고민과 개선의 필요성을 느껴',
        tags: ['스터디 운영', '공지사항'],
        timeAgo: '3시간 전',
        member: {
            id: 1,
            nickname: '조성우',
            avatarUrl: '/images/member_1.png',
        },
    },
];
