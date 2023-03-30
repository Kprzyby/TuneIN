import React, {
  PropsWithChildren, useContext, useEffect, useState,
} from 'react';
import Header from '@components/organisms/Header';
import Footer from '@components/organisms/Footer/indes';
import { useRouter } from 'next/router';
import { UserData } from '@components/context/UserContext';
import * as Styled from './styles';

const Main: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const { user } = useContext(UserData);
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const unauthorizedNav = [
    { label: 'Register', href: '/auth/register' },
    { label: 'Login', href: '/auth/login' },
  ];
  const authorizedNav = [
    { label: 'Logout', href: '/auth/logout' },
    { label: 'Profile', href: `/user/${user?.userName}` },
  ];
  useEffect(() => {
    const changeHeader = () => {
      if (window.scrollY !== 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', changeHeader);
    return () => window.removeEventListener('scroll', changeHeader);
  }, [isScrolled]);
  useEffect(() => {
    setIsUser(user !== undefined);
  }, [user]);
  return (
    <Styled.Wrapper>
      <Header
        items={isUser ? authorizedNav : unauthorizedNav}
        isLight={router.asPath === '/' && !isScrolled}
      />
      <Styled.Main>
        {children}
      </Styled.Main>
      <Footer />
    </Styled.Wrapper>
  );
};

export default Main;
