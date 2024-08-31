import { createSlice } from "@reduxjs/toolkit";

type userState = {
  username: string;
  email: string;
  password: string;
  id: string;
};

type mainState = {
  token: string;
  user: userState | null;
};

const initialState: mainState = {
  token: "",
  user: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    loadUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { loadUser } = userSlice.actions;
export default userSlice.reducer;
