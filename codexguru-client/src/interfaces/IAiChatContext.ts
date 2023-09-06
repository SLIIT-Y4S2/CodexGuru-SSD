import IMessage from "./IMessage";

export default interface IAiChatContext {
    currentMessage: IMessage;
    setMessageHandler: (message: IMessage) => void;
    messageList: IMessage[];
    setMessageListHandler: (message: IMessage) => void;
    messageListLength: number;
    sendMessageHandler: (message: IMessage) => void;
}
