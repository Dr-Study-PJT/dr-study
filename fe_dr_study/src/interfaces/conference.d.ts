export interface ConferenceData {
    id: number;
    hostId: number;
    studyGroupId: number;
    title: string;
    subject: string;
    memberCapacity: number;
    startTime: string;
    finishTime: string;
    imageUrl: string;
}

export interface ConferenceMember {
    id: number;
    nickname: string;
    imageId: string;
    imageUrl: string;
    role: string;
    joinDate: string;
}
