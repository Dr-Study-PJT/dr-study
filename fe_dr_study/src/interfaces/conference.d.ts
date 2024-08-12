// conference: {
//     moderatorInfo: {
//         id: number,
//         name: string,
//         description,
//         avatarId:
//         avatarModelType
//         avatarVoiceType
//         avatarCharactorType
//     }
// }
// moderator : {
//     id
//     name
//     description
//     prePrompt
//     script
//     createdAt
//     creator: {
//         멤버규약
//     }
// }

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
    moderatorInfo: IModeratorInConf;
}
export interface IModeratorInConf {
    id: number;
    name: string;
    description: string;
    avatarId: number;
    avatarModelType: string;
    avatarVoiceType: string;
    avatarCharacterType: string;
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
