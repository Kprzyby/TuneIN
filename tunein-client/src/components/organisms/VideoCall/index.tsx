import React, { useEffect, useState } from 'react';
import { Typography } from '@components/styles/typography';
import { Props } from './types';
import Camera from '../Camera';
import * as Styled from './styles';

const VideoCall: React.FC<Props> = () => {
  const [localStream, setLocalStream] = useState<MediaStream>();
  const [is2ndUsr, setIs2ndUsr] = useState(true);

  const getLocalStream = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
      });
  };
  const test2nduser = () => {
    setIs2ndUsr(!is2ndUsr);
  };

  useEffect(() => {
    getLocalStream();
  }, []);

  return (
    <Styled.InnerWrapper>
      <Styled.Inner>
        <Styled.Wrapper>
          <Styled.TopPanelWrapper>
            <Styled.TopPanelBG />
            <Styled.TopPanel>
              {!is2ndUsr
                ? (
                  <Styled.WaitingScreen>
                    <Typography variant="ConfirmationDesc">PIN do połączenia to: 1111</Typography>
                    <Typography variant="ConfirmationDesc">Poczekaj na drugiego użytkownika</Typography>
                  </Styled.WaitingScreen>
                )
                : localStream && (
                <Camera stream={localStream} />
                )}
            </Styled.TopPanel>
          </Styled.TopPanelWrapper>
          <button type="button" onClick={test2nduser}>Switch</button>
        </Styled.Wrapper>
      </Styled.Inner>
    </Styled.InnerWrapper>
  );
};

export default VideoCall;
