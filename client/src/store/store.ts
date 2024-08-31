import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/slices/userSlice";
import errorReducer from "./features/slices/errorSlice";
import { userApi } from "./features/api/usersApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    error: errorReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
