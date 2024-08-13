import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// isAvatarSpeakingState 정의
interface isAvatarSpeakingState {
    isAvatarSpeaking: boolean;
}

const initialState: isAvatarSpeakingState = {
    isAvatarSpeaking: false,
};

const isAvatarSpeakingSlice = createSlice({
    name: 'isAvatarSpeaking',
    initialState,
    reducers: {
        setIsAvatarSpeaking: (state, actions) => {
            state.isAvatarSpeaking = actions.payload;
        },
    },
});

export const { setIsAvatarSpeaking } = isAvatarSpeakingSlice.actions;
export default isAvatarSpeakingSlice.reducer;
