import React, { useEffect } from "react";
import { checkAuth } from "@/services/auth";
import { clearAuth, setIsAuthenticated } from "@/redux/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "@/components/custom/Sidebar";
import Chat from "@/components/custom/Chat";
import { connectSocket, message, onlineUsers } from "@/utils";
import {
  setUsersOnline,
  setSocketConnect,
  clearChat,
} from "@/redux/slices/chatSlice";
import { clearProfile } from "@/redux/slices/profileSlice";

const HomePage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { socketConnect } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const checking = async () => {
    try {
      const result = await checkAuth();

      if (result.success) {
        dispatch(setIsAuthenticated({ value: true }));
      }
    } catch (error) {
      console.log("Error in the checking function: ", error.message);
      localStorage.clear();
      dispatch(clearAuth());
      dispatch(clearChat());
      dispatch(clearProfile());
    }
  };

  useEffect(() => {
    checking();
    if (!socketConnect) {
      dispatch(setSocketConnect({ value: connectSocket() }));
    }

    onlineUsers((users) => {
      dispatch(setUsersOnline({ value: users }));
    });
  }, [isAuthenticated]);

  return (
    <main className="h-screen w-full bg-stone-900 text-white flex gap-10">
      <Sidebar />
      <Chat />
    </main>
  );
};

export default HomePage;
