// src/store/slices/memberSlice.ts
import { IMemberData } from '@/interfaces/members';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IMemberData = {
    id: 0,
    email: '',
    nickname: '',
};

const memberSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {
        setMemberState: (state, action: PayloadAction<IMemberData>) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.nickname = action.payload.nickname;
        },
        clearMemberState: (state) => {
            state.id = 0;
            state.email = '';
            state.nickname = '';
        },
    },
});

export const { setMemberState, clearMemberState } = memberSlice.actions;
export default memberSlice.reducer;
