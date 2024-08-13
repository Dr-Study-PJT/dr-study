import { SummaryMessageInterface } from '@/components/template/conference/ConferenceTemplate';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// avatarDialogueState 정의
interface avatarDialogueState {
    avatarDialogueSlice: string;
}

const initialState: avatarDialogueState = {
    avatarDialogueSlice: '',
};

const avatarDialogueSlice = createSlice({
    name: 'avatarDialogueSlice',
    initialState,
    reducers: {
        setAvatarDialogue: (state, actions) => {
            state.avatarDialogueSlice = actions.payload;
        },
    },
});

export const { setAvatarDialogue } = avatarDialogueSlice.actions;
export default avatarDialogueSlice.reducer;
