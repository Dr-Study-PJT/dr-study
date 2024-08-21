export const URLs = {
    LOGIN: (errorToast?: string) =>
        `/auth/login${errorToast ? `?error=${errorToast}` : ''}`,
    GROUP: (studyGroupId: string, errorToast?: string) =>
        `/group/${studyGroupId.toString()}${errorToast ? `?error=${errorToast}` : ''}`,
    CONFERENCE_WAITING_ROOM: (conferenceId: string, errorToast?: string) =>
        `/conference/${conferenceId}/waiting-room${errorToast ? `?error=${errorToast}` : ''}`,
    NOT_FOUND: (currentUrl: string) => `${currentUrl}/not-found`,
};
