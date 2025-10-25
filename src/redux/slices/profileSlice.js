import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: localStorage.getItem("id")
    ? JSON.parse(localStorage.getItem("id"))
    : null,
  name: localStorage.getItem("name")
    ? JSON.parse(localStorage.getItem("name"))
    : null,
  email: localStorage.getItem("email")
    ? JSON.parse(localStorage.getItem("email"))
    : null,
  image: localStorage.getItem("image")
    ? JSON.parse(localStorage.getItem("image"))
    : null,
  createdAt: localStorage.getItem("createdAt")
    ? JSON.parse(localStorage.getItem("createdAt"))
    : null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload.value;
    },
    setName: (state, action) => {
      state.name = action.payload.value;
    },
    setEmail: (state, action) => {
      state.email = action.payload.value;
    },
    setImage: (state, action) => {
      state.image = action.payload.value;
    },
    setDate: (state, action) => {
      state.createdAt = action.payload.value;
    },
    clearProfile: (state) => {
      state.id = null,
      state.name= null,
      state.email = null,
      state.image = null,
      state.createdAt= null,
    }
  },
});

export const { setId, setName, setEmail, setImage, setDate, clearProfile } =
  profileSlice.actions;
export default profileSlice.reducer;
