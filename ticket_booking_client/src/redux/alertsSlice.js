import { createSlice } from '@reduxjs/toolkit';
const alertsSlice = createSlice({
	name: "alert",
	initialState: {
		loading: false,
	},
	reducers: {
		Showloading: (state, action) => {
			state.loading = true;
		},
		HideLoading: (state, action) => {
			state.loading = false;
		}
	}
});

export const { Showloading, HideLoading } = alertsSlice.actions;

export default alertsSlice.reducer;