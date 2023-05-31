import CameraRoom from '@components/organisms/CameraRoom';
import { NextPage } from 'next'
import React, { useEffect, useRef, useState  } from "react"
import { io, Socket } from "socket.io-client";
import LocalCamera from '../../organisms/LocalCamera';

const Homepage: NextPage = () =>{

    const [connected, setConnected] = useState(false)
    const [room, setRoom] = useState("")
    const [connectedToRoom, setConnectedToRoom] = useState(false)
    const socket = useRef<Socket>()

    useEffect(() => {
        socket.current = io('https://192.168.43.80:3001/publicRooms');

        if (socket.current) {
            socket.current.on("connect", () => {
                setConnected(true)
                console.log(socket.current?.id)
            })

            /*socket.current.on("user-connected", (id: string) => {
                console.log("User connected: " + id)
            })*/
        }
        return () => {
            if (socket.current) {
                socket.current.disconnect()
                socket.current = undefined
            }
        }
    }, [])

    const joinRoom = () => {
        if (room !== "") {
            setConnectedToRoom(true)
        }
    }

    return(
        <>
        {
            !connectedToRoom &&
            <>
                <input
                    type="text"
                    placeholder="Room ID"
                    onChange={(event) => { setRoom(event.target.value) }}
                />
                <button onClick={joinRoom}>Join Room</button>
            </>

        }
        {
            connectedToRoom &&
            <CameraRoom socket={socket.current} room={room}/>
            //<Room socket={socket.current} room={room}/>
        }
    </>
    );
}

export default Homepage;
