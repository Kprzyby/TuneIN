import React from "react";

import * as Styled from "./styles";

const Heropage: React.FC = () => (
  <Styled.Wrapper>
    <Styled.Content>
      <Styled.Title variant="Logo">TuenIN</Styled.Title>
      <Styled.Description variant="Logo">
        Objectively your best place to learn and teach music
      </Styled.Description>
    </Styled.Content>
  </Styled.Wrapper>
);

export default Heropage;
