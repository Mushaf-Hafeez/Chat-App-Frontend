import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") ? true : false,
  isLogging: false,
  isSigning: false,
  isLoggingOut: false,
  isUpdating: false,
};

export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLogging: (state, action) => {
      state.isLogging = action.payload.value;
    },
    setIsSigning: (state, action) => {
      state.isSigning = action.payload.value;
    },
    setIsLoggingOut: (state, action) => {
      state.isLoggingOut = action.payload.value;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload.value;
    },
    setIsUpdating: (state, action) => {
      state.isUpdating = action.payload.value;
    },
    clearAuth: (state) => {
      state.isAuthenticated = false,
      state.isLogging = false,
      state.isSigning = false,
      state.isLoggingOut = false,
      state.isUpdating = false,
    }
  },
});

export const {
  setIsLogging,
  setIsSigning,
  setIsLoggingOut,
  setIsAuthenticated,
  setIsUpdating,
  clearAuth
} = authReducer.actions;
export default authReducer.reducer;
