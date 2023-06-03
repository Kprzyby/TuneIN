import React from "react";
import Link from "next/link";

import * as Logo from "../../../../public/assets/svg";

import * as Styled from "./styles";

const Footer: React.FC = () => (
  <Styled.Wrapper>
    <Styled.Center variant="narrow">
      <Styled.Icons>
        <Link href="/">
          <Logo.Instagram />
        </Link>
        <Link href="/">
          <Logo.Twitter />
        </Link>
        <Link href="/">
          <Logo.Youtube />
        </Link>
      </Styled.Icons>
      <Styled.CopyRight variant="h1">
        ©2022 Copyright: W sumie to nie wiem
      </Styled.CopyRight>
    </Styled.Center>
  </Styled.Wrapper>
);

export default Footer;
