export interface UserType {
  userId: number;
  username: string;
  email: string;
  userRole: string;
  avatarId: number;
}
export interface StyledProps {
  isHighlighted?: boolean;
}
export interface ChatType {
  id: string;
  topic: string;
  participants: UserType[];
}
