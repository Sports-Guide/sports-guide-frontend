import { createSlice } from '@reduxjs/toolkit';
import { fetchRegister } from '../thunks/registerUserThunk';

export const initialState = {
	isRegister: false,
	isLoadingRegister: false,
	errorRegister: false,
	errorMessageRegister: '',
};

const registerUserSlice = createSlice({
	name: 'registerUser',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchRegister.fulfilled, (state) => {
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

export default registerUserSlice.reducer;
