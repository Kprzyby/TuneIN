import Password from '@components/organisms/Password';
import TuitionRegister from '@components/organisms/TuitionRegister';
import UserRegister from '@components/organisms/UserRegister';
import { NextPage } from 'next';
import React from 'react';

const Register: NextPage = () => {
  return (
    <>
        <UserRegister/>
        <Password/>
        <TuitionRegister/>
    </>
  )
}

export default Register;
