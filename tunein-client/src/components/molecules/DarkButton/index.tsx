import React from 'react';
import * as Styled from "./styles";
import { Props } from './types';

const DarkButton: React.FC<Props> = ({text}) => {
  return(
      <Styled.Wrapper>
        <Styled.Box>
            <Styled.Text variant='Buttons'>{text}</Styled.Text>
        </Styled.Box>
      </Styled.Wrapper>
    )
}
export default DarkButton;
