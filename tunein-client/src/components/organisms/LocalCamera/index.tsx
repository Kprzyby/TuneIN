import React, { useEffect, useRef, useState } from "react"
import * as Styled from "./styles"

const LocalCamera: React.FC = () => {

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [showImage, setShowImage] = useState<boolean>(true);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                if (videoRef.current && stream) {
                    videoRef.current.srcObject = stream;
                    console.log("here");
                    setShowImage(false);
                }
                if (audioRef.current && stream) {
                    audioRef.current.srcObject = stream;
                }
            })
            .catch(error => {
                console.log('Error getting user media: ', error);
            });
    }, [])

    return (
        <Styled.CameraWithButtons>
            <Styled.CameraWrapper>
                <Styled.LocalCamera ref={videoRef} autoPlay muted poster='https://www.tutorialspoint.com/assets/questions/media/426142-1668760872.png' />
                <audio ref={audioRef} autoPlay />
            </Styled.CameraWrapper>
            <button>Audio toggle</button>
            <button>Video toggle</button>
        </Styled.CameraWithButtons>
    )
}

export default LocalCamera;