import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../../features/contact/conterReducer";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// Typescript compatibility (https://redux-toolkit.js.org/usage/usage-with-typescript)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // Export a hook that can be reused to resolve types
