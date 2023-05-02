import React, { useEffect, useState } from 'react';
import { Typography } from '@components/styles/typography';
import ProfilePicture from '@components/atoms/ProfilePicture';
import Loader from '@components/atoms/Loader';
import * as Styled from './styles';
import { ENDPOINTS, createDBEndpoint } from '../../../api/endpoint';
import { UserType } from './types';
import Chat from '../Chat';

const ChatRoom: React.FC = () => {
  const [users, setUsers] = useState<UserType[] | undefined>(undefined);
  const [userListLoading, setUserListLoading] = useState(false);
  const [pickedUserId, setPickedUserId] = useState<number | undefined>(undefined);
  useEffect(() => {
    setUserListLoading(true);
    // TODO: change to accounts with started conversations with user
    createDBEndpoint(ENDPOINTS.user.getusers)
      .post({ PageSize: 100, PageNumber: 1 })
      .then((res) => {
        const tempUsers: UserType[] = res.data.users;
        setUsers(tempUsers);
        setPickedUserId(tempUsers[0].id);
        setUserListLoading(false);
      });
  }, []);
  return (
    <Styled.Wrapper>
      <Styled.Content>
        <Styled.UsersList>
          {userListLoading
            ? <Loader borderColor="white transparent" />
            : users && pickedUserId && users.map((u) => {
              const isHighlighted = u.id === pickedUserId;
              return (
                <Styled.UserItemWrapper {...{ isHighlighted }} key={u.userName}>
                  <Styled.UserItemButton
                    onClick={() => setPickedUserId(u.id)}
                    type="button"
                    {...{ isHighlighted }}
                  >
                    <ProfilePicture id={u.avatarId} width={4} height={4} />
                    <Styled.UserItemRight>
                      <Typography variant="TuitionTopBarItem">{u.userName}</Typography>
                      <Typography variant="ChatEmail">{u.email}</Typography>
                    </Styled.UserItemRight>
                  </Styled.UserItemButton>
                </Styled.UserItemWrapper>
              );
            })}
        </Styled.UsersList>
        <Chat chatId={0} />
      </Styled.Content>
    </Styled.Wrapper>
  );
};

export default ChatRoom;
