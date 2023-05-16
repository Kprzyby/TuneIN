import React, { useContext, useEffect, useState } from 'react';
import { Typography } from '@components/styles/typography';
import ProfilePicture from '@components/atoms/ProfilePicture';
import Loader from '@components/atoms/Loader';
import { UserData } from '@components/context/UserContext';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import * as Styled from './styles';
import { ENDPOINTS, createDBEndpoint } from '../../../api/endpoint';
import { ChatType } from './types';
import Chat from '../Chat';
import { MessageType } from '../Chat/types';

const ChatRoom: React.FC = () => {
  const [chats, setChats] = useState<ChatType[] | undefined>(undefined);
  const [chatListLoading, setChatListLoading] = useState(false);
  const [pickedChatId, setPickedChatId] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<MessageType[] | undefined>(undefined);
  const [isMesseges, setIsMesseges] = useState<boolean>(false);
  const [newMessege, setNewMessege] = useState(false);
  const [signalRHub, setSignalRHub] = useState<HubConnection | undefined>(undefined);
  const { user } = useContext(UserData);

  const fetchMessages = () => {
    if (!pickedChatId) return;
    createDBEndpoint(ENDPOINTS.chat.getMessages)
      .get({ chatId: pickedChatId, pageSize: 100 })
      .then((res) => {
        const tempMessages: MessageType[] = res.data.messages;
        setMessages(tempMessages);
        setIsMesseges(true);
      });
  };
  const initHubConnection = () => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7074/Services/ChatService')
      .withAutomaticReconnect()
      .build();
    newConnection.start()
      .then(() => {
        newConnection?.on('MessageSent', () => {
          setNewMessege(true);
        });
      });
    setSignalRHub(newConnection);
  };
  const initChats = async () => {
    await createDBEndpoint(ENDPOINTS.chat.getChats)
      .get({ PageSize: 100, messagePageSize: 100 })
      .then((res) => {
        const tempChats: ChatType[] = res.data.chats;
        setChats(tempChats);
        setPickedChatId(tempChats[0].id);
      });
  };

  useEffect(() => {
    setChatListLoading(true);
    initHubConnection();
    initChats().then(() => setChatListLoading(false));
    return () => {
      signalRHub?.off('MessageSent');
    };
  }, []);
  useEffect(() => {
    setIsMesseges(false);
    fetchMessages();
  }, [pickedChatId]);
  useEffect(() => {
    if (!newMessege) return;
    fetchMessages();
    setNewMessege(false);
  }, [newMessege]);

  return (
    <Styled.Wrapper>
      <Styled.Content>
        <Styled.UsersList>
          {chatListLoading
            ? <Loader borderColor="white transparent" />
            : chats && chats.map((c) => {
              const isHighlighted = c.id === pickedChatId;
              const otherUser = user?.id === c.participants[0].userId
                ? c.participants[1]
                : c.participants[0];
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
        {messages && pickedChatId
        && (
          <div style={{ height: '90%', width: '100%' }}>
            <Chat
              chatId={pickedChatId}
              messages={messages}
              isMesseges={isMesseges}
            />
          </div>
        )}
      </Styled.Content>
    </Styled.Wrapper>
  );
};

export default ChatRoom;
