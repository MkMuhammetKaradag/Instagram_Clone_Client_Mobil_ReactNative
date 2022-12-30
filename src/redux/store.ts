import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import AuthReducer from "./auth/AuthSlice";
import UserReducer from "./user/UserSlice";
const store = configureStore({
  reducer: {
    auth: AuthReducer,
    user: UserReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
