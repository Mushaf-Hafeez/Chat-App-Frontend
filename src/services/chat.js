import { api } from "./auth";

export const fetchUsers = async () => {
  try {
    const res = await api.get("/message/users");
    return res.data;
  } catch (error) {
    console.log("Error in the login function: ", error.message);
    return error.response?.data;
  }
};

export const sendMessage = async (receiverId, data) => {
  try {
    const res = await api.post(`/message/send/${receiverId}`, data);
    return res.data;
  } catch (error) {
    console.log("Error in the send message function: ", error.message);
    return error.response?.data;
  }
};

export const getMessages = async (id) => {
  try {
    const res = await api.get(`/message/${id}`);
    return res.data;
  } catch (error) {
    console.log("Error in the get messages function: ", error.message);
    return error.response?.data;
  }
};
