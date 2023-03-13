export type UserContextType = {
    user: UserType;
    setUser: (user: UserType) => void;
}
export interface UserType {
    email: string;
    id: number;
    userName: string;
    userRole: string;
};
