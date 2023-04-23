import React, { useEffect, useState } from 'react';
import Announcement from '@components/organisms/Announcement';
import { useRouter } from 'next/router';
import * as Styled from './styles';
import { Props } from './types';
import { ENDPOINTS, createDBEndpoint } from '../../../api/endpoint';

const Announcements: React.FC<Props> = ({ id }) => {
  const router = useRouter();
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
  const testimgsrc = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/%C5%A0ventasis_Kazimieras%2C_1594_cropped.jpg/183px-%C5%A0ventasis_Kazimieras%2C_1594_cropped.jpg';
  useEffect(() => {
    // for some reason next trys to exec getusertutorships beforehead
    // error still accures
    // TODO: fix it
    if (router.isFallback === true) return;
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
  }, [router.isFallback]);
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
