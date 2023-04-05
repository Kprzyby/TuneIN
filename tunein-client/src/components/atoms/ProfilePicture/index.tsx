import React, { useState } from 'react';
import { Musicians } from '../../../../public/assets/svg';
import { Props } from './types';
import * as Styled from './styles';

const ProfilePicture: React.FC<Props> = ({ id }) => {
  const [Icon] = useState(() => {
    if ((id || 0) > Musicians.length - 1) {
      return Musicians[0];
    }
    return Musicians[id || 0];
  });
  return (
    <Styled.Wrapper>
      <Icon.Musician style={{ width: '8rem', height: '8rem' }} />
    </Styled.Wrapper>
  );
};
export default ProfilePicture;
