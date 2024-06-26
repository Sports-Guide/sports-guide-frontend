import { createSlice } from '@reduxjs/toolkit';
import { TModalState } from '../../utils/types';

const initialState: TModalState = {
	isOpen: false,
	type: null, // 'login', 'register', 'passwordRecovery'
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state, action) => {
			state.isOpen = true;
			state.type = action.payload;
		},
		closeModal: (state) => {
			state.isOpen = false;
			state.type = null;
		},
	},
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
