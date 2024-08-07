import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IMemberInfo {
    id: number | null;
    email: string | null;
    nickname: string | null;
    imageUrl: string;
}

const initialState: IMemberInfo = {
    id: 0,
    email: '',
    nickname: '',
    imageUrl: '',
};

const memberSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {
        setMemberState: (state, action: PayloadAction<IMemberInfo>) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.nickname = action.payload.nickname;
            state.imageUrl = action.payload.imageUrl;
        },
        clearMemberState: (state) => {
            state.id = null;
            state.email = null;
            state.nickname = null;
            state.imageUrl = '';
        },
    },
});

export const { setMemberState, clearMemberState } = memberSlice.actions;
export default memberSlice.reducer;
