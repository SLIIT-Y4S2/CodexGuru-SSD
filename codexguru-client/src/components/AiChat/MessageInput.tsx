import { useContext, useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import { Button, Input, Tooltip } from "antd";
import { AIChatContext } from "@/context/AIChatContext";
import IAiChatContext from "@/interfaces/IAiChatContext";
import IMessage from "@/interfaces/IMessage";
const MessageInput: React.FC = () => {
    const [message, setMessage] = useState('');
    const aiChatCtx = useContext<IAiChatContext | null>(AIChatContext);
    const { setMessageListHandler } = aiChatCtx!;


    const messageHandler = (message: string) => {
        if (message.trim() === '') return;
        setMessage('');
        const newMessage: IMessage = {
            text: message,
            isUser: true,
            timestamp: new Date().toLocaleDateString(),
            id: Math.floor(Math.random() * 100)
        }
        setMessageListHandler(newMessage)
    }
    return (
        <>
            <Input
                className="w-160"
                placeholder="Enter your message here"
                suffix={
                    <Tooltip title="Send">
                        <Button
                            icon={
                                <SendOutlined size={10} />
                            }
                            onClick={() => messageHandler(message)}
                        />

                    </Tooltip>
                }
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
        </>
    )
};

export default MessageInput;