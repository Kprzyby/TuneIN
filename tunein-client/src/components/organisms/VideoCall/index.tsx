import React, { useContext, useEffect, useState } from 'react';
import { Typography } from '@components/styles/typography';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { UserData } from '@components/context/UserContext';
import Loader from '@components/atoms/Loader';
import { ChatType, MessageType, Props } from './types';
import Camera from '../Camera';
import * as Styled from './styles';
import Chat from '../Chat';
import { ENDPOINTS, createDBEndpoint } from '../../../api/endpoint';

const VideoCall: React.FC<Props> = () => {
  const [usrStream, setUsrStream] = useState<MediaStream | undefined>(undefined);
  const [is2ndUsr, setIs2ndUsr] = useState(false);
  const [messeges, setMesseges] = useState<MessageType[] | undefined>(undefined);
  const [isMesseges, setIsMesseges] = useState(false);
  const [chatID, setChatID] = useState<undefined | string>(undefined);
  const [newMessege, setNewMessege] = useState(false);
  const [isChat, setIsChat] = useState(false);
  const [signalRHub, setSignalRHub] = useState<HubConnection | undefined>(undefined);
  const { user } = useContext(UserData);

  const getUsrStream = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setUsrStream(stream);
      });
  };
  const fetchMessages = () => {
    if (!chatID) return;
    createDBEndpoint(ENDPOINTS.chat.getMessages)
      .get({ chatId: chatID, pageSize: 100 })
      .then((res) => {
        const tempMessages: MessageType[] = res.data.messages;
        setMesseges(tempMessages);
        setIsMesseges(true);
      });
  };
  const initChats = async () => {
    await createDBEndpoint(ENDPOINTS.chat.getChats)
      .get({ PageSize: 100, messagePageSize: 100 })
      .then((res) => {
        const tempChats: ChatType[] = res.data.chats;
        // TODO: get correct chat
        const pickedChat = tempChats
          .find((x) => x.participants.find((y) => y.userId === user?.id));
        setChatID(pickedChat?.id);
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
  const test2nduser = () => {
    setIs2ndUsr(!is2ndUsr);
  };

  useEffect(() => {
    initHubConnection();
    initChats();
    return () => {
      signalRHub?.off('MessageSent');
    };
  }, []);
  useEffect(() => {
    if (!newMessege) return;
    fetchMessages();
    setNewMessege(false);
  }, [newMessege]);
  useEffect(() => {
    setIsMesseges(false);
    fetchMessages();
  }, [chatID]);
  useEffect(() => {
    setUsrStream(undefined);
    if (is2ndUsr === false) return;
    getUsrStream();
  }, [is2ndUsr]);

  return (
    <Styled.InnerWrapper>
      <Styled.Inner>
        <Styled.Wrapper>
          <Styled.TopPanelWrapper>
            <Styled.TopPanelBG />
            <Styled.TopPanel>
              {!is2ndUsr
                ? (
                  <Styled.WaitingScreen>
                    <Typography variant="ConfirmationDesc">Connection PIN is: 1111</Typography>
                    <Typography variant="ConfirmationDesc">Wait for another user</Typography>
                  </Styled.WaitingScreen>
                )
                : usrStream && (
                  <Camera stream={usrStream} />
                )}
            </Styled.TopPanel>
          </Styled.TopPanelWrapper>
          <div style={{ marginTop: '0.5rem', display: 'flex', gap: '2rem' }}>
            <button type="button" onClick={test2nduser}>Test Switch Connection Status</button>
            <button type="button" onClick={() => setIsChat(!isChat)}>Show/Hide Chat</button>
          </div>
          {isChat && messeges && chatID && (
            <Chat
              chatId={chatID}
              messages={messeges}
              isMesseges={isMesseges}
            />
          )}
          {isChat && (!messeges || !chatID) && (
            <Loader borderColor="white transparent" />
          )}
        </Styled.Wrapper>
      </Styled.Inner>
    </Styled.InnerWrapper>
  );
};

export default VideoCall;
