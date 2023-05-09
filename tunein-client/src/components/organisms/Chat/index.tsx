import React, { useEffect, useRef, useState } from 'react';
import { Typography } from '@components/styles/typography';
import useInputBar from '@components/molecules/InputBar';
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';
import Loader from '@components/atoms/Loader';
import { MessageType, Props } from './types';
import * as Styled from './styles';
import { ENDPOINTS, createDBEndpoint } from '../../../api/endpoint';

const Chat: React.FC<Props> = ({ chatId }) => {
  let lastSender: string | undefined;
  const listBottomRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<MessageType[] | undefined>(undefined);
  const [hubConnection, setHubConnection] = useState<HubConnection | undefined>(undefined);
  const hubUrl = 'https://localhost:7074/Services/ChatService';
  const {
    renderInputBar, barInput, enterEvent, setReset,
  } = useInputBar({});
  const scrollBottom = () => {
    if (listBottomRef.current === null) return;
    listBottomRef.current.scrollIntoView(
      { behavior: 'smooth', block: 'end' },
    );
  };
  const handleMessageSend = async () => {
    await createDBEndpoint(ENDPOINTS.chat.sendMessage)
      .post({ chatId, message: barInput });
  };
  const fetchMessages = async () => {
    await createDBEndpoint(ENDPOINTS.chat.getMessages)
      .get({ chatId, pageSize: 100 })
      .then((res) => {
        const tempMessages: MessageType[] = res.data.messages;
        setMessages(tempMessages);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();
    setHubConnection(newConnection);
  }, []);
  useEffect(() => {
    if (hubConnection) {
      hubConnection.start()
        .then(() => {
          hubConnection.on('MessageSent', () => {
            fetchMessages();
          });
        })
        .catch((e: any) => {
          console.log('Connection failed: ', e);
        });
    }
  }, [hubConnection]);
  useEffect(() => {
    setLoading(true);
    fetchMessages();
  }, [chatId]);
  useEffect(() => {
    scrollBottom();
  }, [messages]);
  useEffect(() => {
    if (enterEvent === true) {
      setReset(true);
      if (barInput === '') return;
      handleMessageSend();
    }
  }, [enterEvent]);
  return (
    <Styled.Wrapper>
      {loading
        ? (
          <Styled.LoaderWrapper>
            <Loader borderColor="white transparent" />
          </Styled.LoaderWrapper>
        )
        : (
          <Styled.List>
            {messages?.map((m) => {
              const isSameSender = lastSender === undefined
                ? false
                : lastSender === m.senderName;
              lastSender = m.senderName;
              return (
                <Styled.Item key={m.id} userIsSender={m.userIsSender}>
                  {!m.userIsSender && !isSameSender
              && <Typography variant="ChatEmail">{m.senderName}</Typography>}
                  <Styled.Message>
                    <div style={{ maxWidth: '30rem', wordWrap: 'break-word' }}>
                      <Typography variant="ChatMessage">{m.message}</Typography>
                    </div>
                  </Styled.Message>
                </Styled.Item>
              );
            })}
            <div ref={listBottomRef} />
          </Styled.List>
        )}
      <div style={{ position: 'absolute', bottom: '1rem', width: '100%' }}>
        {renderInputBar}
      </div>
    </Styled.Wrapper>
  );
};

export default Chat;
