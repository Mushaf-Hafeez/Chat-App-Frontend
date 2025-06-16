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
      className="h-[70vh] flex flex-col gap-4 p-4 overflow-y-auto"
    >
      {messages && messages.length > 0
        ? messages.map((message, index) => (
            <div
              key={index}
              className={`max-w-fit flex gap-1 ${
                message.receiverId != selectedUser._id
                  ? "self-start"
                  : "self-end flex-row-reverse"
              } `}
            >
              <Avatar>
                <AvatarImage
                  src={
                    message.receiverId != selectedUser._id
                      ? selectedUser.image || "/default_profile.png"
                      : image || "/default_profile.png"
                  }
                  className="size-10 object-cover rounded-full"
                />
              </Avatar>
              <div className="flex flex-col gap-1">
                <div className="max-w-[30vw] bg-stone-800 p-2 flex flex-col gap-1 rounded">
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Error while rendering the image"
                      className="size-60 rounded object-cover"
                    />
                  )}
                  {message.text}
                  <br />
                  <p className="text-[10px]">
                    {formatDistanceToNow(new Date(message.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))
        : "Continue to chat.."}
    </div>
  );
};

export default ChatMessages;
