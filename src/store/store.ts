import { configureStore } from "@reduxjs/toolkit";
import { nodesApi } from "./services/nodes";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    [nodesApi.reducerPath]: nodesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(nodesApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
