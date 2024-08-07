export interface Moderator {
    id: number;
    name: string;
    creatorId: number;
    prompt?: string;
    voiceType: string; // 목소리
    characterType: string; // 어조
    modelType: number; // 모델
    thumbnailUrl: string;
}
