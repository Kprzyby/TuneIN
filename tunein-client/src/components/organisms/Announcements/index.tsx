import React, { useEffect, useState } from 'react';
import Announcement from '@components/organisms/Announcement';
import { useRouter } from 'next/router';
import Loader from '@components/atoms/Loader';
import * as Styled from './styles';
import { Props, Tuition } from './types';
import { ENDPOINTS, createDBEndpoint } from '../../../api/endpoint';

const Announcements: React.FC<Props> = ({ id }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tuitions, setTuitions] = useState<Tuition[] | null>(null);
  useEffect(() => {
    // for some reason next trys to exec getusertutorships beforehead
    // error still accures
    // TODO: fix it
    if (router.isFallback === true) return;
    const value = { pageSize: 50, pageNumber: 1 };
    setLoading(true);
    if (id) {
      createDBEndpoint(ENDPOINTS.tutorship.getusertutorships + id)
        .post(value)
        .then((res) => {
          setTuitions(res.data.tutorships);
          setLoading(false);
        });
    } else {
      createDBEndpoint(ENDPOINTS.tutorship.gettutorships)
        .post(value)
        .then((res) => {
          setTuitions(res.data.tutorships);
          setLoading(false);
        });
    }
  }, [router.isFallback]);
  return (
    <Styled.Wrapper>
      <Styled.Content>
        {loading ? (
          <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
            <Loader borderColor="white transparent" />
          </div>
        )
          : tuitions !== null && tuitions.map((t) => (
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
