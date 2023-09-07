import IMessage from "@/interfaces/IMessage";

const ChatBubble: React.FC<IMessage> = ({ id, text, isUser, timestamp }: IMessage) => {
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
        <div className={`${isUser ? '' : 'ml-auto'}  my-4 w-fit`}>
            <div className={`${isUser ? '' : 'ml-auto'} w-fit my-1`}>
                <span className="text-xs">{isUser ? 'User' : "CodexGuru"}</span>
                <br />
                <span className='text-xs'>{formattedDate}</span>
            </div>
            <div className={`w-fit max-w-xl rounded-md py-1 px-2 text-white ${isUser ? 'bg-custom-site-color' : 'bg-custom-blue-unkown ml-auto'}`}>
                <pre className="w-160 overflow-auto h-fit max-h-64">{text}</pre>
            </div>
        </div>
    )
}

export default ChatBubble;
