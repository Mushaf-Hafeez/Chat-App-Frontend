import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatSkeleton from "./ChatSkeleton";
import DefaultChat from "./DefaultChat";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import { getMessages } from "@/services/chat";
import { setIsMessagesLoading, setMessages } from "@/redux/slices/chatSlice";
import ChatMessages from "./ChatMessages";

const Chat = () => {
  const { selectedUser, isMessagesLoading } = useSelector(
    (state) => state.chat
  );
  const dispatch = useDispatch();

  const fetchMessages = async () => {
    dispatch(setIsMessagesLoading({ value: true }));
    const result = await getMessages(selectedUser._id);
    if (result.success && result.data && result.data.length > 0) {
      dispatch(setMessages({ value: result.data }));
    }
    dispatch(setIsMessagesLoading({ value: false }));
  };

  useEffect(() => {
    if (Object.keys(selectedUser).length > 0) {
      fetchMessages();
    }
  }, [selectedUser]);

  if (Object.keys(selectedUser).length === 0) {
    return <DefaultChat />;
  }

  return (
    <div className="h-full w-full relative">
      <ChatHeader />
      {/* Todo: display all the messages here and the skeleton when fetching all the messagees. */}
      {/* <ChatSkeleton /> */}
      {isMessagesLoading ? <ChatSkeleton /> : <ChatMessages />}
      <ChatInput />
    </div>
  );
};

export default Chat;
