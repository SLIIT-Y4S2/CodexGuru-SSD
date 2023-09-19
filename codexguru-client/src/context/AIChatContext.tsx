"use client";
import PATHS from "@/constants/paths";
import IAiChatContext from "@/interfaces/IAiChatContext";
import IChildProps from "@/interfaces/IChildProps";
import IMessage from "@/interfaces/IMessage";
import axios from "axios";
import { createContext, useState, useEffect } from "react";

//* Context for AI Chat
export const AIChatContext = createContext<IAiChatContext | null>(null);

//* Context Provider for AI Chat
const AIChatContextProvider = ({ children }: IChildProps) => {
  const [messageList, setMessageList] = useState<IMessage[]>([]);
  const [isWaitingForReply, setIsWaitingForReply] = useState<boolean>(false);

  useEffect(() => {
    if (messageList[messageList.length - 1]?.isUser) {
      sendMessageHandler();
    }
    return () => {};
  }, [messageList]);

  const sendMessageHandler = async () => {
    setIsWaitingForReply(true);
    const reqMessages = messageList.map((message) => {
      return {
        isUser: message.isUser,
        text: message.text,
      };
    });

    //* Axios post request to the backend
    await axios
      .post(PATHS.AI_CHAT_PATH, { messages: reqMessages })
      .then((res) => {
        const newMessage: IMessage = {
          text: res.data.text,
          isUser: res.data.isUser,
          timestamp: res.data.currentTime,
          id: messageList.length + 1,
        };

        setMessageList((prevState) => [...prevState, newMessage]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsWaitingForReply(false);
      });
  };

  return (
    <AIChatContext.Provider
      value={{
        isWaitingForReply,
        messageList,
        setMessageList,
      }}
    >
      {children}
    </AIChatContext.Provider>
  );
};

export default AIChatContextProvider;
