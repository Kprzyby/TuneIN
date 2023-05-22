import React, { useEffect, useRef, useState } from 'react';
import * as Styled from './styles';
import ToggleButton from '../../molecules/ToggleButton';

interface LocalCameraProps {
    localStream: MediaStream | null;
}

const LocalCamera: React.FC<LocalCameraProps> = ({localStream}) => {

  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const [stream, setStream] = useState<MediaStream | null>(null);

    const [stream, setStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        /*navigator.mediaDevices.getUserMedia({ video: isAudioEnabled, audio: isAudioEnabled })
            .then(stream => {*/
                setStream(localStream);
                if (videoRef.current && localStream && isVideoEnabled) {
                    videoRef.current.srcObject = localStream;
                }
                if (audioRef.current && localStream && isAudioEnabled) {
                    audioRef.current.srcObject = localStream;
                }

                /*video.addEventListener('loadedmetadata', () => {
                    video.play()
                })*/
            /*})
            .catch(error => {
                console.log('Error getting user media: ', error);
            });*/
            return () => {
                if (stream) {
                    stream.getTracks().forEach(track => {
                        track.stop();
                    });
                }
            }
    }, [localStream])

    const handleAudioToggle = () => {
        if (localStream) {
            const audioTrack = localStream.getAudioTracks()[0];
            setIsAudioEnabled(!isAudioEnabled);
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
            }
        }
      })
      .catch(() => {
        // console.log('Error getting user media: ', error);
      });
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  const handleAudioToggle = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      setIsAudioEnabled(!isAudioEnabled);
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
      }
    }
  };

    const handleVideoToggle = () => {
        if (localStream) {
            const videoTrack = localStream.getVideoTracks()[0];
            setIsVideoEnabled(!isVideoEnabled);
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
            }
        }
    }
  };

    return (
        <Styled.CameraWithButtons>
            <Styled.CameraWrapper>
                <Styled.LocalCamera ref={videoRef} style={{display: isVideoEnabled ? 'block' : 'none'}} autoPlay={true} muted={true} />
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
