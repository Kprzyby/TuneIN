import React, { useEffect, useRef } from "react"
import * as Styled from "./styles"

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
            .catch(error => {
                console.log('Error getting user media: ', error);
            });
    }, [])

    return (
        <Styled.LocalCamera ref={videoRef} autoPlay muted/>
    )
}

export default LocalCamera;