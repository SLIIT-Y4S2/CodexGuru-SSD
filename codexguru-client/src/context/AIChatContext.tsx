'use client';
import PATHS from '@/constants/paths';
import IAiChatContext from "@/interfaces/IAiChatContext";
import IChildProps from "@/interfaces/IChildProps";
import IMessage from "@/interfaces/IMessage";
import axios from "axios";
import { createContext, useState, useEffect } from "react";

//* Context for AI Chat
export const AIChatContext = createContext<IAiChatContext | null>(null);

//* Context Provider for AI Chat
const AIChatContextProvider = ({ children }: IChildProps) => {
    //* State variables for AI Chat
    const [messageList, setMessageList] = useState<IMessage[]>(localStorage.getItem('aiChat') === null ? [] : JSON.parse(localStorage.getItem('aiChat')!));
    const [isWaitingForReply, setIsWaitingForReply] = useState<boolean>(false);
    const [messageListLength, setMessageListLength] = useState<number>(0);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const setIsWaitingForReplyHandler = () => {
        setIsWaitingForReply(prevState => !prevState);
    };

    //* This function is used to set the message list and the length of the message list
    const setMessageListHandler = (message: IMessage) => {
        console.log(message);


        setMessageListLength((prevState) => prevState + 1);

        //* Set the message list in the local storage 
        if (localStorage.getItem('aiChat') === null) {
            localStorage.setItem('aiChat', JSON.stringify(messageList));

            setMessageList((prevState) => [...prevState, message]);
        } else {
            const localStorageData = JSON.parse(localStorage.getItem('aiChat')!);
            localStorageData.push(message);
            localStorage.setItem('aiChat', JSON.stringify(localStorageData));
            setMessageList((prevState) => [...prevState, message]);
        }
    };

    //* This function is used to send the message to the backend


    useEffect(() => {
        const sendMessageHandler = () => {
            //* set the current message
            setIsWaitingForReplyHandler();
            setIsError(false);


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
                    setIsError(true);
                    setErrorMessage(err.response.data.message.code);
                })
                .finally(() => {
                    //* set the isWaitingForReply to false
                    setIsWaitingForReplyHandler();
                    setTimeout(() => {
                        setIsError(false);
                        setErrorMessage('');
                    }, 4000);
                });
        };

        if (messageList.length > 0 && messageList[messageList.length - 1].isUser) {
            sendMessageHandler();
        }
    }, [messageList])


    return (
        <AIChatContext.Provider value={{ errorMessage, isError, messageListLength, isWaitingForReply, messageList, setMessageListHandler }}>
            {children}
        </AIChatContext.Provider>
    )
}

export default AIChatContextProvider;
