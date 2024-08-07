'use client';

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
    leavedDate: string;
    imageUrl: string;
}

export interface GroupMember {
    memberInfo: Member;
    role: 'CAPTAIN' | 'MEMBER';
    joinDate: string;
}

export const fetchGroupWithMembersData = async (groupId: string) => {
    try {
        const response_group = await GET('v1/groups', {
            params: groupId,
            isAuth: false,
            revalidateTime: 0,
        });
        const groupData = response_group.data;

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

        return groupWithMembers;
    } catch (error) {
        console.error('Error fetching groupWithMembers data:', error);
        throw error;
    }
};

export const getGroupMembers = async (
    groupId: string,
): Promise<GroupMember[]> => {
    try {
        const response_members = await GET(`v1/groups/${groupId}/members`, {
            isAuth: true,
            revalidateTime: 0,
        });

        const membersData: GroupMember[] = response_members.data;
        return membersData;
    } catch (error) {
        console.error('Error fetching group members:', error);
        return [];
    }
};
