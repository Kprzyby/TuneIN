import React from 'react';
import Image from 'next/image';
import * as Styled from './styles';
import { Props } from './types';

const SongCard: React.FC<Props> = ({
  band, genre, imagePath, name,
}: Props) => (
  <Styled.Wrapper>
    <Styled.ImgWrap>
      {imagePath
        ? (
          <Image
            src={imagePath.toString()}
            alt="cover"
            fill
            style={{ objectFit: 'cover' }}
          />
        )
        : <Styled.DefaultImg />}
    </Styled.ImgWrap>
    <Styled.TitleWrap>
      <Styled.Name variant="SongCard">{name}</Styled.Name>
      <Styled.Band variant="SongCard">{band}</Styled.Band>
    </Styled.TitleWrap>
    <Styled.Genre variant="SongCard">{genre}</Styled.Genre>
  </Styled.Wrapper>
);
export default SongCard;
