import React, { useContext, useEffect, useState } from 'react';
import { Typography } from '@components/styles/typography';
import ProfilePicture from '@components/atoms/ProfilePicture';
import Loader from '@components/atoms/Loader';
import * as Styled from './styles';
import { ENDPOINTS, createDBEndpoint } from '../../../api/endpoint';
import { ChatType, UserType } from './types';
import Chat from '../Chat';
import { UserData } from '@components/context/UserContext';

const ChatRoom: React.FC = () => {
  const [chats, setChats] = useState<ChatType[] | undefined>(undefined);
  const [chatListLoading, setChatListLoading] = useState(false);
  const { user } = useContext(UserData);
  const [pickedChatId, setPickedChatId] = useState<string | undefined>(undefined);
  useEffect(() => {
    setChatListLoading(true);
    createDBEndpoint(ENDPOINTS.chat.getChats)
      .get({ PageSize: 100, messagePageSize: 100 })
      .then((res) => {
        const tempChats: ChatType[] = res.data.chats;
        setChats(tempChats);
        setPickedChatId(tempChats[0].id);
        setChatListLoading(false);
      });
  }, []);
  return (
    <Styled.Wrapper>
      <Styled.Content>
        <Styled.UsersList>
          {chatListLoading
            ? <Loader borderColor="white transparent" />
            : chats && pickedChatId && chats.map((c) => {
              const isHighlighted = c.id === pickedChatId;
              const otherUser=user?.id===c.participants[0].userId?c.participants[1]:c.participants[0];
              return (
                <Styled.UserItemWrapper {...{ isHighlighted }} key={c.id}>
                  <Styled.UserItemButton
                    onClick={() => setPickedChatId(c.id)}
                    type="button"
                    {...{ isHighlighted }}
                  >
                    <ProfilePicture id={otherUser.avatarId} width={4} height={4} />
                    <Styled.UserItemRight>
                      <Typography variant="TuitionTopBarItem">{otherUser.username}</Typography>
                      <Typography variant="ChatEmail">{otherUser.email}</Typography>
                    </Styled.UserItemRight>
                  </Styled.UserItemButton>
                </Styled.UserItemWrapper>
              );
            })}
        </Styled.UsersList>
        {pickedChatId!==undefined && <Chat chatId={pickedChatId} />}       
      </Styled.Content>
    </Styled.Wrapper>
  );
};

export default ChatRoom;
