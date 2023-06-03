export type UserType = {
  userName: string;
  id: number;
  email: string;
  userRole: string;
  avatarId: number;
};
export interface Props {
  user: UserType;
}
