import { Typography } from '@components/styles/typography';
import React from 'react';
import * as Styled from './styles';
import * as Logo from "../../../../public/assets/svg";
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <Styled.Wrapper>
      <Styled.Center variant='narrow'>
        <Styled.Icons>
          <Link href={"/"}><Logo.Instagram fontSize={"2rem"}/></Link>
          <Link href={"/"}><Logo.Twitter fontSize={"2rem"}/></Link>
          <Link href={"/"}><Logo.Youtube fontSize={"2rem"}/></Link>
        </Styled.Icons>

        <Styled.copyRight variant='h1'>©2022 Copyright: W sumie to nie wiem</Styled.copyRight>
      </Styled.Center>
    </Styled.Wrapper>
  )
};

export default Footer;