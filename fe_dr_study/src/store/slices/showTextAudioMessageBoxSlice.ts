import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// showTextAudioMessageBoxState 정의
interface showTextAudioMessageBoxState {
    showTextAudioMessageBox: boolean;
}

const initialState: showTextAudioMessageBoxState = {
    showTextAudioMessageBox: false,
};

const showTextAudioMessageBoxSlice = createSlice({
    name: 'showTextAudioMessageBox',
    initialState,
    reducers: {
        setShowTextAudioMessageBoxSlice: (state, actions) => {
            state.showTextAudioMessageBox = actions.payload;
        },
    },
});

export const { setShowTextAudioMessageBoxSlice } =
    showTextAudioMessageBoxSlice.actions;
export default showTextAudioMessageBoxSlice.reducer;
