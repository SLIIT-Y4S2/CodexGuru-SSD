'use client';
import PATHS from "@/CONSTANTS/PATHS";
import IAiChatContext from "@/interfaces/IAiChatContext";
import IChildProps from "@/interfaces/IChildProps";
import IMessage from "@/interfaces/IMessage";
import axios from "axios";
import { set } from "date-fns";
import { createContext, useEffect, useState } from "react";

//* Context for AI Chat
export const AIChatContext = createContext<IAiChatContext | null>(null);

//* Context Provider for AI Chat
const AIChatContextProvider = ({ children }: IChildProps) => {
    //* State variables for AI Chat
    const [messageList, setMessageList] = useState<IMessage[]>([]);
    const [isWaitingForReply, setIsWaitingForReply] = useState<boolean>(false);
    const [messageListLength, setMessageListLength] = useState<number>(0);

    const setIsWaitingForReplyHandler = () => {
        setIsWaitingForReply(prevState => !prevState);
    };

    //* This function is used to set the message list and the length of the message list
    const setMessageListHandler = (message: IMessage) => {
        setMessageList((prevState) => [...prevState, message]);
        setMessageListLength((prevState) => prevState + 1);
    };

    //* This function is used to send the message to the backend


    useEffect(() => {
        const sendMessageHandler = () => {

            //* set the current message
            setIsWaitingForReplyHandler();


            //* Request body for the AI Chat
            const reqMessages = [messageList.map((message) => {
                return ({
                    isUser: message.isUser,
                    text: message.text,
                })
            })];


            //* Axios post request to the backend
            axios
                .post(PATHS.AI_CHAT_PATH,
                    { messages: reqMessages },
                )
                .then((res) => {
                    const newMessage: IMessage = {
                        text: res.data.text,
                        isUser: res.data.isUser,
                        timestamp: res.data.currentTime,
                        id: messageList.length + 1
                    }

                    setMessageListHandler(newMessage);

                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    //* set the isWaitingForReply to false
                    setIsWaitingForReplyHandler();
                });
        };

        if (messageList.length > 0 && messageList[messageList.length - 1].isUser) {
            sendMessageHandler();
        }
    }, [messageList])


    return (
        <AIChatContext.Provider value={{ messageListLength, isWaitingForReply, messageList, setMessageListHandler }}>
            {children}
        </AIChatContext.Provider>
    )
}

export default AIChatContextProvider;
