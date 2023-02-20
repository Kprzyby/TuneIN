import { Inner } from '@components/styles/inners';
import { Typography } from '@components/styles/typography';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import * as Styled from "./styles";
import { HeaderProps } from "./types";

const Header: React.FC<HeaderProps> = ({ items, isLight }) => {
  const { asPath } = useRouter();
  //TODO: isHighlighted
  return (
    <Styled.Wrapper {...{isLight}}>
        <Inner variant="wide">
            <Styled.ItemsWrapper>
                <Typography variant='Logo'>
                    <Link href="/">TuneIN</Link>
                </Typography>
                <ul>
                    {items.map(({ label, href }) => {
                        const isHighlighted = asPath.startsWith(href);
                        return (
                            <Styled.ListItem key={label} {...{isHighlighted}}>
                                <Typography variant="Navigation">
                                    <Link {...{ href }}>{label}</Link>
                                </Typography>
                            </Styled.ListItem>
                        );
                    })}
                </ul>
            </Styled.ItemsWrapper>
        </Inner>
    </Styled.Wrapper>
  )
};

export default Header;
