import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {
  isUserLoggedIn: boolean;
}

const initialState: IAuthState = {
  isUserLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isUserLoggedIn = true;
    },
    logout(state) {
      state.isUserLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
