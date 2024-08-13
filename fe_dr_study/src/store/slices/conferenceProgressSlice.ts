import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// SignalInterface 정의
interface ContentInterface {
    nickname: string;
    time: number;
}

interface ProgrammeInterface {
    phase: number;
    content: ContentInterface;
}

interface SignalInterface {
    programme: ProgrammeInterface[];
}

// ConferenceProgressState 정의
interface ConferenceProgressState {
    step: number;
    programme?: ProgrammeInterface[];
}

const initialState: ConferenceProgressState = {
    step: 0,
    programme: [
        {
            phase: 0,
            content: {
                nickname: '',
                time: -1,
            },
        },
    ],
};

const conferenceProgressSlice = createSlice({
    name: 'conferenceStep',
    initialState,
    reducers: {
        setNextStep: (state) => {
            state.step++;
        },

        setFullPhase: (state, action: PayloadAction<SignalInterface>) => {
            console.log('action.payload.programme:', action.payload.programme);
            state.programme = action.payload.programme;
        },
    },
});

export const { setNextStep, setFullPhase } = conferenceProgressSlice.actions;
export default conferenceProgressSlice.reducer;
