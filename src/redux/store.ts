import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth.slice";
import toastReducer from "./features/toast/toast.slice";
import { apiSlice } from "./services/base.service";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;