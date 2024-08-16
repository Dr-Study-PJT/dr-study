import { SummaryMessageInterface } from '@/components/template/conference/ConferenceTemplate';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// summaryMessagesState 정의
interface summaryMessagesState {
    summaryMessages: SummaryMessageInterface[];
}

const initialState: summaryMessagesState = {
    summaryMessages: [],
};

const summaryMessagesSlice = createSlice({
    name: 'summaryMessages',
    initialState,
    reducers: {
        pushSummaryMessages: (state, actions) => {
            state.summaryMessages.push(actions.payload);
        },
        initSummaryMessages: (state) => {
            state.summaryMessages = [];
        },
    },
});

export const { pushSummaryMessages, initSummaryMessages } =
    summaryMessagesSlice.actions;
export default summaryMessagesSlice.reducer;
