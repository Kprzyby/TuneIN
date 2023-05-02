import React from 'react';
import { Typography } from '@components/styles/typography';
import { Props } from './types';
import * as Styled from './styles';
import { Messages } from './consts';

const Chat: React.FC<Props> = () => {
  let lastSender: string | undefined;
  return (
    <Styled.Wrapper>
      <Styled.List>
        {Messages.map((m) => {
          const isSameSender = lastSender === undefined ? false : lastSender === m.senderName;
          lastSender = m.senderName;
          return (
            <Styled.Item key={m.id} userIsSender={m.userIsSender}>
              {!m.userIsSender && !isSameSender
              && <Typography variant="ChatEmail">{m.senderName}</Typography>}
              <Styled.Message>
                <Typography variant="ChatMessage">{m.message}</Typography>
              </Styled.Message>
            </Styled.Item>
          );
        })}
      </Styled.List>
    </Styled.Wrapper>
  );
};

export default Chat;
