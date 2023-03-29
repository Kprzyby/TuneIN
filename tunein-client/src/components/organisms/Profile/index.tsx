import { UserData } from '@components/context/UserContext';
import React, { useContext } from 'react';

const Profile: React.FC = () => {
  // TODO: profile component
  const { user } = useContext(UserData);
  return (
    <div style={{ fontSize: '10rem', width: '100vw', textAlign: 'center' }}>
      {user ? user.userName : 'undefined'}
    </div>
  );
};

export default Profile;
