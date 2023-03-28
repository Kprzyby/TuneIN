import React, { useEffect, useRef } from "react";
import * as Styled from "./styles";
import * as Endpoint from '../../../api/endpoint'
import {AnnouncementProperties} from './types'

const Announcement: React.FC<AnnouncementProperties> = ({title, img}) => {

  const Title = useRef<HTMLParagraphElement>(null);
  const Interested = useRef<HTMLParagraphElement>(null);

  return (
    <Styled.Announcement title="" img={img}>
      <Styled.SeeTrough>
        <Styled.Title ref={Title} />
        <Styled.Interested ref={Interested} />
      </Styled.SeeTrough>
    </Styled.Announcement>
  );
};

export default Announcement;
