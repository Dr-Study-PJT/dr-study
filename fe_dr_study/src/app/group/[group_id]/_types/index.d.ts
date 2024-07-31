export interface GroupData {
    id: string;
    title: string;
    created_at: string;
    due_date: string;
    description: string;
    thumbnailUrl: string;
    members: Member[];
}

export interface Member {
    id: number;
    nickname: string;
    avatarUrl: string;
}

export interface ArticleData {
    id: number;
    title: string;
    content: string;
    tags: string[];
    timeAgo: string;
    member: Member;
}

export interface ConferenceData {
    id: number;
    title: string;
    isEnd: boolean;
    startTime: string;
    targetEndTime: string;
    participants: Member[];
}

export interface IGroupAdmissionApplyReq {
    groupId: string;
    message: string;
}
