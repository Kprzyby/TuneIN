export interface Props {
  chatId: string;
  messages: MessageType[];
  isMesseges: boolean;
}
export interface MessageType {
  id: number;
  message: string,
  senderName: string,
  senderId:string,
  userIsSender: boolean,
}
export interface StyledProps {
  userIsSender: boolean;
}
