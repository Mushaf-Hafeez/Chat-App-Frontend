import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SidebarSkeleton from "./SidebarSkeleton";
import {
  setUsers,
  setIsUsersLoading,
  setSelectedUser,
} from "@/redux/slices/chatSlice";
import { fetchUsers } from "@/services/chat";

const Sidebar = () => {
  const { users, isUsersLoading, selectedUser, usersOnline } = useSelector(
    (state) => state.chat
  );
  const dispatch = useDispatch();

  const getusers = async () => {
    dispatch(setIsUsersLoading({ value: true }));
    const result = await fetchUsers();

    if (result && result.success) {
      dispatch(setUsers({ value: result.data }));
    }
    dispatch(setIsUsersLoading({ value: false }));
  };

  const handleClick = (user) => {
    dispatch(setSelectedUser({ value: user }));
  };

  useEffect(() => {
    getusers();
  }, []);

  if (isUsersLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <aside className="h-full w-1/4 bg-stone-900 text-white rounded p-5 flex flex-col gap-2">
      {users.length > 0 &&
        users.map((user, index) => (
          <div
            onClick={() => handleClick(user)}
            key={index}
            className={`relative flex items-center justify-center md:justify-start  gap-5 p-2 cursor-pointer ${
              selectedUser._id == user._id && "bg-stone-800 rounded"
            }`}
          >
            {usersOnline &&
              usersOnline.length > 0 &&
              usersOnline.includes(user._id) && (
                <span className="absolute inset-y-0 top-2 left-10 size-2 rounded-full bg-green-500"></span>
              )}
            <img
              src={user.image || "/default_profile.png"}
              alt={user.name}
              className="size-8 md:size-10 rounded-full object-cover"
            />
            <div className="hidden md:flex flex-col gap-1">
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm text-stone-500">
                {usersOnline &&
                usersOnline.length > 0 &&
                usersOnline.includes(user._id)
                  ? "Online"
                  : "Offline"}
              </p>
            </div>
          </div>
        ))}
    </aside>
  );
};

export default Sidebar;
