export interface Props {
  chatId: number;
}
export interface MessageType {
  id: number;
  message: string,
  senderName: string,
  userIsSender: boolean,
}
export interface StyledProps {
  userIsSender: boolean;
}
