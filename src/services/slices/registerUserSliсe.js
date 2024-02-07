import { createSlice } from '@reduxjs/toolkit';
import { fetchRegister } from '../thunks/registerUserThunk';

export const initialState = {
	email: '',
	isRegister: false,
	isLoadingRegister: false,
	errorRegister: false,
	errorMessageRegister: '',
};

const registerUserSlice = createSlice({
	name: 'registerUser',
	initialState,
	reducers: {
		setIsRegister: (state) => {
			state.isRegister = false;
		},
		clearRegisterError: (state) => {
			state.errorRegister = false;
			state.errorMessageRegister = '';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRegister.fulfilled, (state, action) => {
				state.email = action.payload;
				state.isRegister = true;
				state.isLoadingRegister = false;
				state.errorRegister = false;
			})
			.addCase(fetchRegister.pending, (state) => {
				state.isRegister = false;
				state.isLoadingRegister = true;
				state.errorRegister = false;
			})
			.addCase(fetchRegister.rejected, (state, action) => {
				state.isRegister = false;
				state.isLoadingRegister = false;
				state.errorRegister = true;
				state.errorMessageRegister =
					action.error.message || 'Произошла неизвестная ошибка';
			});
	},
});

export const { setIsRegister, clearRegisterError } = registerUserSlice.actions;
export default registerUserSlice.reducer;
