'use server';

import { GET } from '@/app/api/routeModule';
import { GroupWithMembersData } from '../_types';

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

interface GroupMember {
    memberInfo: Member;
    role: 'CAPTAIN' | 'MEMBER';
    joinDate: string;
}

export const fetchGroupWithMembersData = async (groupId: string) => {
    // 'use server';

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

        const groupMembersData = response_groupMembers;
        const { data: members } = groupMembersData;

        const groupWithMembers: GroupWithMembersData = {
            ...groupData,
            members: members || [],
        };
        console.log('groupWithMembers======');
        console.log(groupWithMembers);

        return groupWithMembers;
    } catch (error) {
        console.error('Error fetching groupWithMembers data:', error);
    }
};

export const getGroupMembers = async (
    groupId: string,
): Promise<GroupMember[]> => {
    // 'use server';
    try {
        const response_members = await GET(`v1/groups/${groupId}/members`, {
            isAuth: true,
            revalidateTime: 0,
        });

        const membersData: GroupMember[] = response_members.data;
        console.log('그룹멤버 GET');
        console.log(membersData);
        return membersData;
    } catch (error) {
        console.error('에러;; 그룹멤버:', error);
        return [];
    }
};
