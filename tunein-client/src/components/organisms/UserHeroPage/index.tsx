import React from 'react';
import ProfilePicture from '@components/atoms/ProfilePicture';
import { Typography } from '@components/styles/typography';
import * as Styled from './styles';
import { Props } from './types';

const UserHeroPage: React.FC<Props> = ({ userName, email }) => (
  <Styled.Wrapper>
    <Styled.Content>
      <ProfilePicture id={1} />
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-around', paddingLeft: '0.5rem',
      }}
      >
        <Typography variant="Logo">{userName}</Typography>
        <Typography variant="Navigation">{email}</Typography>
        <Typography variant="Navigation">0 Tuitions | 0 Playlists | 0 Unique Users Taught</Typography>
      </div>
    </Styled.Content>
  </Styled.Wrapper>
);

export default UserHeroPage;
