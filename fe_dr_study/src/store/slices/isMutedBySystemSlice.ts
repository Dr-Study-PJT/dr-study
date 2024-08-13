import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// isMutedBySystemState 정의
interface isMutedBySystemState {
    isMutedBySystem: boolean;
}

const initialState: isMutedBySystemState = {
    isMutedBySystem: false,
};

const isMutedBySystemSlice = createSlice({
    name: 'isMutedBySystem',
    initialState,
    reducers: {
        setIsMutedBySystem: (state, actions) => {
            state.isMutedBySystem = actions.payload;
        },
    },
});

export const { setIsMutedBySystem } = isMutedBySystemSlice.actions;
export default isMutedBySystemSlice.reducer;
