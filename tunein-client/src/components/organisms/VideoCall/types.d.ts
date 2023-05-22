export interface Props {
  videocall?: VideoCallType;
}
export interface VideoCallType {
  id: string,
  pin: string,
  creatorsID: number,
}
export interface MessageType {
  id: number;
  message: string,
  senderName: string,
  senderId:string,
  userIsSender: boolean,
}
export interface ChatType {
  id: string,
  topic: string,
  participants: UserType[]
}
export interface UserType {
  userId: number;
  username: string;
  email: string;
  userRole: string;
  avatarId: number;
}
