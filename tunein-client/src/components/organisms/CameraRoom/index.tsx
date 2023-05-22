import React, { useEffect, useRef, useState } from "react"
import LocalCamera from "../LocalCamera"
import RemoteCamera from "../RemoteCamera"
import { Socket } from "socket.io-client"
import * as Styled from "./styles"
import Peer from "peerjs"

interface CameraRoomProps {
    socket: Socket | undefined;
    room: string;
}

const CameraRoom: React.FC<CameraRoomProps> = ({ socket, room }) => {

    //var testStream: MediaStream = new MediaStream();

    const [peerId, setPeerId] = useState("")
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [peer, setPeer] = useState<Peer | null>(null);

    var disconnect: Function

    useEffect(() => {

        const fn = async () => {
            const PeerJs = (await import('peerjs')).default;
            // set it to state here
            setPeer(new PeerJs())
        }

        fn()

        // peer.on('open', id => {
        //     setPeerId(id)
        // })

    }, [])

    useEffect(() => {

        //import("peerjs").then(({ default: Peer }) => {
        //const peer = new Peer()

        peer?.on('open', id => {
            console.log('My id is: ' + id)
            setPeerId(id)
        })

        //const videoGrid = document.getElementById("videoGrid")

        //const myVideo = document.createElement("video")
        //myVideo.muted = true

        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(stream => {
            setLocalStream(stream)
            //addVideoStream(myVideo, stream)

            peer?.on("call", call => {
                console.log(`User answered`)
                call.answer(stream)
                //const video = document.createElement("video")
                call.on("stream", userVideoStream => {
                    //addVideoStream(video, userVideoStream)
                    setRemoteStream(userVideoStream)
                })
            })

            if (socket) {
                socket.on("user-connected", userId => {
                    console.log("User connected: " + userId)
                    console.log(peer);
                    if (userId !== peer?.id) {
                        console.log("USER trying to connect")
                        connectToNewUser(userId, stream)
                    }
                })

                socket.emit("join", room, peer?.id)
            }
        })

        function connectToNewUser(userId: string, stream: MediaStream) {
            const call = peer?.call(userId, stream)
            //const video = document.createElement("video")

            console.log(`User called`)

            call?.on("stream", userVideoStream => {
                //addVideoStream(video, userVideoStream)
                setRemoteStream(userVideoStream)
            })

            call?.on("close", () => {
                //video.remove()
            })
        }

        /*function addVideoStream(video: HTMLVideoElement, stream: MediaStream) {
            video.srcObject = stream
            video.addEventListener('loadedmetadata', () => {
                video.play()
            })
            if (videoGrid) {
                videoGrid.append(video)
            }
        }*/

        //disconnect = peer?.disconnect
        //})

        return () => {
            peer?.disconnect
        }
    }, [peer])

    return (
        <Styled.CameraRoom>
            <LocalCamera localStream={localStream} />
            <Styled.RemoteCameras>
                <Styled.TestItem />
                <Styled.TestItem />
                <Styled.TestItem />
                <Styled.TestItem />
                <RemoteCamera remoteStream={remoteStream} />
            </Styled.RemoteCameras>
        </Styled.CameraRoom>
    )
}

export default CameraRoom;
