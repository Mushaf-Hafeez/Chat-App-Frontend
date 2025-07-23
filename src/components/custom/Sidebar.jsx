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
    <aside className="h-full w-16 xs:w-20 sm:w-1/3 md:w-1/4 bg-stone-900 text-white border-r-2 border-stone-800 rounded p-2 xs:p-3 md:p-5 flex flex-col gap-2 overflow-y-auto">
      {users.length > 0 &&
        users.map((user, index) => (
          <div
            onClick={() => handleClick(user)}
            key={index}
            className={`relative flex items-center justify-center md:justify-start gap-2 xs:gap-3 md:gap-5 p-1 xs:p-2 cursor-pointer rounded transition-colors ${
              selectedUser?._id === user._id
                ? "bg-stone-800"
                : "hover:bg-stone-800/50"
            }`}
          >
            {/* Online indicator */}
            {usersOnline?.includes(user._id) && (
              <span className="absolute top-1 xs:top-2 left-1 xs:left-2 md:left-6 lg:left-8 xl:left-10 size-2 rounded-full bg-green-500 z-10"></span>
            )}

            {/* Profile image */}
            <img
              src={user.image || "/default_profile.png"}
              alt={user.name}
              className="size-8 xs:size-9 md:size-10 rounded-full object-cover flex-shrink-0"
            />

            {/* User info - hidden below md, visible on md+ */}
            <div className="hidden md:flex flex-col gap-1 min-w-0 flex-1">
              <h3 className="font-semibold text-base truncate">{user.name}</h3>
              <p className="text-sm text-stone-500 truncate">
                {usersOnline?.includes(user._id) ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        ))}

      {/* Empty state */}
      {users.length === 0 && (
        <div className="flex items-center justify-center h-32 text-stone-500">
          <p className="text-xs md:text-sm text-center">No users found</p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
