// import React from "react";
// import { Avatar, AvatarImage } from "../ui/avatar";
// import { useDispatch, useSelector } from "react-redux";
// import { Button } from "../ui/button";
// import { X } from "lucide-react";
// import { setSelectedUser } from "@/redux/slices/chatSlice";

// const ChatHeader = () => {
//   const { selectedUser, usersOnline } = useSelector((state) => state.chat);
//   const dispatch = useDispatch();

//   const handleClick = () => {
//     dispatch(setSelectedUser({ value: {} }));
//   };

//   return (
//     <div className="px-4 flex items-center justify-between">
//       <div className="relative flex items-center gap-2">
//         {usersOnline &&
//           usersOnline.length > 0 &&
//           usersOnline.includes(selectedUser._id) && (
//             <span className="absolute inset-0 left-8 size-2 rounded-full bg-green-500"></span>
//           )}
//         <Avatar className={"size-10"}>
//           <AvatarImage
//             src={selectedUser.image || "/default_profile.png"}
//             alt="Error in the picture"
//           />
//         </Avatar>
//         <div className="column items-start gap-1">
//           <h3 className="text-md font-semibold text-stone-300">
//             {selectedUser.name}
//           </h3>
//           <p className="text-sm text-stone-400">
//             {usersOnline &&
//             usersOnline.length > 0 &&
//             usersOnline.includes(selectedUser._id)
//               ? "Online"
//               : "Offline"}
//           </p>
//         </div>
//       </div>

//       <Button className={"cursor-pointer"} onClick={handleClick}>
//         <X />
//       </Button>
//     </div>
//   );
// };

// export default ChatHeader;

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
    <div className="px-2 xs:px-3 md:px-4 py-2 xs:py-3 flex items-center justify-between">
      <div className="relative flex items-center gap-2 xs:gap-3 min-w-0 flex-1">
        {/* Online indicator */}
        {usersOnline?.includes(selectedUser._id) && (
          <span className="absolute top-0 left-6 xs:left-7 md:left-8 size-2 xs:size-2.5 rounded-full bg-green-500 z-10"></span>
        )}

        {/* Avatar */}
        <Avatar className="size-8 xs:size-9 md:size-10 flex-shrink-0">
          <AvatarImage
            src={selectedUser.image || "/default_profile.png"}
            alt="Error in the picture"
          />
        </Avatar>

        {/* User info */}
        <div className="flex flex-col items-start gap-0.5 xs:gap-1 min-w-0 flex-1">
          <h3 className="text-sm xs:text-base md:text-lg font-semibold text-stone-300 truncate w-full">
            {selectedUser.name}
          </h3>
          {/* Status - hidden on mobile, visible on xs+ */}
          <p className="hidden xs:block text-xs xs:text-sm text-stone-400 truncate">
            {usersOnline?.includes(selectedUser._id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Close button */}
      <Button
        className="cursor-pointer p-1.5 xs:p-2 h-auto min-w-0 flex-shrink-0"
        onClick={handleClick}
        size="sm"
      >
        <X className="size-4 xs:size-5" />
      </Button>
    </div>
  );
};

export default ChatHeader;
