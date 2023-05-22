import { UserData } from '@components/context/UserContext';
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
// user autorization HOC
function withAuth<T>(Component: any, isUserNeeded: boolean) {
  const Auth = (props: T) => {
    const router = useRouter();
    const { user } = useContext(UserData);
    useEffect(() => {
      if (!user && isUserNeeded) { router.push('/auth/login'); }
      if (user && !isUserNeeded) { router.push('/'); }
    }, []);
    return (<Component {...props} />);
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
}

export default withAuth;
