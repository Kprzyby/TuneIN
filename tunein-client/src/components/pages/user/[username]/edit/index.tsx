import { NextPage } from 'next';
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { UserData } from '@components/context/UserContext';
import EditCnt from '@components/organisms/UserEditWrapper';
import withAuth from '../../../../../api/pageAuth';

const EditPage: NextPage = () => {
  const router = useRouter();
  const { user } = useContext(UserData);
  useEffect(() => {
    if (router.query?.username) {
      const name = router.query.username;
      if (user?.userName !== name) {
        // temporary solution
        router.back();
      }
    }
  }, [router.query]);
  return (
    <EditCnt />
  );
};

export default withAuth(EditPage, true);
