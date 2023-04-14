import React from 'react';
import * as Styled from './styles';
import { AnnouncementProperties } from './types';

const Announcement: React.FC<AnnouncementProperties> = ({ title, interested, img }) => (
  <Styled.Announcement {...{ img }}>
    <Styled.SeeTrough>
      <Styled.Title>
        {title}
      </Styled.Title>
      <Styled.Interested>
        {interested}
        {' '}
        interested in
      </Styled.Interested>
    </Styled.SeeTrough>
  </Styled.Announcement>
);

export default Announcement;
