interface Participant {
    id: number;
    email: string;
    nickname: string;
    imageUrl: string;
    regDate: string;
    leavedDate: string | null;
    leaved: boolean;
}

export interface IConference {
    id: number;
    hostId: number;
    studyGroupId: number;
    title: string;
    subject: string;
    imageUrl: string;
    startTime: string | null | undefined;
    finishTime: string | null | undefined;
    openTime: string | null | undefined;
    closeTime: string | null | undefined;
    memberCapacity: number;
    participants: Participant[];
}
