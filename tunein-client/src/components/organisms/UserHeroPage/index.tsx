import React from 'react';
import ProfilePicture from '@components/atoms/ProfilePicture';
import { Typography } from '@components/styles/typography';
import DarkButton from '@components/molecules/DarkButton';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as Styled from './styles';
import { Props } from './types';

const UserHeroPage: React.FC<Props> = ({ userName, email }) => {
  const router = useRouter();
  return (
    <Styled.Wrapper>
      <Styled.Content>
        <div style={{
          display: 'flex',
          flexFlow: 'row nowrap',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
        >
          <div style={{
            display: 'flex',
            flexFlow: 'row nowrap',
          }}
          >
            <ProfilePicture id={1} />
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              paddingLeft: '0.5rem',
            }}
            >
              <Typography variant="Logo">{userName}</Typography>
              <Typography variant="Navigation">{email}</Typography>
              <Typography variant="Navigation">0 Tuitions | 0 Playlists | 0 Unique Users Taught</Typography>
            </div>
          </div>
          <Link href={`${router.asPath}/edit`}><DarkButton text="Edit" /></Link>
        </div>
      </Styled.Content>
    </Styled.Wrapper>
  );
};

export default UserHeroPage;
