import { useSession } from "next-auth/react";
import IMessage from "@/interfaces/IMessage";
import ReactMarkdown from "react-markdown";

const ChatBubble: React.FC<IMessage> = ({ id, text, isUser, timestamp }: IMessage) => {
    const { data: session } = useSession();
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    };

    // Format the date using Intl.DateTimeFormat
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(Date.parse(timestamp));

    return (
        <div className={`${isUser ? '' : 'ml-auto'}  my-4 w-fit mx-4`}>
            <div className={`${isUser ? '' : 'ml-auto'} w-fit my-1`}>
                <span className="text-xs">{isUser ? `${session?.user.userRegNo} - ${session?.user.firstName}` : "CodexGuru"}</span>
                <br />
                <span className='text-xs'>{formattedDate}</span>
            </div>
            <div className={`w-fit max-w-xl h-fit rounded-md py-1 px-2 text-white ${isUser ? 'bg-custom-site-color' : 'bg-custom-blue-unkown ml-auto'}`}>
                {/* <pre className="w-160 h-fit drawer chat-bubble">{text}</pre> */}
                <ReactMarkdown >
                    {text}
                </ReactMarkdown>
            </div>
        </div>
    )
}

export default ChatBubble;
