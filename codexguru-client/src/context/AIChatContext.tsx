import PATHS from "@/CONSTANTS/Paths";
import IAiChatContext from "@/interfaces/IAiChatContext";
import IChildProps from "@/interfaces/IChildProps";
import IMessage from "@/interfaces/IMessage";
import axios from "axios";
import { createContext, useState } from "react";

export const AIChatContext = createContext<IAiChatContext | null>(null);

const AIChatContextProvider = ({ children }: IChildProps) => {

    const [currentMessage, setCurrentMessage] = useState<IMessage>({ text: '', isUser: false, timestamp: '', id: 0 } as IMessage);
    const [messageList, setMessageList] = useState<IMessage[]>([]);
    const [messageListLength, setMessageListLength] = useState<number>(0);

    const setMessageHandler = (message: IMessage) => {
        setCurrentMessage(message);
    };
    const setMessageListHandler = (message: IMessage) => {
        setMessageListLength(prevState => prevState + 1);
        setMessageList((prevState) => [...prevState, message]);
    };

    const sendMessageHandler = (message: IMessage) => {
        setMessageListHandler(message);

        const reqMessages = [messageList.map((message) => {
            return ({
                isUser: message.isUser,
                text: message.text,
            })
        })];

        console.log(messageList);

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
    };


    return (
        <AIChatContext.Provider value={{ currentMessage, messageList, messageListLength, sendMessageHandler, setMessageHandler, setMessageListHandler }}>
            {children}
        </AIChatContext.Provider>
    )
}

export default AIChatContextProvider;