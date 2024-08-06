import { GET } from '@/app/api/routeModule';
import { GroupWithMembersData } from '../_types';

export const fetchGroupWithMembersData = async (groupId: string) => {
    'use server';
    interface GroupData {
        id: number | string;
        name: string;
        imageUrl: string;
        createdAt: string;
        dueDate: string;
        isDeleted: boolean;
        description: string;
        memberCount: number;
        memberCapacity: number;
        tags: string[];
        members?: Member[];
    }

    interface Member {
        id: number;
        email: string;
        nickname: string;
        regDate: string;
        isLeaved: boolean;
        LeavedDate: string;
        imageUrl: string;
    }

    console.log('페칭시도');

    try {
        // 그룹 정보 요청
        const response_group = await GET('v1/groups', {
            params: groupId,
            isAuth: false,
            revalidateTime: 0,
        });
        const groupData = response_group.data;
        console.log(groupData);

        // 그룹 멤버 정보 요청
        const response_groupMembers = await GET(
            `v1/groups/${groupId}/members`,
            {
                params: '',
                isAuth: true,
                revalidateTime: 30,
            },
        );

        // console.log(response_groupMembers.members);

        const groupMembersData = response_groupMembers;
        const { data: members } = groupMembersData;

        // 데이터 통합
        const groupWithMembers: GroupWithMembersData = {
            ...groupData,
            members: members || [], // members가 없을 경우 빈 배열로 설정
        };
        console.log('groupWithMembers======');
        console.log(groupWithMembers);

        return groupWithMembers;
    } catch (error) {
        console.error('Error fetching groupWithMembers data:', error);
        // 오류 시 더미 데이터 반환
        return {
            id: groupId,
            name: '',
            imageUrl: '',
            createdAt: '',
            dueDate: '',
            isDeleted: false,
            description: '',
            memberCount: 0,
            memberCapacity: 0,
            tags: [],
            members: [], // 오류 시 빈 배열 설정
        };
    }
};
