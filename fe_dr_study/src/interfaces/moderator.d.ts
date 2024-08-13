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
    creator: Member;
    modelType: string;
    voiceType: string;
    characterType: string;
}

// export interface Moderator {
//     id: number;
//     name: string;
//     creatorId: number;
//     prompt?: string;
//     voiceType: string; // 목소리
//     characterType: string; // 어조
//     modelType: number; // 모델
//     thumbnailUrl: string;
// }
