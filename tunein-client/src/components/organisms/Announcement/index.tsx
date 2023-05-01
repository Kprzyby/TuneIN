import React from 'react';
import Link from 'next/link';
import * as Styled from './styles';
import { Props } from './types';

const Announcement: React.FC<Props> = ({
  tuitionId, title, author, img,
}) => (
  <Link href={`/tuition/${tuitionId}`}>
    <Styled.Announcement {...{ img }}>
      <Styled.SeeTrough>
        <Styled.Title>
          {title}
        </Styled.Title>
        <Styled.Interested>
          {author}
        </Styled.Interested>
      </Styled.SeeTrough>
    </Styled.Announcement>
  </Link>
);

export default Announcement;
