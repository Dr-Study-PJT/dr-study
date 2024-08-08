import { IMemberInfo } from '@/store/slices/memberSlice';

export interface InvitationNotificationItem {
    conferenceId: number;
    memberId: number;
    createdAt: string;
}
export interface ApplicationNotificationItem {
    memberId: number;
    groupId: number;
    applicationStatus: 'WAITING' | 'APPROVED' | 'REJECTED';
    message: string;
    createdAt: string;
}

export interface InvitationNotificationData {
    notificationItemType: 'Invitation';
    createdAt: string;
    notificationItem: InvitationNotificationItem;
}

export interface ApplicationNotificationData {
    notificationItemType: 'Application';
    createdAt: string;
    notificationItem: ApplicationNotificationItem;
}

export type NotificationData =
    | InvitationNotificationData
    | ApplicationNotificationData;

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
