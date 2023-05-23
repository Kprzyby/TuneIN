import React from 'react';
import * as Styled from './styles';
import { Props } from './types';
import { Folder } from '../../../../public/assets/svg';

const SongCard: React.FC<Props> = ({ count, name, styled }: Props) => (
  <Styled.Wrapper {...styled}>
    <Styled.ImgWrap>
      <Folder />
    </Styled.ImgWrap>
    <Styled.Name variant="SongCard">{name}</Styled.Name>
    <Styled.Count variant="SongCard">
      {count.toString()}
      {' '}
      Song
      {count !== 1 && ('s')}
    </Styled.Count>
  </Styled.Wrapper>
);
export default SongCard;
