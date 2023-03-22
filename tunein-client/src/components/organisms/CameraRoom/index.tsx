import React from 'react';
import LocalCamera from '../LocalCamera';
import * as Styled from './styles';

const CameraRoom: React.FC = () => (
  <Styled.CameraRoom>
    <LocalCamera />
    <Styled.RemoteCameras>
      <Styled.TestItem />
      <Styled.TestItem />
      <Styled.TestItem />
      <Styled.TestItem />
    </Styled.RemoteCameras>
    {/* <RemoteCamera remoteStream={} /> */}
  </Styled.CameraRoom>
);

export default CameraRoom;
