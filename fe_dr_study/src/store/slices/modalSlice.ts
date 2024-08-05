import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
    isOpen: boolean;
    content: string;
}

const initialState: ModalState = {
    isOpen: false,
    content: '',
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setCloseModal: (state) => {
            state.isOpen = false;
        },

        setIsModalOpen: (state) => {
            state.isOpen = !state.isOpen;
        },
        setModalContent: (state, action: PayloadAction<string>) => {
            state.content = action.payload;
        },
    },
});

export const { setIsModalOpen, setCloseModal, setModalContent } =
    modalSlice.actions;
export default modalSlice.reducer;
