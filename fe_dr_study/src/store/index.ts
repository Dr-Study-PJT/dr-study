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
import summaryMessagesReducer from './slices/summaryMessagesSlice';
import avatarDialogueReducer from './slices/avatarDialogueSlice';
import timeForAudioReducer from './slices/timeForAudioRecord';
import closeSignalReducer from './slices/isCloseSignalSlice';
import showTextAudioMessageBoxReducer from './slices/showTextAudioMessageBoxSlice';

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
        summaryMessagesSlice: summaryMessagesReducer,
        avatarDialogueSlice: avatarDialogueReducer,
        timeForAudioRecord: timeForAudioReducer,
        closeSignalSlice: closeSignalReducer,
        showTextAudioMessageBoxSlice: showTextAudioMessageBoxReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
