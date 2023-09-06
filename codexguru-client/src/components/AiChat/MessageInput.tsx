import { useContext, useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import { Button, Input, Tooltip } from "antd";
import { AIChatContext } from "@/context/AIChatContext";
import IAiChatContext from "@/interfaces/IAiChatContext";
import IMessage from "@/interfaces/IMessage";
import TextArea from "antd/es/input/TextArea";
const MessageInput: React.FC = () => {
    const [message, setMessage] = useState('');
    const aiChatCtx = useContext<IAiChatContext | null>(AIChatContext);
    const { messageListLength, sendMessageHandler } = aiChatCtx!;


    const messageHandler = (message: string) => {
        if (message.trim() === '') return;
        const newMessage: IMessage = {
            text: message,
            isUser: true,
            timestamp: new Date().toLocaleDateString(),
            id: messageListLength + 1
        }
        setMessage('');
        sendMessageHandler(newMessage);
    }
    return (
        <>
            <TextArea
                rows={1}
                className="w-160"
                placeholder="Enter your message here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={2500}
            />
            <Button
                icon={
                    <SendOutlined size={10} />
                }
                onClick={() => messageHandler(message)}
            />
        </>
    )
};

export default MessageInput;