export type UserType = {
  userName: string,
  id: number,
  email: string,
  userRole: string
};
export interface Props {
  user: UserType
}
