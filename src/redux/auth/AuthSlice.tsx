import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  email: string;
  userProfilePicture?: string;
  _id: string;
  userNickName: string;
}

export interface AuthStateType {
  user: User | null;
  isAuthLoading: boolean;
}

const initialState: AuthStateType = {
  user: null,
  isAuthLoading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
