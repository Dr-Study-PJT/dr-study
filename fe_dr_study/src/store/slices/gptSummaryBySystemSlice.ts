import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// gptSummaryBySystemState 정의
interface gptSummaryBySystemState {
    gptSummaryBySystem: string;
}

const initialState: gptSummaryBySystemState = {
    gptSummaryBySystem: '',
};

const gptSummaryBySystemSlice = createSlice({
    name: 'gptSummaryBySystem',
    initialState,
    reducers: {
        setGptSummaryBySystem: (state, actions) => {
            state.gptSummaryBySystem = actions.payload;
        },
    },
});

export const { setGptSummaryBySystem } = gptSummaryBySystemSlice.actions;
export default gptSummaryBySystemSlice.reducer;
