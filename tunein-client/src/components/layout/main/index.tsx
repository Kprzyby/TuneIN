import React, { PropsWithChildren, useEffect, useState } from 'react';
import Header from '@components/organisms/Header';
import * as Styled from "./styles";
import { navigation } from "./consts";
import Footer from '@components/organisms/Footer/indes';
import { useRouter } from 'next/router';

const Main: React.FC<PropsWithChildren<unknown>> = ({
    children
  }) => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const changeHeader = () => {
      if (window.scrollY !== 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", changeHeader);
    return () => window.removeEventListener("scroll", changeHeader);
  }, [isScrolled]);
  return (
    <Styled.Wrapper>
        <Header 
          items={navigation}
          isLight={router.asPath === "/" && !isScrolled}
        />
        <Styled.Main>
          {children}
        </Styled.Main>
        <Footer/>
    </Styled.Wrapper>
  )
}

export default Main;
