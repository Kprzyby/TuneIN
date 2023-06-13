import React from "react";

import { Folder } from "../../../../public/assets/svg";

import * as Styled from "./styles";
import { Props } from "./types";

const SongCard: React.FC<Props> = ({ trackAmount, name, styled }: Props) => (
  <Styled.Wrapper {...styled}>
    <Styled.ImgWrap>
      <Folder />
    </Styled.ImgWrap>
    <Styled.Name variant="SongCard">{name}</Styled.Name>
    <Styled.Count variant="SongCard">
      {trackAmount.toString()} Song
      {trackAmount !== 1 && "s"}
    </Styled.Count>
  </Styled.Wrapper>
);

export default SongCard;
