import { UserData } from '@components/context/UserContext';
import React, { useContext, useEffect, useState } from 'react';
import { createDBEndpoint, ENDPOINTS } from '../../../api/endpoint';
import { Props } from './types';

const Profile: React.FC<Props> = ({ id, username }) => {
  // TODO: Add profile, edit and delete tuition,
  // change endpoint soo that everyone can access it, change acces to userc login cookie
  const [isLoggedin, setIsLoggedIn] = useState(false);
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
  const { user } = useContext(UserData);
  useEffect(() => {
    if (user?.userName === username) {
      setIsLoggedIn(true);
    }
    const value = { pageSize: 10, pageNumber: 1 };
    createDBEndpoint(ENDPOINTS.tutorship.getusertutorships + id)
      .post(value)
      .then((res) => {
        setTuitions(res.data);
        console.log(res.data);
      })
      .catch(() => {
      });
  }, [user]);

  return (
    <div style={{
      fontSize: '10rem', width: '100vw', textAlign: 'center', fontFamily: 'monospace',
    }}
    >
      <p>
        Id:
        {id}
      </p>
      <p>{username}</p>
      <p style={{ fontSize: '4rem' }}>
        Can edit?:
        {isLoggedin ? 'yes' : 'no'}
      </p>
      <ul style={{ fontSize: '3rem' }}>
        {tuitions.tutorships.map((t) => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
};
export default Profile;
