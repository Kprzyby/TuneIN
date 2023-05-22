import React from 'react';
import * as Styled from './styles';
import { Props } from './types';

const DarkButton: React.FC<Props> = ({ text, children }) => (
  <>
    {children !== undefined
      ? (
        <Styled.Wrapper>
          {children}
        </Styled.Wrapper>
      )
      : (
        <Styled.Wrapper>
          <Styled.Text variant="Buttons">{text}</Styled.Text>
        </Styled.Wrapper>
      )}
  </>
);
export default DarkButton;
