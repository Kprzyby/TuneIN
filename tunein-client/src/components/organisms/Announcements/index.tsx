import React, { useEffect, useState } from 'react';
import Announcement from '@components/organisms/Announcement';
import { useRouter } from 'next/router';
import * as Styled from './styles';
import { Props, Tuition } from './types';
import { ENDPOINTS, createDBEndpoint } from '../../../api/endpoint';

const Announcements: React.FC<Props> = ({ id }) => {
  const router = useRouter();
  const [tuitions, setTuitions] = useState<Tuition[] | null>(null);
  useEffect(() => {
    // for some reason next trys to exec getusertutorships beforehead
    // error still accures
    // TODO: fix it
    if (router.isFallback === true) return;
    const value = { pageSize: 50, pageNumber: 1 };
    if (id) {
      createDBEndpoint(ENDPOINTS.tutorship.getusertutorships + id)
        .post(value)
        .then((res) => setTuitions(res.data.tutorships));
    } else {
      createDBEndpoint(ENDPOINTS.tutorship.gettutorships)
        .post(value)
        .then((res) => setTuitions(res.data.tutorships));
    }
  }, [router.isFallback]);
  return (
    <Styled.Wrapper>
      <Styled.Content>
        {tuitions !== null && tuitions.map((t) => (
          <Announcement
            key={t.id}
            tuitionId={t.id}
            title={t.title}
            author={t.author.username}
            img={t.imageDataURL}
          />
        ))}
      </Styled.Content>
    </Styled.Wrapper>
  );
};

export default Announcements;
