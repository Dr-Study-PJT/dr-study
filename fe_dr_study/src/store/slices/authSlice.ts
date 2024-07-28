import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum TIsSigned {
    F = 'F',
    T = 'T',
}

interface AuthState {
    isSigned: TIsSigned;
}

const initialState: AuthState = {
    isSigned: TIsSigned.F,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsSigned: (state, action: PayloadAction<TIsSigned>) => {
            state.isSigned = action.payload;
        },
    },
});

export const { setIsSigned } = authSlice.actions;
export default authSlice.reducer;
