'use client';
import PATHS from "@/CONSTANTS/Paths";
import IAiChatContext from "@/interfaces/IAiChatContext";
import IChildProps from "@/interfaces/IChildProps";
import IMessage from "@/interfaces/IMessage";
import axios from "axios";
import { createContext, useState } from "react";

//* Context for AI Chat
export const AIChatContext = createContext<IAiChatContext | null>(null);

//* Context Provider for AI Chat
const AIChatContextProvider = ({ children }: IChildProps) => {
    //* State variables for AI Chat
    const [currentMessage, setCurrentMessage] = useState<IMessage>({ text: '', isUser: false, timestamp: '', id: 0 } as IMessage);
    const [messageList, setMessageList] = useState<IMessage[]>([]);
    const [messageListLength, setMessageListLength] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isWaitingForReply, setIsWaitingForReply] = useState<boolean>(false);

    const setIsWaitingForReplyHandler = () => {
        console.log(isWaitingForReply);
        setIsWaitingForReply(prevState => !prevState);
        console.log(isWaitingForReply);
    };

    //* Drawer functions
    const showDrawer = () => {
        setIsOpen(true);
    };

    const onClose = () => {
        setIsOpen(false);
    };

    //* This function is used to set the current message
    const setMessageHandler = (message: IMessage) => {
        setCurrentMessage(message);
    };

    //* This function is used to set the message list and the length of the message list
    const setMessageListHandler = (message: IMessage) => {
        setMessageHandler(message);
        setMessageListLength(prevState => prevState + 1);
        setMessageList((prevState) => [...prevState, message]);
    };

    //* This function is used to send the message to the backend
    const sendMessageHandler = (message: IMessage) => {

        //* set the current message
        setIsWaitingForReplyHandler();

        //* add the current message to the message list
        setMessageListHandler(message);

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
                    id: messageListLength + 1
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


    return (
        <AIChatContext.Provider value={{ isWaitingForReply, isOpen, currentMessage, messageList, messageListLength, showDrawer, onClose, sendMessageHandler, setMessageHandler, setMessageListHandler }}>
            {children}
        </AIChatContext.Provider>
    )
}

export default AIChatContextProvider;
