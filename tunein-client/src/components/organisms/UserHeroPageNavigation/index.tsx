import React from 'react';
import Link from 'next/link';
import * as Styled from './styles';
import { Props } from './types';

const Navigation: React.FC<Props> = ({ items }) => (
  <Styled.Wrapper>
    <Styled.Content>
      <ul>
        {items.map((i) => (
          <li>
            <div>
              <Link href={i.href}>{i.label}</Link>
            </div>
          </li>
        ))}
      </ul>
    </Styled.Content>
  </Styled.Wrapper>
);

export default Navigation;
