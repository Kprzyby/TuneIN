import React, { PropsWithChildren } from 'react'
import Header from '@components/organisms/Header'
import * as Styled from "./styles"
import { navigation } from "./consts";
import Footer from '@components/organisms/Footer/indes';

const Main: React.FC<PropsWithChildren<unknown>> = ({
    children
  }) => {
  return (
    <Styled.Wrapper>
        <Header items={navigation}/>
        {children}
        <Footer/>
    </Styled.Wrapper>
  )
}

export default Main