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
    },
});

export const { setMemberState } = memberSlice.actions;
export default memberSlice.reducer;
