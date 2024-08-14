import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// conferenceFocusingPeerIdState 정의
interface conferenceFocusingPeerIdState {
    focusingPeerId: string;
}

const initialState: conferenceFocusingPeerIdState = {
    focusingPeerId: '',
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
