import React, { useEffect, useRef } from 'react';
import { Typography } from '@components/styles/typography';
import useInputBar from '@components/molecules/InputBar';
import Loader from '@components/atoms/Loader';
import { Props } from './types';
import * as Styled from './styles';
import { ENDPOINTS, createDBEndpoint } from '../../../api/endpoint';

const Chat: React.FC<Props> = ({ chatId, messages, isMesseges }) => {
  let lastSender: string | undefined;
  const listBottomRef = useRef<HTMLInputElement>(null);
  const {
    renderInputBar, barInput, enterEvent, setReset,
  } = useInputBar({});

  const scrollBottom = () => {
    if (listBottomRef.current === null) return;
    listBottomRef.current.scrollIntoView(
      { behavior: 'smooth', block: 'end' },
    );
  };
  const handleMessageSend = () => {
    createDBEndpoint(ENDPOINTS.chat.sendMessage)
      .post({ chatId, message: barInput });
  };

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
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        {!isMesseges
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
      </div>
      <div style={{ width: '100%' }}>
        {renderInputBar}
      </div>
    </Styled.Wrapper>
  );
};

export default Chat;
