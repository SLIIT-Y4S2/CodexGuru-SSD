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
    const formattedDate = timestamp//new Intl.DateTimeFormat('en-US', options).format(Date.parse(timestamp));

    return (
        <div className={`${isUser ? '' : 'ml-auto'}  my-4 w-fit`}>
            <div className={`${isUser ? '' : 'ml-auto'} w-fit my-1`}>
                <span className='text-xs'>{formattedDate}</span>
            </div>
            <div className={`w-fit max-w-xl rounded-md py-1 px-2 text-white ${isUser ? 'bg-custom-site-color' : 'bg-custom-blue-unkown ml-auto' }`}>
                <pre className="overflow-auto max-h-64">{text}</pre>
                {/* <span>{isUser ? 'User' : null}</span>
                <span className={`w-fit rounded-md py-1 px-2 mx-4 text-white ${isUser ? 'bg-custom-site-color' : 'bg-custom-blue-unkown'}`}>{text}</span>
                <span>{!isUser ? 'CodexGuru' : null}</span> */}
            </div>
        </div>
    )
}

export default ChatBubble;
