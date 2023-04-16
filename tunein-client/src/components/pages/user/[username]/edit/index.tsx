import { NextPage } from 'next';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserData } from '@components/context/UserContext';
import withAuth from '../../../../../api/pageAuth';

const Edit: NextPage = () => {
  const router = useRouter();
  const { user } = useContext(UserData);
  const [uname, setUname] = useState<string | string[] | undefined>(undefined);
  useEffect(() => {
    if (router.query?.username) {
      const name = router.query.username;
      if (user?.userName === name) {
        setUname(name);
      }
    }
  }, [router.query]);
  return (
    <div>
      {uname}
    </div>
  );
};

export default withAuth(Edit, true);
