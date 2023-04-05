import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import Profile from '@components/organisms/Profile';
import UserHeroPage from '@components/organisms/UserHeroPage';
// import UserHeroPageNavigation from '@components/organisms/UserHeroPageNavigation';
import { Props } from './types';
import { ENDPOINTS, createDBEndpoint } from '../../../../api/endpoint';

const ProfilePage: NextPage<Props> = ({ user }: Props) => (
  <>
    <UserHeroPage {...user} />
    {/* <UserHeroPageNavigation /> */}
    <Profile {...user} />
  </>
);

export default ProfilePage;

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const pickedUser = await createDBEndpoint(ENDPOINTS.auth.getusers)
    .post({
      pageSize: 10000,
      pageNumber: 1,
      sortInfo: [
        {
          key: 'UserName',
          value: 'asc',
        },
      ],
    })
    .then((res) => {
      const usr = res.data.users.find((x: any) => x.userName === context.params?.username);
      return usr;
    });
  return {
    props: {
      user: pickedUser || {
        userName: '', id: 0, email: '', userRole: '',
      },
    },
    revalidate: 20,
  };
};

export const getStaticPaths = async () => {
  const usernames = await createDBEndpoint(ENDPOINTS.auth.getusernames)
    .get()
    .then((res) => res.data);
  return {
    paths: usernames.map((u: string) => ({
      params: { username: u },
    })),
    fallback: false,
  };
};
