import React from "react";
import { MessageSquare } from "lucide-react";

const DefaultChat = () => {
  return (
    <div className="w-full center column">
      <span className="p-2 rounded bg-stone-200 animate-bounce">
        <MessageSquare color="black" size={"48"} />
      </span>
      <h3 className="text-xl font-semibold text-stone-400">
        Welcome to CHATTING APP
      </h3>
      <p className="text-md text-stone-500">
        Select a conversation from the sidebar to start chatting
      </p>
    </div>
  );
};

export default DefaultChat;
