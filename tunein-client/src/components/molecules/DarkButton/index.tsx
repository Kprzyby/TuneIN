import React, { useState } from 'react';
import * as Styled from "./styles";

const DarkButton: React.FC = () => {
  return(
      <Styled.Wrapper>
        <Styled.Box>
            <Styled.Text variant='Buttons'>Edit</Styled.Text>
        </Styled.Box>
      </Styled.Wrapper>
    )
}
export default DarkButton;
