import { Typography } from "@components/styles/typography";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { UserData } from "@components/context/UserContext";

import Loader from "../../atoms/Loader";

const Title = styled(Typography)`
  text-align: center;
  font-weight: 700;
  padding: 3rem;
  @media (min-width: 0px) {
    font-size: 1.6rem;
  }
  @media (min-width: 400px) {
    font-size: 2rem;
  }
  @media (min-width: 600px) {
    font-size: 2.5rem;
  }
  @media (min-width: 800px) {
    font-size: 4rem;
  }
  @media (min-width: 1200px) {
    font-size: 6rem;
  }
  @media (min-width: 1500px) {
    font-size: 7rem;
  }
`;
const Logout: React.FC = () => {
  const { setUser } = useContext(UserData);
  const router = useRouter();

  useEffect(() => {
    setUser(undefined);
    router.push("/");
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Title variant="RegisterTitile">Logging out</Title>
      <Loader borderColor="white transparent" />
    </div>
  );
};

export default Logout;
