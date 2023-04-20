import React, { useEffect, useState } from 'react';
import Announcement from '@components/organisms/Announcement';
import * as Styled from './styles';
import { Props } from './types';
import { ENDPOINTS, createDBEndpoint } from '../../../api/endpoint';

const Announcements: React.FC<Props> = ({ id }) => {
  const [tuitions, setTuitions] = useState(
    {
      tutorships: [
        {
          id: 0,
          title: '',
          details: '',
          price: 0,
          category: '',
          author: {
            id: 0,
            username: '',
          },
        }],
    },
  );
  const testimgsrc = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Jon_Rahm_%28cropped%29.png/182px-Jon_Rahm_%28cropped%29.png';
  useEffect(() => {
    const value = { pageSize: 10, pageNumber: 1 };
    if (id) {
      createDBEndpoint(ENDPOINTS.tutorship.getusertutorships + id)
        .post(value)
        .then((res) => setTuitions(res.data));
    } else {
      createDBEndpoint(ENDPOINTS.tutorship.gettutorships)
        .post(value)
        .then((res) => setTuitions(res.data));
    }
  }, []);
  return (
    <Styled.Wrapper>
      <Styled.Content>
        {tuitions.tutorships.map((t) => (
          <Announcement key={t.id} title={t.title} interested={100} img={testimgsrc} />
        ))}
      </Styled.Content>
    </Styled.Wrapper>
  );
};

export default Announcements;
