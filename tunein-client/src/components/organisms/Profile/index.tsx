// import { UserData } from '@components/context/UserContext';
// import { createDBEndpoint, ENDPOINTS } from '../../../api/endpoint';
import React from 'react';
import { Props } from './types';

const Profile: React.FC<Props> = ({ id, username }) => (
  <div style={{ fontSize: '10rem', width: '100vw', textAlign: 'center' }}>
    <p>
      Id:
      {' '}
      {id}
    </p>
    <p>{username}</p>
  </div>
);
export default Profile;
