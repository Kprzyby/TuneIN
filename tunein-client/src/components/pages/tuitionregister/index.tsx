import TuitionRegister from '@components/organisms/TuitionRegister';
import { type NextPage } from 'next';
import React from 'react';
import withAuth from '../../../api/pageAuth';

const TuitionRegisterPage: NextPage = () => (
  <div>
    <TuitionRegister />
  </div>
);

export default withAuth(TuitionRegisterPage, true);
