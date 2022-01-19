import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import userReducer from "./reducers/userSlice";
import roomReducer from "./reducers/roomSlice";
import walletReducer from "./reducers/walletSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        rooms: roomReducer,
        wallet: walletReducer
    },
    devTools: process.env.NODE_ENV !== "production"
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
