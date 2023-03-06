import React from 'react';
import { NextPage } from 'next';
import * as Styled from './styles';
import DarkButton from '@components/molecules/DarkButton';
import Link from 'next/link';

const Confirmation: NextPage = () => {
  return (
    <Styled.Wrapper>
      <Styled.Content>
        <Styled.Title variant='ConfirmationTitle'>You have confirmed your email</Styled.Title>
        <Styled.Desc variant='ConfirmationDesc'>Please do login now and enjoy our services</Styled.Desc>
        <Link href={"/"}>
          <DarkButton text={"Logn In"}/>
        </Link>
      </Styled.Content>
    </Styled.Wrapper>
  )
}
export default Confirmation;
