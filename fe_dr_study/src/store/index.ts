import { configureStore } from '@reduxjs/toolkit';
import memberReducer from './slices/memberSlice';
import authReducer from './slices/authSlice';
import modalReducer from './slices/modalSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
    reducer: {
        member: memberReducer,
        auth: authReducer,
        modal: modalReducer,
        notification: notificationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
