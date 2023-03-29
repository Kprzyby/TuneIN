import React, { useEffect, useRef } from "react";
import * as Styled from "./styles";
import {AnnouncementProperties} from './types'

const Announcement: React.FC<AnnouncementProperties> = ({title, interested, img}) => {

  const Title = useRef<HTMLParagraphElement>(null);
  const Interested = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (Title.current) {
      Title.current.innerHTML = title;
    }
    if (Interested.current) {
      Interested.current.innerHTML = interested + " interested in";
    }
  }, []);

  return (
    <Styled.Announcement title={title} interested={interested} img={img}>
      <Styled.SeeTrough>
        <Styled.Title ref={Title}></Styled.Title>
        <Styled.Interested ref={Interested}></Styled.Interested>
      </Styled.SeeTrough>
    </Styled.Announcement>
  );
};

export default Announcement;
