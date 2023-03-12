import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';
import Header from '@components/organisms/Header';
import * as Styled from "./styles";
import { authorizedNav, unauthorizedNav } from "./consts";
import Footer from '@components/organisms/Footer/indes';
import { useRouter } from 'next/router';
import { User_data } from '@components/context/UserContext';

const Main: React.FC<PropsWithChildren<unknown>> = ({
    children
  }) => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useContext(User_data);
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
          items={user === undefined ? unauthorizedNav : authorizedNav}
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
