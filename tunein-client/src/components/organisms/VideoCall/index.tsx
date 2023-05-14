import React from 'react';
import { Props } from './types';

const VideoCall: React.FC<Props> = ({ videocall }) => (
  <div>{videocall?.id}</div>
);

export default VideoCall;
