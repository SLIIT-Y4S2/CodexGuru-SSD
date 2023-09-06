import IAiChatContext from "@/interfaces/IAiChatContext";
import IChildProps from "@/interfaces/IChildProps";
import IMessage from "@/interfaces/IMessage";
import { createContext, useState } from "react";

export const AIChatContext = createContext<IAiChatContext | null>(null);

const AIChatContextProvider = ({ children }: IChildProps) => {


    const messageList1 = [
        {
            id: 1,
            text: "Hello!",
            isUser: true,
            timestamp: "2023-09-06T10:00:00",
        },
        {
            id: 2,
            text: "Hi there!",
            isUser: false,
            timestamp: "2023-09-06T10:05:00",
        },
        {
            id: 3,
            text: "How can I assist you?",
            isUser: false,
            timestamp: "2023-09-06T10:06:00",
        },
        {
            id: 4,
            text: "I have a question.",
            isUser: true,
            timestamp: "2023-09-06T10:10:00",
        },
        {
            id: 5,
            text: "Sure, what's your question?",
            isUser: false,
            timestamp: "2023-09-06T10:11:00",
        },
        {
            id: 6,
            text: "It's about a programming issue I'm facing.",
            isUser: true,
            timestamp: "2023-09-06T10:15:00",
        },
        // Add more messages as needed
    ];




    const [message, setMessage] = useState<string>('');
    const [messageList, setMessageList] = useState<IMessage[]>(messageList1);

    const setMessageHandler = (message: string) => {
        setMessage(message);
    };
    const setMessageListHandler = (message: IMessage) => {
        setMessageList([...messageList, message]);
    };

    const sendMessageHandler = () => {

    };




    return (
        <AIChatContext.Provider value={{ message, messageList, sendMessageHandler, setMessageHandler, setMessageListHandler }}>
            {children}
        </AIChatContext.Provider>
    )
}

export default AIChatContextProvider;