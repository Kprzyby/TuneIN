import React, { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { getUserCookie } from "../../services/userCookie";

export const User_data = createContext(getUserCookie());

const UserContext: React.FC<PropsWithChildren<unknown>> = ({children}) => {
    const [user, setUser] = useState(getUserCookie());
    useEffect(() => {
        setUser(user);
    }, [user]);
    return (
        <User_data.Provider value={user}>
            {children}
        </User_data.Provider>
    )
};

export default UserContext;
