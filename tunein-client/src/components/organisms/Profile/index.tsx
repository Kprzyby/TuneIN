import { User_data } from "@components/context/UserContext";
import React, { useContext } from "react";
import * as Styled from "./styles";

const Profile: React.FC = () => {
    //TODO: profile component
    const {user} = useContext(User_data);
    return (
        <div style={{fontSize: "10rem", width: "100vw", textAlign: "center"}}>
            {user ? user.userName : "undefined"}
        </div>
    )
};

export default Profile;
