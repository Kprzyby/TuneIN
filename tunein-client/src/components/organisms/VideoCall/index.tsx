import React, { useContext, useEffect, useRef, useState } from "react";
import { Typography } from "@components/styles/typography";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { UserData } from "@components/context/UserContext";
import Loader from "@components/atoms/Loader";
import { io, Socket } from "socket.io-client";
import Peer from "peerjs";

import Camera from "../Camera";
import Chat from "../Chat";
import { ENDPOINTS, createDBEndpoint } from "../../../api/endpoint";

import { ChatType, MessageType, Props } from "./types";
import * as Styled from "./styles";

const VideoCall: React.FC<Props> = ({ videocall }) => {
  const [usrStream, setUsrStream] = useState<MediaStream | undefined>(
    undefined
  );
  const [remoteUsrStream, setRemoteUsrStream] = useState<
    MediaStream | undefined
  >(undefined);
  const [is2ndUsr, setIs2ndUsr] = useState(false);
  const [messeges, setMesseges] = useState<MessageType[] | undefined>(
    undefined
  );
  const [isMesseges, setIsMesseges] = useState(false);
  const [chatID, setChatID] = useState<undefined | string>(undefined);
  const [newMessege, setNewMessege] = useState(false);
  const [isChat, setIsChat] = useState(false);
  const [signalRHub, setSignalRHub] = useState<HubConnection | undefined>(
    undefined
  );
  const { user } = useContext(UserData);
  const [roomID, setRoomID] = useState<undefined | string>(videocall?.id);
  const socket = useRef<Socket>();
  const peer = useRef<Peer>();
  const videoServer = "https://black-coast-0973c120f.3.azurestaticapps.net";

  const getUsrStream = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: { autoGainControl: false, echoCancellation: false },
      })
      .then((stream) => {
        setUsrStream(stream);
      });
  };
  const fetchMessages = () => {
    if (!chatID) return;
    createDBEndpoint(ENDPOINTS.chat.getMessages)
      .get({ chatId: chatID, pageSize: 100 })
      .then((res: any) => {
        const tempMessages: MessageType[] = res.data.messages;

        setMesseges(tempMessages);
        setIsMesseges(true);
      });
  };
  const initChats = async () => {
    await createDBEndpoint(ENDPOINTS.chat.getChats)
      .get({ PageSize: 100, messagePageSize: 100 })
      .then((res: any) => {
        const tempChats: ChatType[] = res.data.chats;
        // TODO: get correct chat
        const pickedChat = tempChats.find((x) =>
          x.participants.find((y) => y.userId === user?.id)
        );

        setChatID(pickedChat?.id);
      });
  };
  const initHubConnection = () => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(
        "https://backend20230531150741.azurewebsites.net/Services/ChatService"
      )
      .withAutomaticReconnect()
      .build();

    newConnection.start().then(() => {
      newConnection?.on("MessageSent", () => {
        setNewMessege(true);
      });
    });
    setSignalRHub(newConnection);
  };
  const test2nduser = () => {
    setIs2ndUsr(!is2ndUsr);
  };

  useEffect(() => {
    getUsrStream();
  }, []);

  useEffect(() => {
    socket.current = io(`https://${videoServer}/publicRooms`);

    if (socket.current) {
      socket.current.on("connect", () => {
        console.log(`SocketID: ${socket.current?.id}`);
      });
    }

    return () => {
      if (socket.current) {
        socket.current.emit("user-disconnected", roomID);
        socket.current.disconnect();
        socket.current = undefined;
      }
    };
  }, []);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: { autoGainControl: false, echoCancellation: false },
      })
      .then((stream) => {
        setUsrStream(stream);
        import("peerjs").then(({ default: Peer }) => {
          peer.current = new Peer({
            host: videoServer,
            // port: 3001,
            path: "/peerjs",
          });

          // console.log(peer.current);
          peer.current.on("open", (id) => {
            console.log(`PeerID: ${id}`);
            socket.current?.emit("join", roomID, peer.current?.id);
          });

          peer.current?.on("call", (call) => {
            call.answer(stream);
            console.log("User answered");
            setIs2ndUsr(true);
            call.on("stream", (userVideoStream) => {
              // console.log('Remote video: ' + userVideoStream);
              setRemoteUsrStream(userVideoStream);
            });
          });

          peer.current?.on("disconnected", (roomID) => {
            console.log("User disconected");
          });

          socket.current?.on("user-left", () => {
            console.log("User left");
            setIs2ndUsr(false);
          });

          socket.current?.on("user-connected", (userId) => {
            if (userId !== peer.current?.id) {
              connectToNewUser(userId, stream);
            }
          });

          function connectToNewUser(userId: string, stream: MediaStream) {
            const call = peer.current?.call(userId, stream);

            // console.log(stream);
            console.log("User called");
            setIs2ndUsr(true);
            call?.on("stream", (userVideoStream) => {
              console.log("Calling user received stream");
              setRemoteUsrStream(userVideoStream);
            });
            call?.on("close", () => {
              setRemoteUsrStream(undefined);
            });
          }
        });
      });

    return () => {
      peer.current?.disconnect();
      peer.current?.destroy();
    };
  }, []);

  useEffect(() => {
    initHubConnection();
    initChats();

    return () => {
      signalRHub?.off("MessageSent");
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
    if (is2ndUsr === false) {
      setUsrStream(undefined);
    }
  }, [is2ndUsr]);

  return (
    <Styled.InnerWrapper>
      <Styled.Inner>
        <Styled.Wrapper>
          <Styled.TopPanelWrapper>
            <Styled.TopPanelBG />
            <Styled.TopPanel>
              {!is2ndUsr ? (
                <Styled.WaitingScreen>
                  <Typography variant="ConfirmationDesc">
                    Connection PIN is: {roomID}
                  </Typography>
                  <Typography variant="ConfirmationDesc">
                    Wait for another user
                  </Typography>
                </Styled.WaitingScreen>
              ) : (
                remoteUsrStream && <Camera stream={remoteUsrStream} />
              )}
            </Styled.TopPanel>
          </Styled.TopPanelWrapper>
          <div style={{ marginTop: "0.5rem", display: "flex", gap: "2rem" }}>
            <button type="button" onClick={test2nduser}>
              Test Switch Connection Status
            </button>
            <button type="button" onClick={() => setIsChat(!isChat)}>
              Show/Hide Chat
            </button>
          </div>
          {isChat && messeges && chatID && (
            <div
              style={{
                width: "100%",
                padding: "0 8rem 3rem 8rem",
                minHeight: "20rem",
              }}
            >
              <Chat
                chatId={chatID}
                messages={messeges}
                isMesseges={isMesseges}
              />
            </div>
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
