import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { Typography } from '@components/styles/typography';
import useInputBar from '@components/molecules/InputBar';
import { UserData } from '@components/context/UserContext';
import { Props } from './types';
import * as Styled from './styles';
import { Messages } from './consts';

const Chat: React.FC<Props> = () => {
  let lastSender: string | undefined;
  const listBottomRef = useRef<HTMLInputElement>(null);
  const [scrlBtttom, setScrlBottom] = useState(false);
  const { user } = useContext(UserData);
  const {
    renderInputBar, barInput, enterEvent, setReset,
  } = useInputBar({});
  const handleMessageSend = () => {
    Messages.push({
      id: Messages[Messages.length - 1].id + 1,
      message: barInput,
      senderName: user?.userName || 'err',
      userIsSender: true,
    });
  };
  useEffect(() => {
    if (enterEvent === true) {
      setReset(true);
      if (barInput === '') return;
      handleMessageSend();
      setScrlBottom(true);
    }
  }, [enterEvent]);
  useEffect(() => {
    if (scrlBtttom === true) {
      setScrlBottom(false);
      if (listBottomRef.current === null) return;
      listBottomRef.current.scrollIntoView(
        { behavior: 'smooth', block: 'end' },
      );
    }
  }, [scrlBtttom]);
  return (
    <Styled.Wrapper>
      <Styled.List>
        {Messages.map((m) => {
          const isSameSender = lastSender === undefined
            ? false
            : lastSender === m.senderName;
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
        <div ref={listBottomRef} />
      </Styled.List>
      {renderInputBar}
    </Styled.Wrapper>
  );
};

export default Chat;
