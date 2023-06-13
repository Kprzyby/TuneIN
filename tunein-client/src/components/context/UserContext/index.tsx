import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

import {
  getUserCookie,
  setUserCookie,
  removeUserCookie,
} from "../../../api/cookie/userCookie";

import { UserType, UserContextType } from "./types";

export const UserData = createContext<UserContextType>(getUserCookie());

const UserContext: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [user, setUser] = useState<UserType | undefined>(getUserCookie());

  useEffect(() => {
    if (user !== undefined) {
      setUserCookie(user);
    } else if (user === undefined) {
      removeUserCookie();
    }
  }, [user]);

  return (
    <UserData.Provider value={{ user, setUser }}>{children}</UserData.Provider>
  );
};

export default UserContext;
