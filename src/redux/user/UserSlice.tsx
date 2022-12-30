import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserStateType {
  likes: string[];
  followers: string[];
  followUps: string[];
}

const initialState: UserStateType = {
  likes: [],
  followers: [],
  followUps: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setLike: (state, action: PayloadAction<string>) => {
      state.likes.push(action.payload);
    },
    setLikes: (state, action: PayloadAction<string[]>) => {
      state.likes = action.payload;
    },
    deleteLike: (state, action: PayloadAction<string>) => {
      let index = state.likes.findIndex((s) => s == action.payload);
      if (index > -1) {
        state.likes.splice(index, 1);
      }
    },
    setFollowUp: (state, action: PayloadAction<string>) => {
      state.followUps.push(action.payload);
    },
    setFollowUps: (state, action: PayloadAction<string[]>) => {
      state.followUps = action.payload;
    },
    removeFollowUp: (state, action: PayloadAction<string>) => {
      let index = state.followUps.findIndex((s) => s == action.payload);
      if (index > -1) {
        state.followUps.splice(index, 1);
      }
    },
  },
});

export const {
  setLike,
  deleteLike,
  setLikes,
  setFollowUp,
  setFollowUps,
  removeFollowUp,
} = userSlice.actions;

export default userSlice.reducer;
