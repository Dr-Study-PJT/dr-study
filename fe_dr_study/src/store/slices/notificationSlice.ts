import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
    id: number;
    content: string;
}

interface NotificationState {
    notifications: Notification[];
}

const initialState: NotificationState = {
    notifications: [],
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotifications: (state, action: PayloadAction<Notification[]>) => {
            state.notifications = action.payload;
        },

        // 특정 ID의 알림 제거 리듀서
        removeCheckedNotification: (state, action: PayloadAction<number>) => {
            state.notifications = state.notifications.filter(
                (notification) => notification.id !== action.payload,
            );
        },
    },
});

// 액션과 리듀서를 내보냄
export const { setNotifications, removeCheckedNotification } =
    notificationSlice.actions;
export default notificationSlice.reducer;
