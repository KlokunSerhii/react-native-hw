import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "null",
  nickname: "null",
  email: "null",
  password: "null",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});
export const {} = authSlice.actions;
export default authSlice.reducer;
