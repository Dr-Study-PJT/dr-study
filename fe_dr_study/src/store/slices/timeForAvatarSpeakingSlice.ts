import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// timeForAvatarSpeakingState 정의
interface timeForAvatarSpeakingState {
    timeForAvatarSpeaking: number;
}

const initialState: timeForAvatarSpeakingState = {
    timeForAvatarSpeaking: 0,
};

const timeForAvatarSpeakingSlice = createSlice({
    name: 'timeForAvatarSpeaking',
    initialState,
    reducers: {
        setTimeForAvatarSpeaking: (state, actions) => {
            state.timeForAvatarSpeaking = actions.payload;
        },
    },
});

export const { setTimeForAvatarSpeaking } = timeForAvatarSpeakingSlice.actions;
export default timeForAvatarSpeakingSlice.reducer;
