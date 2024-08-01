export interface Member {
    id: number;
    email: string;
    nickname: string;
    imageUrl: string;
}

export interface ArticleData {
    id: number;
    title: string;
    content: string;
    tags: string[];
    timeAgo: string;
    member: Member;
}

export interface GroupData {
    id: string;
    name: string;
    imageUrl: '';
    createdAt: string;
    dueDate: string;
    isDeleted: boolean;
    description: string;
    memberCount: number;
    memberCapacity: number;
    tags: string[];
}

export interface GroupWithMembersData {
    id: string | number;
    name: string;
    imageUrl: '';
    createdAt: string;
    dueDate: string;
    isDeleted: boolean;
    description: string;
    memberCount: number;
    memberCapacity: number;
    tags: string[];
    members: Member[];
}

export interface ConferenceData {
    id: number;
    title: string;
    // isEnd: boolean;
    // startTime: string;
    // targetEndTime: string;
    participants: Member[];
    MemberCapacity: number;
}

export interface ConferenceWithMembersData {
    id: number;
    title: string;
    MemberCapacity: number;
    participants: Member[];
}

export interface IGroupAdmissionApplyReq {
    groupId: string;
    message: string;
}
