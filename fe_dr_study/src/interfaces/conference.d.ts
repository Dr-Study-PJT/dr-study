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
    participants: ConferenceMember[];
}

export interface ConferenceMember {
    role: string;
    joinDate: string;
    memberInfo: {
        id: number;
        email: string;
        nickname: string;
        imageUrl: string;
        regDate: Date;
        leavedDate: Date;
        leaved: boolean;
    };
}
