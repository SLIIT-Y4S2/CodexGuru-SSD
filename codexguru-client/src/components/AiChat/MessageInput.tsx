import { useContext, useState } from "react";
import { PoweroffOutlined, SendOutlined } from "@ant-design/icons";
import { Alert, Button, Input, Tooltip } from "antd";
import { AIChatContext } from "@/context/AIChatContext";
import IAiChatContext from "@/interfaces/IAiChatContext";
import IMessage from "@/interfaces/IMessage";
import TextArea from "antd/es/input/TextArea";
const MessageInput: React.FC = () => {
    const [message, setMessage] = useState('');
    const aiChatCtx = useContext<IAiChatContext | null>(AIChatContext);
    const { isWaitingForReply, messageListLength, setMessageListHandler, isError, errorMessage } = aiChatCtx!;


    const messageHandler = () => {
        if (message.trim() === '') {
            return;
        }
        const newMessage: IMessage = {
            text: message,
            isUser: true,
            timestamp: new Date().toLocaleDateString(),
            id: messageListLength + 1
        }
        setMessage('');
        setMessageListHandler(newMessage);
    }
    return (
        <>
            <TextArea
                placeholder="Enter your message here"
                autoSize
                className="w-160"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={2500}
            />
            {/* <TextArea
                rows={1}
                className="w-160"
                placeholder="Enter your message here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={2500}
            /> */}
            {isWaitingForReply ? <Button type="primary" icon={<PoweroffOutlined />} loading /> : <Button icon={<SendOutlined size={10} />} onClick={messageHandler} />}
            {isError && <Alert message={errorMessage} type="error" showIcon closable />}


        </>
    )
};

export default MessageInput;