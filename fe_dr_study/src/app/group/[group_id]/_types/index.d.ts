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
    title: string;
    content: string;
    tags: string[];
    timeAgo: string;
    member: Member;
}

export interface ConferenceData {
    title: string;
    isEnd: boolean;
    startTime: string;
    targetEndTime: string;
    participants: Member[];
}
