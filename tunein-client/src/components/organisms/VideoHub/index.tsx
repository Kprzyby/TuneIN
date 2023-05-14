import React, { useEffect } from 'react';
import DarkButton from '@components/molecules/DarkButton';
import useInputBar from '@components/molecules/InputBar';
import { Typography } from '@components/styles/typography';
import * as Styled from './styles';

const VideoHub: React.FC = () => {
  const {
    renderInputBar, barInput, setReset, enterEvent,
  } = useInputBar({});

  const enterRoom = () => {
    setReset(true);
  };
  const handleEnterButton = (e: any) => {
    e.preventDefault();
    if (barInput === '') return;
    enterRoom();
  };
  const handleCreateButton = (e: any) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!enterEvent) return;
    enterRoom();
  }, [enterEvent]);

  return (
    <Styled.InnerWrapper>
      <Styled.Inner>
        <Styled.Wrapper>
          <Styled.EnterWrapper>
            <Typography variant="RegisterSuccess">
              Enter Video Call PIN
            </Typography>
            <div style={{ paddingTop: '1rem' }}>
              {renderInputBar}
            </div>
            <Styled.Button type="button" onClick={(e) => { handleEnterButton(e); }}>
              <DarkButton text="Connect" />
            </Styled.Button>
          </Styled.EnterWrapper>
          <Styled.CreateWrapper>
            <Typography variant="EditorList">
              Create Video Call
            </Typography>
            <Styled.Button type="button" onClick={(e) => { handleCreateButton(e); }}>
              <DarkButton text="Create" />
            </Styled.Button>
          </Styled.CreateWrapper>
        </Styled.Wrapper>
      </Styled.Inner>
    </Styled.InnerWrapper>
  );
};

export default VideoHub;
