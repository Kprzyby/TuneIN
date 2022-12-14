import React, { PropsWithChildren } from 'react'
import Header from '@components/organisms/Header'
import * as Styled from "./styles"
import { navigation } from "./consts";

const Main: React.FC<PropsWithChildren<unknown>> = ({
    children
  }) => {
  return (
    <Styled.Wrapper>
        <Header items={navigation}/>
        {children}
    </Styled.Wrapper>
  )
}

export default Main