import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL,
  withCredentials: true,
});

export const login = async (data) => {
  try {
    const res = await api.post("/auth/login", data);
    return res.data;
  } catch (error) {
    // console.log("Error in the login function: ", error.message);
    return error.response.data;
  }
};

export const signup = async (data) => {
  try {
    const res = await api.post("/auth/signup", data);
    return res.data;
  } catch (error) {
    console.log("Error in the login function: ", error.message);
    return error.response.data;
  }
};

export const checkAuth = async () => {
  try {
    const res = await api.get("/auth/checkAuth");
    return res.data;
  } catch (error) {
    // console.log("Error in the login function: ", error.message);
    return error.response.data;
  }
};

export const logout = async () => {
  try {
    const res = await api.get("/auth/logout");
    return res.data;
  } catch (error) {
    console.log("Error in the login function: ", error.message);
    return error.response.data;
  }
};

export const updateImage = async (data) => {
  try {
    const res = await api.put("/auth/changeImage", data);
    return res.data;
  } catch (error) {
    console.log("Error in the update image function: ", error.message);
    return error.response.data;
  }
};
