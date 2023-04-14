import React from 'react';
import Link from 'next/link';
import { Typography } from '@components/styles/typography';
import * as Styled from './styles';
import { Props } from './types';

const Navigation: React.FC<Props> = ({ items }) => (
  <Styled.Wrapper>
    <Styled.Content>
      <Styled.List>
        {items.map((i) => (
          <li key={i.label}>
            <Typography variant="ProfileNavbar">
              <Link href={i.href}>{i.label}</Link>
            </Typography>
          </li>
        ))}
      </Styled.List>
    </Styled.Content>
  </Styled.Wrapper>
);

export default Navigation;
