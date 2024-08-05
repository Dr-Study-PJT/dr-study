import { IGroup } from '../../_api/ssr';
import { GroupData, ArticleData, ConferenceData, Member } from '../_types';

export interface Participant {
    id: number;
    email: string;
    nickname: string;
    imageUrl: string;
}

export interface Conference {
    id: number;
    title: string;
    startTime: string;
    finishTime: string | null;
    imageUrl: string | null;
    participants: Member[];
}

export const dummyConferencesWithMembers: Conference[] = [
    {
        id: 1,
        title: '일일 정기 면접 스터디',
        startTime: '10:00',
        finishTime: '11:30',
        imageUrl: null,
        participants: [
            {
                id: 1,
                email: 'he1236@ajou.ac.kr',
                nickname: '조성우',
                imageUrl: '/images/member_1.png',
            },
            {
                id: 2,
                email: 'lee5678@ajou.ac.kr',
                nickname: '이영호',
                imageUrl: '/images/member_2.png',
            },
            {
                id: 3,
                email: 'kim9012@ajou.ac.kr',
                nickname: '김철수',
                imageUrl: '/images/member_3.png',
            },
            {
                id: 4,
                email: 'park3456@ajou.ac.kr',
                nickname: '박민수',
                imageUrl: '/images/member_4.png',
            },
        ],
    },
    {
        id: 2,
        title: '주간 토론면접 대비 스터디',
        startTime: '14:30',
        finishTime: null,
        imageUrl: null,
        participants: [
            {
                id: 1,
                email: 'he1236@ajou.ac.kr',
                nickname: '조성우',
                imageUrl: '/images/member_1.png',
            },
            {
                id: 2,
                email: 'lee5678@ajou.ac.kr',
                nickname: '이영호',
                imageUrl: '/images/member_2.png',
            },
            {
                id: 3,
                email: 'kim9012@ajou.ac.kr',
                nickname: '김철수',
                imageUrl: '/images/member_3.png',
            },
            {
                id: 4,
                email: 'park3456@ajou.ac.kr',
                nickname: '박민수',
                imageUrl: '/images/member_4.png',
            },
        ],
    },
];

export const dummyGroupData: IGroup = {
    id: 1,
    name: '삼성전자 면접 스터디',
    imageUrl: '',
    createdAt: '2024-08-05T01:12:54.082Z',
    dueDate: '2024-08-07T01:12:54.082Z',
    isDeleted: false,
    description:
        '삼성전자 면접에 대비하는 스터디 그룹입니다. 주 2회정도 운영하며, 면접 스터디에 특화된 AI 사회자를 주로 사용합니다.',
    memberCount: 3,
    memberCapacity: 4,
    tags: ['정보처리기사', '교류'],
};

export const dummyGroupListData: IGroup[] = [
    {
        id: 1,
        name: '삼성전자 면접 스터디',
        imageUrl: '',
        createdAt: '2024-08-05T01:12:54.082Z',
        dueDate: '2024-08-07T01:12:54.082Z',
        isDeleted: false,
        description:
            '삼성전자 면접에 대비하는 스터디 그룹입니다. 주 2회정도 운영하며, 면접 스터디에 특화된 AI 사회자를 주로 사용합니다.',
        memberCount: 3,
        memberCapacity: 4,
        tags: ['정보처리기사', '교류'],
    },
    {
        id: 2,
        name: '삼성전자 면접 스터디',
        imageUrl: '',
        createdAt: '2024-08-05T01:12:54.082Z',
        dueDate: '2024-08-07T01:12:54.082Z',
        isDeleted: false,
        description:
            '삼성전자 면접에 대비하는 스터디 그룹입니다. 주 2회정도 운영하며, 면접 스터디에 특화된 AI 사회자를 주로 사용합니다.',
        memberCount: 3,
        memberCapacity: 4,
        tags: ['정보처리기사', '교류'],
    },
    {
        id: 3,
        name: '삼성전자 면접 스터디',
        imageUrl: '',
        createdAt: '2024-08-05T01:12:54.082Z',
        dueDate: '2024-08-07T01:12:54.082Z',
        isDeleted: false,
        description:
            '삼성전자 면접에 대비하는 스터디 그룹입니다. 주 2회정도 운영하며, 면접 스터디에 특화된 AI 사회자를 주로 사용합니다.',
        memberCount: 3,
        memberCapacity: 4,
        tags: ['정보처리기사', '교류'],
    },
];

export const dummyMembersData: Member[] = [
    {
        id: 1,
        email: 'he1236@ajou.ac.kr',
        nickname: '조성우',
        imageUrl: '/images/member_1.png',
    },
    {
        id: 2,
        email: 'he1236@ajou.ac.kr',
        nickname: '신재민',
        imageUrl: '/images/member_2.png',
    },
    {
        id: 3,
        email: 'he1236@ajou.ac.kr',
        nickname: '장철현',
        imageUrl: '/images/member_3.png',
    },
];

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
            email: 'he1236@ajou.ac.kr',
            nickname: '조성우',
            imageUrl: '/images/member_1.png',
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
            email: 'he1236@ajou.ac.kr',
            nickname: '조성우',
            imageUrl: '/images/member_1.png',
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
            email: 'he1236@ajou.ac.kr',
            id: 1,
            nickname: '조성우',
            imageUrl: '/images/member_1.png',
        },
    },
];
