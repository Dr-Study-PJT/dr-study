export interface ConferenceData {
    id: number;
    hostId: number;
    studyGroupId: number;
    title: string;
    subject: string;
    memberCapacity: number;
    openTime: Date | null;
    closeTime: Date | null;
    startTime: Date | null;
    finishTime: Date | null;
    imageUrl: string;
    participants: Participant[];
}

export interface Participant {
    id: number;
    email: string;
    nickname: string;
    imageUrl: string;
    regDate: Date | null;
    leavedDate: Date | null;
    leaved: boolean;
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
