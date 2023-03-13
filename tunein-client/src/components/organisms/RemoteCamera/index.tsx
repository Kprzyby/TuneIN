import React, { useEffect, useRef } from "react"
import * as Styled from "./styles"

interface RemoteCameraProps {
    remoteStream: MediaStream | null;
  }

const RemoteCamera: React.FC<RemoteCameraProps> = ({ remoteStream }) => {
    

    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (remoteStream && videoRef.current) {
            videoRef.current.srcObject = remoteStream;
            videoRef.current.play();
          }
    }, [remoteStream])

    return (
        <Styled.RemoteCamera ref={videoRef} autoPlay/>
    )
}

export default RemoteCamera;