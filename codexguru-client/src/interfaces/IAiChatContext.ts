import IMessage from "./IMessage";

export default interface IAiChatContext {
    isOpen: boolean;
    showDrawer: () => void;
    onClose: () => void;
    currentMessage: IMessage;
    setMessageHandler: (message: IMessage) => void;
    messageList: IMessage[];
    setMessageListHandler: (message: IMessage) => void;
    messageListLength: number;
    sendMessageHandler: (message: IMessage) => void;
}

