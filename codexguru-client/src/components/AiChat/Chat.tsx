import { AIChatContext } from '@/context/AIChatContext';
import IAiChatContext from '@/interfaces/IAiChatContext';
import { useContext } from 'react';
import ChatBubble from './ChatBubble';
const Chat: React.FC = () => {

    const aiChatCtx = useContext<IAiChatContext | null>(AIChatContext);
    const { messageList } = aiChatCtx!;

    return (
        <div className="h-content w-full scroll-m-9 pb-60" >
            {messageList?.map((message) => {
                return (
                    <ChatBubble key={message.id} {...message} />
                )
            })}
        </div>
    )
};

export default Chat;
