import { configureStore } from '@reduxjs/toolkit';
import memberReducer from './slices/memberSlice';
import authReducer from './slices/authSlice';
import modalReducer from './slices/modalSlice';
import notificationReducer from './slices/notificationSlice';
import conferenceProgressReducer from './slices/conferenceProgressSlice';
import focusingPeerIdReducer from './slices/conferenceFocusingPeerIdSlice';
import isAvatarSpeakingReducer from './slices/isAvatarSpeakingSlice';
import timeForAvatarSpeakingReducer from './slices/timeForAvatarSpeakingSlice';
import isMutedBySystemReducer from './slices/isMutedBySystemSlice';
import gptSummaryBySystemReducer from './slices/gptSummaryBySystemSlice';
import summaryMessagesSlice from './slices/summaryMessagesSlice';

export const store = configureStore({
    reducer: {
        member: memberReducer,
        auth: authReducer,
        modal: modalReducer,
        notification: notificationReducer,
        conferenceProgress: conferenceProgressReducer,
        focusingPeerId: focusingPeerIdReducer,
        isAvatarSpeaking: isAvatarSpeakingReducer,
        timeForAvatarSpeaking: timeForAvatarSpeakingReducer,
        isMutedBySystem: isMutedBySystemReducer,
        gptSummaryBySystemSlice: gptSummaryBySystemReducer,
        summaryMessagesSlice: summaryMessagesSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
