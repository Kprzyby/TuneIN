import React, { useEffect, useRef } from "react";
import * as Styled from "./styles";

interface announcementProperties {
  title: string;
  img?: string;
  // Check with the guys if they'd preffer to pass number of interested or get it inside
}

const Announcement: React.FC<announcementProperties> = ({title, img}) => {
  const Title = useRef<HTMLParagraphElement>(null);
  const Interested = useRef<HTMLParagraphElement>(null);
 ;;;

  return (
    <Styled.Announcement>
      <Styled.SeeTrough>
        <Styled.Title ref={Title} />
        <Styled.Interested ref={Interested} />
      </Styled.SeeTrough>
    </Styled.Announcement>
  );
};

export default Announcement;
