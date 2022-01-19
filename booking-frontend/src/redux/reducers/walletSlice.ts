import { createSlice } from "@reduxjs/toolkit";

const PREFIX = "wallet";

const initialState = {
    error: "",
    address: "",
    isLoading: false
};

export const walletSlice = createSlice({
    name: PREFIX,
    initialState,
    reducers: {
        setWalletAddress: (state, action) => {
            state.address = action.payload;
            state.isLoading = false;
        },
        setWalletLoading: (state, action) => {
            state.isLoading = action.payload || !state.isLoading;
        },
        setWalletError: (state, { payload }) => {
            state.error = payload;
            state.isLoading = false;
        }
    }
});

export const { setWalletAddress, setWalletLoading, setWalletError } =
    walletSlice.actions;

export default walletSlice.reducer;
