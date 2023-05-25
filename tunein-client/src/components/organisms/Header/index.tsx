import { Inner } from '@components/styles/inners';
import { Typography } from '@components/styles/typography';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import * as Styled from './styles';
import { HeaderProps } from './types';

const Header: React.FC<HeaderProps> = ({ items, isLight }) => {
  const { asPath } = useRouter();
  const isHomepage = asPath === '/';
  return (
    <Styled.Wrapper {...{ isLight, isHomepage }}>
      <Inner variant="wide">
        <Styled.ItemsWrapper>
          <Styled.Logo variant="Logo">
            <Link href="/">TuneIN</Link>
          </Styled.Logo>
          <ul>
            {items.map(({ label, href }) => {
              const isHighlighted = asPath.startsWith(href);
              return (
                <Link {...{ href }} key={label}>
                  <Styled.ListItem {...{ isHighlighted }}>
                    <Typography variant="Navigation" style={{ fontSize: 'inherit' }}>
                      {label}
                    </Typography>
                  </Styled.ListItem>
                </Link>
              );
            })}
          </ul>
        </Styled.ItemsWrapper>
      </Inner>
    </Styled.Wrapper>
  );
};

export default Header;
