import React, { createContext, PropsWithChildren, useState } from 'react';

export const User_data = createContext({user: "", setUser: (user: string) => {}});

const UserContext: React.FC<PropsWithChildren<unknown>> = ({children}) => {
    const [user, setUser] = useState<string>("");
    return (
        <User_data.Provider value={{user, setUser}}>
            {children}
        </User_data.Provider>
    )
}

export default UserContext;
