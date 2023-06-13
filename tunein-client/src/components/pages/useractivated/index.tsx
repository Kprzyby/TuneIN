import React from "react";
import { type NextPage } from "next";
import DarkButton from "@components/molecules/DarkButton";
import Link from "next/link";

import * as Styled from "./styles";

const Confirmation: NextPage = () => (
  <Styled.Wrapper>
    <Styled.Content>
      <Styled.Title variant="ConfirmationTitle">
        You have confirmed your email
      </Styled.Title>
      <Styled.Desc variant="ConfirmationDesc">
        Please do login now and enjoy our services
      </Styled.Desc>
      <Link href="/auth/login">
        <DarkButton text="Logn In" />
      </Link>
    </Styled.Content>
  </Styled.Wrapper>
);

export default Confirmation;
