import UserRegister from '@components/organisms/UserRegister';
import { NextPage } from 'next';
import React from 'react';
import withAuth from '../../../api/pageAuth';

const Register: NextPage = () => (
  <UserRegister />
);

export default withAuth(Register, false);
