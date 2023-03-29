export type UserContextType = {
  user: UserType | undefined;
  setUser: (user: UserType | undefined) => void;
};
export interface UserType {
  email: string;
  id: number;
  userName: string;
  userRole: string;
}
