import { io } from "socket.io-client";

export let socket;

const backendURL = import.meta.env.VITE_APP_BACKEND_URL;

export const connectSocket = () => {
  socket = io(backendURL, {
    transports: ["websocket"],
    secure: true,
    query: {
      userId: JSON.parse(localStorage.getItem("id")),
    },
  });
  return socket.id;
};

export const message = (callback) => {
  if (!socket) return;
  socket.on("newMessage", (data) => {
    // console.log("message response: ", data);
    callback(data);
  });
};

export const onlineUsers = (callback) => {
  if (!socket) return;
  socket.on("getOnlineUsers", (data) => {
    callback(data);
  });
};

export const disconnectSocket = () => {
  socket.disconnect();
};
