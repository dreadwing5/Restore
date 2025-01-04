import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { catelogApi } from "../../features/catalog/catelogApi";
import { uiSlice } from "../layout/uiSlice";
import { errorApi } from "../../features/about/errorApi";

export const store = configureStore({
  reducer: {
    [catelogApi.reducerPath]: catelogApi.reducer,
    [errorApi.reducerPath]: errorApi.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catelogApi.middleware, errorApi.middleware), // responsible for handling the api requests, help us with caching, retrying, etc and capture errors
});

// Typescript compatibility (https://redux-toolkit.js.org/usage/usage-with-typescript)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // Export a hook that can be reused to resolve types
