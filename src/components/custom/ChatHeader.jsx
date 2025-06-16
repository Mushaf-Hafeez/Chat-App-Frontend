import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { setSelectedUser } from "@/redux/slices/chatSlice";

const ChatHeader = () => {
  const { selectedUser, usersOnline } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSelectedUser({ value: {} }));
  };

  return (
    <div className="px-4 flex items-center justify-between">
      <div className="relative flex items-center gap-2">
        {usersOnline &&
          usersOnline.length > 0 &&
          usersOnline.includes(selectedUser._id) && (
            <span className="absolute inset-0 left-8 size-2 rounded-full bg-green-500"></span>
          )}
        <Avatar className={"size-10"}>
          <AvatarImage
            src={selectedUser.image || "/default_profile.png"}
            alt="Error in the picture"
          />
        </Avatar>
        <div className="column items-start gap-1">
          <h3 className="text-md font-semibold text-stone-300">
            {selectedUser.name}
          </h3>
          <p className="text-sm text-stone-400">
            {usersOnline &&
            usersOnline.length > 0 &&
            usersOnline.includes(selectedUser._id)
              ? "Online"
              : "Offline"}
          </p>
        </div>
      </div>

      <Button className={"cursor-pointer"} onClick={handleClick}>
        <X />
      </Button>
    </div>
  );
};

export default ChatHeader;
