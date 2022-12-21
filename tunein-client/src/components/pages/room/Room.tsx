import React, { ReactEventHandler, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";


function Room(props: { socket: Socket | undefined, room: string }) {

    const [peerId, setPeerId] = useState("")

    var disconnect: Function

    useEffect(() => {

        import("peerjs").then(({ default: Peer }) => {
            const peer = new Peer()

            peer.on('open', id => {
                setPeerId(id)
            })

            const videoGrid = document.getElementById("videoGrid")

            const myVideo = document.createElement("video")
            myVideo.muted = true

            navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            }).then(stream => {
                addVideoStream(myVideo, stream)

                peer.on("call", call => {
                    console.log(`User answered`)
                    call.answer(stream)
                    const video = document.createElement("video")
                    call.on("stream", userVideoStream => {
                        addVideoStream(video, userVideoStream)
                    })
                })

                if (props.socket) {
                    props.socket.on("user-connected", userId => {
                        connectToNewUser(userId, stream)
                    })

                    props.socket.emit("join", props.room, peer.id)
                }
            })

            function connectToNewUser(userId: string, stream: MediaStream) {
                const call = peer.call(userId, stream)
                const video = document.createElement("video")

                console.log(`User called`)

                call.on("stream", userVideoStream => {
                    addVideoStream(video, userVideoStream)
                })

                call.on("close", () => {
                    video.remove()
                })
            }

            function addVideoStream(video: HTMLVideoElement, stream: MediaStream) {
                video.srcObject = stream
                video.addEventListener('loadedmetadata', () => {
                    video.play()
                })
                if (videoGrid) {
                    videoGrid.append(video)
                }
            }

            disconnect = peer.disconnect
        })

        return () => {
            disconnect()
        }
    }, [])


    return (
        <div className="Room">
            <div id="videoGrid"></div>
        </div>
    )
}

export default Room;