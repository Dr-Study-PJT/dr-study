import { IMemberInfo } from '@/store/slices/memberSlice';

// 기존 인터페이스 정의
export interface INotificationApplicant {
    id: number;
    email: string;
    nickname: string;
    imageUrl: string;
    regDate: string;
    leavedDate: string | null;
    leaved: boolean;
}

export interface INotificationItemStudyGroupApplication {
    applicationId: number;
    applicant: INotificationApplicant;
    applyMessage: string | null;
    groupId: number;
    groupName: string;
}

export interface INotificationItemConferenceInvitation {
    conferenceId: number;
    groupId: number;
    title: string;
}

// 새로운 인터페이스 정의
export interface INotificationItemStudyGroupApplicationReply {
    applicationId: number;
    isApproved: boolean;
    replyMessage: string;
    groupId: number;
    groupName: string;
}

// 알림 데이터 타입 정의
export interface StudyGroupApplicationNotificationData {
    itemType: 'StudyGroupApplication';
    createdAt: string;
    imageUrl: string;
    itemInfo: INotificationItemStudyGroupApplication;
}

export interface ConferenceInvitationNotificationData {
    id: number;
    itemType: 'ConferenceInvitation';
    createdAt: string;
    imageUrl: string;
    itemInfo: INotificationItemConferenceInvitation;
}

export interface StudyGroupApplicationReplyNotificationData {
    id: number;
    itemType: 'StudyGroupApplicationReply';
    createdAt: string;
    imageUrl: string;
    itemInfo: INotificationItemStudyGroupApplicationReply;
}

// 통합 타입 정의
export type NotificationData =
    | StudyGroupApplicationNotificationData
    | ConferenceInvitationNotificationData
    | StudyGroupApplicationReplyNotificationData;

export interface NotificationsResponse {
    message: string;
    data: NotificationData[];
}

export interface NavigationLinksProps {
    pathname: string;
}

export interface ProfileDropDownProps {
    memberData: IMemberInfo;
    toggleDropdown: () => void;
    onClickSetLogout: () => void;
    profileImageBoxRef: React.RefObject<HTMLDivElement>;
}
