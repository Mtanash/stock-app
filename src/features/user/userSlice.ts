import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../interfaces";
import { RootState } from "./../../app/store";

type InitialState = {
  userData: User | null;
  accessToken: string | null;
};

const initialState: InitialState = {
  userData: null,
  accessToken: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ userData: User; accessToken: string }>
    ) => {
      state.userData = action.payload.userData;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.userData = null;
      state.accessToken = null;
    },
  },
});

export const { logout, login } = userSlice.actions;

export const selectCurrentUser = (state: RootState) => state.user;

export default userSlice.reducer;
