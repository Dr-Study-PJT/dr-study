import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// conferenceFocusingPeerIdState 정의
interface conferenceFocusingPeerIdState {
    focusingPeerId: number;
}

const initialState: conferenceFocusingPeerIdState = {
    focusingPeerId: 0,
};

const conferenceFocusingPeerIdSlice = createSlice({
    name: 'focusingPeerId',
    initialState,
    reducers: {
        setFocusingId: (state, actions) => {
            state.focusingPeerId = actions.payload;
        },
    },
});

export const { setFocusingId } = conferenceFocusingPeerIdSlice.actions;
export default conferenceFocusingPeerIdSlice.reducer;
