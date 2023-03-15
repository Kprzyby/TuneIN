import React, { useEffect, useRef, useState } from "react"
import * as Styled from "./styles"
import ToggleButton from "../../molecules/ToggleButton"

const LocalCamera: React.FC = () => {

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);

    const [stream, setStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: isAudioEnabled, audio: isAudioEnabled })
            .then(stream => {
                setStream(stream);
                if (videoRef.current && stream && isVideoEnabled) {
                    videoRef.current.srcObject = stream;
                }
                if (audioRef.current && stream && isAudioEnabled) {
                    audioRef.current.srcObject = stream;
                }
            })
            .catch(error => {
                console.log('Error getting user media: ', error);
            });
            return () => {
                if (stream) {
                    stream.getTracks().forEach(track => {
                        track.stop();
                    });
                }
            }
    }, [])

    const handleAudioToggle = () => {
        if (stream) {
            const audioTrack = stream.getAudioTracks()[0];
            setIsAudioEnabled(!isAudioEnabled);
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
            }
        }
    }

    const handleVideoToggle = () => {
        if (stream) {
            const videoTrack = stream.getVideoTracks()[0];
            setIsVideoEnabled(!isVideoEnabled);
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
            }
        }
    }

    return (
        <Styled.CameraWithButtons>
            <Styled.CameraWrapper>
                <Styled.LocalCamera ref={videoRef} style={{display: isVideoEnabled ? 'block' : 'none'}} autoPlay muted />
                <audio ref={audioRef} autoPlay />
            </Styled.CameraWrapper>
            <Styled.CameraButtons>
                <ToggleButton text={"Audio toggle"} toggleState={isAudioEnabled} onClick={handleAudioToggle} />
                <ToggleButton text={"Video toggle"} toggleState={isVideoEnabled} onClick={handleVideoToggle} />
            </Styled.CameraButtons>
        </Styled.CameraWithButtons>
    )
}

export default LocalCamera;