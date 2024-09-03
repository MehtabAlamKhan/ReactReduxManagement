import { createSlice } from "@reduxjs/toolkit";

type errorState = {
  message: string;
  status: number | null;
};

const initialState: errorState = {
  message: "",
  status: null,
};

const errorSlice = createSlice({
  name: "errorSlice",
  initialState,
  reducers: {
    logError: (state, action) => {
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    clearError: () => {
      return {
        message: "",
        status: null,
      };
    },
  },
});

export const { logError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
