import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// isCloseSignalSliceState 정의
interface isCloseSignalSliceState {
    isCloseSignal: number;
}

const initialState: isCloseSignalSliceState = {
    isCloseSignal: 0,
};

const isCloseSignalSlice = createSlice({
    name: 'isCloseSignal',
    initialState,
    reducers: {
        setIsCloseSignal: (state, actions) => {
            state.isCloseSignal = actions.payload;
        },
    },
});

export const { setIsCloseSignal } = isCloseSignalSlice.actions;
export default isCloseSignalSlice.reducer;
