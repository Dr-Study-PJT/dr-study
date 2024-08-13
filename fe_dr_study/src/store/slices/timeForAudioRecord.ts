import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// timeForAudioRecordState 정의
interface timeForAudioRecordState {
    timeForAudioRecord: number;
}

const initialState: timeForAudioRecordState = {
    timeForAudioRecord: 0,
};

const timeForAudioRecordSlice = createSlice({
    name: 'timeForAudioRecord',
    initialState,
    reducers: {
        setTimeForAudioRecord: (state, actions) => {
            state.timeForAudioRecord = actions.payload;
        },
    },
});

export const { setTimeForAudioRecord } = timeForAudioRecordSlice.actions;
export default timeForAudioRecordSlice.reducer;
