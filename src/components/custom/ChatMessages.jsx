// import React, { useEffect, useRef } from "react";
// import { formatDistanceToNow } from "date-fns";
// import { useDispatch, useSelector } from "react-redux";
// import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
// import { message, socket } from "@/utils";
// import { addMessage } from "@/redux/slices/chatSlice";

// const ChatMessages = () => {
//   const { messages, selectedUser } = useSelector((state) => state.chat);
//   const { image } = useSelector((state) => state.profile);
//   const dispatch = useDispatch();

//   const scrollRef = useRef(null);

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//       scrollRef.current.scrollIntoView({ behaviour: "smooth" });
//     }
//   }, [messages]);

//   useEffect(() => {
//     message((data) => {
//       dispatch(
//         addMessage({
//           value: {
//             receiverId: data.receiverId,
//             text: data.text && data.text.length > 0 && data.text,
//             image: data.image ? data.image : null,
//             createdAt: data.createdAt,
//           },
//         })
//       );
//     });

//     return () => {
//       if (socket) {
//         socket.off("newMessage"); // Remove listener
//       }
//     };
//   }, []);

//   return (
//     <div
//       ref={scrollRef}
//       className="h-[70vh] flex flex-col gap-4 p-4 overflow-y-auto"
//     >
//       {messages && messages.length > 0
//         ? messages.map((message, index) => (
//             <div
//               key={index}
//               className={`max-w-fit flex gap-1 ${
//                 message.receiverId != selectedUser._id
//                   ? "self-start"
//                   : "self-end flex-row-reverse"
//               } `}
//             >
//               <Avatar>
//                 <AvatarImage
//                   src={
//                     message.receiverId != selectedUser._id
//                       ? selectedUser.image || "/default_profile.png"
//                       : image || "/default_profile.png"
//                   }
//                   className="size-10 object-cover rounded-full"
//                 />
//               </Avatar>
//               <div className="flex flex-col gap-1">
//                 <div className="max-w-[30vw] bg-stone-800 p-2 flex flex-col gap-1 rounded">
//                   {message.image && (
//                     <img
//                       onClick={() => window.open(message.image, "_blank")}
//                       src={message.image}
//                       alt="Error while rendering the image"
//                       className="size-60 rounded object-cover cursor-pointer"
//                     />
//                   )}
//                   {message.text}
//                   <br />
//                   <p className="text-[10px]">
//                     {formatDistanceToNow(new Date(message.createdAt), {
//                       addSuffix: true,
//                     })}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))
//         : "Continue to chat.."}
//     </div>
//   );
// };

// export default ChatMessages;

import React, { useEffect, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { message, socket } from "@/utils";
import { addMessage } from "@/redux/slices/chatSlice";

const ChatMessages = () => {
  const { messages, selectedUser } = useSelector((state) => state.chat);
  const { image } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    message((data) => {
      dispatch(
        addMessage({
          value: {
            receiverId: data.receiverId,
            text: data.text && data.text.length > 0 && data.text,
            image: data.image ? data.image : null,
            createdAt: data.createdAt,
          },
        })
      );
    });

    return () => {
      if (socket) {
        socket.off("newMessage"); // Remove listener
      }
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      className="h-[80vh] w-full bg-stone-900 flex flex-col gap-2 xs:gap-3 md:gap-4 p-2 xs:p-3 md:p-4 overflow-y-auto"
    >
      {messages && messages.length > 0 ? (
        messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-fit flex gap-1 xs:gap-2 ${
              message.receiverId != selectedUser._id
                ? "self-start"
                : "self-end flex-row-reverse"
            } `}
          >
            {/* Avatar - hidden on mobile, visible on xs+ */}
            <div className="hidden xs:block flex-shrink-0">
              <Avatar>
                <AvatarImage
                  src={
                    message.receiverId != selectedUser._id
                      ? selectedUser.image || "/default_profile.png"
                      : image || "/default_profile.png"
                  }
                  className="size-8 xs:size-9 md:size-10 object-cover rounded-full"
                />
              </Avatar>
            </div>

            <div className="flex flex-col gap-1">
              <div className="max-w-[85vw] xs:max-w-[70vw] sm:max-w-[60vw] md:max-w-[50vw] lg:max-w-[40vw] bg-stone-800 p-2 xs:p-3 flex flex-col gap-1 rounded-lg xs:rounded-xl">
                {/* Message image */}
                {message.image && (
                  <img
                    onClick={() => window.open(message.image, "_blank")}
                    src={message.image}
                    alt="Error while rendering the image"
                    className="w-full max-w-[200px] xs:max-w-[240px] md:max-w-[280px] h-auto max-h-[200px] xs:max-h-[240px] md:max-h-[280px] rounded object-cover cursor-pointer"
                  />
                )}

                {/* Message text */}
                {message.text && (
                  <span className="text-sm xs:text-base break-words">
                    {message.text}
                  </span>
                )}

                {/* Timestamp */}
                <p className="text-[9px] xs:text-[10px] md:text-xs text-stone-400 mt-1">
                  {formatDistanceToNow(new Date(message.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-full text-stone-500">
          <p className="text-sm xs:text-base">Continue to chat...</p>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
