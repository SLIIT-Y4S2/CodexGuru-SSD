import IMessage from "./IMessage";

export default interface IAiChatContext {
  isWaitingForReply: boolean;
  messageList: IMessage[];
  setMessageList: React.Dispatch<React.SetStateAction<IMessage[]>>;
}
