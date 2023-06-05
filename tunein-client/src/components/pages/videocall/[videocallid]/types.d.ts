export interface Props {
  videocall?: VideoCallType;
}

export interface VideoCallType {
  id: string;
  pin: string;
  creatorsID: number;
}
