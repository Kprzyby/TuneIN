import React from 'react';
import { NextPage } from 'next';
import Profile from '@components/organisms/Profile';
import withAuth from '../../../api/pageAuth';

const ProfilePage: NextPage = () => (
  <Profile />
);

export default withAuth(ProfilePage, true);
