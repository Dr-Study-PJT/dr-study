import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConferenceProgressState {
    phase: number;
    content: string;
    programme: {
        phase: number;
        content: string;
    }[];
}

const initialState: ConferenceProgressState = {
    phase: 0,
    content: '',
    programme: [
        {
            phase: 0,
            content: '',
        },
    ],
};

const conferenceProgressSlice = createSlice({
    name: 'conferenceStep',
    initialState,
    reducers: {
        setNextStep: (
            state,
            action: PayloadAction<ConferenceProgressState>,
        ) => {
            state.phase = action.payload.phase;
            state.content = action.payload.content;
        },

        setFullPhase: (
            state,
            action: PayloadAction<ConferenceProgressState>,
        ) => {
            state.programme = action.payload.programme;
        },
    },
});

export const { setNextStep, setFullPhase } = conferenceProgressSlice.actions;
export default conferenceProgressSlice.reducer;
