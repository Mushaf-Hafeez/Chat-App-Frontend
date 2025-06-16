import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  isUsersLoading: false,
  messages: [],
  isMessagesLoading: false,
  selectedUser: {},
  socketConnect: null,
  usersOnline: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload.value;
    },
    setIsUsersLoading: (state, action) => {
      state.isUsersLoading = action.payload.value;
    },
    setMessages: (state, action) => {
      state.messages = action.payload.value;
    },
    setIsMessagesLoading: (state, action) => {
      state.isMessagesLoading = action.payload.value;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload.value;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload.value);
    },
    setSocketConnect: (state, action) => {
      state.socketConnect = action.payload.value;
    },
    setUsersOnline: (state, action) => {
      state.usersOnline = action.payload.value;
    },
  },
});

export const {
  setUsers,
  setIsUsersLoading,
  setMessages,
  setIsMessagesLoading,
  setSelectedUser,
  addMessage,
  setSocketConnect,
  setUsersOnline,
} = chatSlice.actions;

export default chatSlice.reducer;
