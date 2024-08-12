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
    phase: number;
    content: string; // 이 부분은 필요에 따라 수정 가능
    programme: ProgrammeInterface[];
}

const initialState: ConferenceProgressState = {
    phase: 0,
    content: '',
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
        setNextStep: (
            state,
            action: PayloadAction<ConferenceProgressState>,
        ) => {
            state.phase = action.payload.phase;
            state.content = action.payload.content;
        },

        setFullPhase: (state, action: PayloadAction<SignalInterface>) => {
            console.log('action.payload.programme:', action.payload.programme);
            state.programme = action.payload.programme;
        },
    },
});

export const { setNextStep, setFullPhase } = conferenceProgressSlice.actions;
export default conferenceProgressSlice.reducer;
