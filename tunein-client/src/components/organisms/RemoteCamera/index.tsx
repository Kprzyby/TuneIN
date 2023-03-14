import React, { useEffect, useRef } from "react"
import * as Styled from "./styles"

interface RemoteCameraProps {
    remoteStream: MediaStream | null;
}

const RemoteCamera: React.FC<RemoteCameraProps> = ({ remoteStream }) => {


    const videoRef = useRef<HTMLVideoElement | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (remoteStream && videoRef.current) {
            videoRef.current.srcObject = remoteStream;
        }
        if (remoteStream && audioRef.current) {
            audioRef.current.srcObject = remoteStream;
        }
    }, [remoteStream])

    return (
        <Styled.CameraWrapper>
            <Styled.RemoteCamera ref={videoRef} autoPlay poster='https://www.tutorialspoint.com/assets/questions/media/426142-1668760872.png' />
            <audio ref={audioRef} autoPlay />
        </Styled.CameraWrapper>
    )
}

export default RemoteCamera;