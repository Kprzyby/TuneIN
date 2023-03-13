import React, { useEffect } from 'react'
import { removeUserCookie } from "../../../src/api/cookie/userCookie";

const index: React.FC = () => {
    useEffect(()=>{
        removeUserCookie();
        //TODO: temprorary solution
        window.location.href = "/";
    }, []);
  return (<></>);
};

export default index;
