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
    loginUser: (state, action) => {
      return {
        ...state,
        token: action.payload.token,
        user: {
          username: action.payload.user.username,
          password: action.payload.user.password,
          id: action.payload.user._id,
          email: action.payload.user.email,
        },
      };
    },
    clearUserState: () => {
      return initialState;
    },
  },
});

export const { loadUser, loginUser, clearUserState } = userSlice.actions;
export default userSlice.reducer;
