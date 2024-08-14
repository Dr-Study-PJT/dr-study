import { Member } from '@/app/group/[group_id]/_types';

export interface Member {
    id: number;
    email: string;
    nickname: string;
    imageUrl: string;
    regDate: string;
    leavedDate: string | null;
    leaved: boolean;
}

interface Moderator {
    id: number;
    name: string;
    description: string;
    prePrompt: string;
    script: string;
    createdAt: string;
    modelType: string;
    voiceType: string;
    characterType: string;
    creator: Member;
}
