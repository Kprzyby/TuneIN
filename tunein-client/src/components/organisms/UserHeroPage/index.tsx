import React, { useContext, useEffect, useState } from 'react';
import { Typography } from '@components/styles/typography';
import DarkButton from '@components/molecules/DarkButton';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { UserData } from '@components/context/UserContext';
import ProfilePicture from '@components/atoms/ProfilePicture';
import * as Styled from './styles';
import { Props } from './types';
import { ENDPOINTS, createDBEndpoint } from '../../../api/endpoint';

const UserHeroPage: React.FC<Props> = ({
  userName, email, id, avatarId,
}) => {
  const router = useRouter();
  const [path, setPath] = useState<string | undefined>(undefined);
  const [tuitCounter, setTuitCounter] = useState(0);
  const [playlCounter, setPlaylCounter] = useState(0);
  useEffect(() => {
    setPath(router.asPath);
    createDBEndpoint(ENDPOINTS.tutorship.getusertutorships + id)
      .post({ pageSize: 1, pageNumber: 1 })
      .then((res) => {
        setTuitCounter(res.data.totalCount);
        // temp
        setPlaylCounter(0);
      });
  }, [router.asPath]);
  const { user } = useContext(UserData);
  // TODO:add counters
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
            <Styled.AvatarWrapper>
              <ProfilePicture id={avatarId} width={8} height={8} />
            </Styled.AvatarWrapper>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              paddingLeft: '0.5rem',
            }}
            >
              <Typography variant="Logo">{userName}</Typography>
              <Typography variant="Navigation">{email}</Typography>
              <Typography variant="Navigation">
                {tuitCounter}
                {' '}
                Tuitions |
                {' '}
                {playlCounter}
                {' '}
                Playlists
              </Typography>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {user?.userName !== userName && path !== undefined && (
              <Link href="/"><DarkButton text="Send Message" /></Link>
            )}
            {user?.userName === userName && path !== undefined && (
            <>
              <Link href={`${path}/messages`}><DarkButton text="Messages" /></Link>
              <Link href={`${path}/edit`}><DarkButton text="Edit" /></Link>
            </>
            )}
          </div>
        </div>
      </Styled.Content>
    </Styled.Wrapper>
  );
};

export default UserHeroPage;
