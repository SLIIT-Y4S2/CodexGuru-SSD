import IMessage from "./IMessage";

export default interface IAiChatContext {
    message: string;
    setMessageHandler: (message: string) => void;
    messageList: IMessage[];
    setMessageListHandler: (message: IMessage) => void;
    sendMessageHandler: () => void;
}
