import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { Typography } from '@components/styles/typography';
import useInputBar from '@components/molecules/InputBar';
import { UserData } from '@components/context/UserContext';
import { MessageType, Props } from './types';
import * as Styled from './styles';
import { ENDPOINTS, createDBEndpoint } from '../../../api/endpoint';
import { HubConnectionBuilder } from '@microsoft/signalr';

const Chat: React.FC<Props> = (props) => {
  console.log(props.chatId);
  let lastSender: string | undefined;
  const listBottomRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages]=useState<MessageType[]|undefined>(undefined);
  const [scrlBtttom, setScrlBottom] = useState(false);
  const [hubConnection, setHubConnection]=useState(null);
  const hubUrl='https://localhost:7074/Services/ChatService'
  const { user } = useContext(UserData);
  const {
    renderInputBar, barInput, enterEvent, setReset,
  } = useInputBar({});
  const handleMessageSend = async () => {
    await createDBEndpoint(ENDPOINTS.chat.sendMessage)
    .post({chatId:props.chatId, message:barInput});
  };
  const fetchMessages=async ()=>{
    console.log('Fetched messages');
    await createDBEndpoint(ENDPOINTS.chat.getMessages)
    .get({chatId:props.chatId, pageSize:100})
    .then((res)=>{
      const tempMessages: MessageType[] = res.data.messages;
      setMessages(tempMessages);
    })
    .catch((err)=>{
      console.log(err.data);
    });
  }
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
            .then(result => {
                console.log('Connected!');

                hubConnection.on('MessageSent', message => {
                  console.log('onMessageSent');
                  fetchMessages();
                });
            })
            .catch(e => console.log('Connection failed: ', e));
    }
}, [hubConnection]);
  useEffect(()=>{
    fetchMessages();
  },[props.chatId]);
  useEffect(() => {
    console.log('enter');
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
