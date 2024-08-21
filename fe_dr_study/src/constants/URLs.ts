export const URLs = {
    LOGIN: '/auth/login',
    GROUP: (studyGroupId: string, errorToast?: string) =>
        `/group/${studyGroupId.toString()}${errorToast ? `?error=${errorToast}` : ''}`,
    CONFERENCE_WAITING_ROOM: (conferenceId: string, errorToast?: string) =>
        `/conference/${conferenceId}/waiting-room${errorToast ? `?error=${errorToast}` : ''}`,
};
