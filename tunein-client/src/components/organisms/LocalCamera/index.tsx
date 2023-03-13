import React, { useEffect, useRef } from "react"
import { Stream } from "stream";

const LocalCamera: React.FC = () => {

    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }
            })
    }, [])

    return (
        <video ref={videoRef} width="320" height="240" autoPlay muted></video>
    )
}

export default LocalCamera;