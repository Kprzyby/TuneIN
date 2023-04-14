import React, { useEffect, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import Profile from '@components/organisms/Profile';
import UserHeroPage from '@components/organisms/UserHeroPage';
import useNavigation from '@components/organisms/UserHeroPageNavigation';
import Announcements from '@components/organisms/Announcements';
import { Props } from './types';
import { ENDPOINTS, createDBEndpoint } from '../../../../api/endpoint';

const ProfilePage: NextPage<Props> = ({ user }: Props) => {
  const nitems = [
    { label: 'Home' },
    { label: 'Playlists' },
    { label: 'Tuitions' },
  ];
  const { pickedNavigation, renderNavigation } = useNavigation({ items: nitems });
  const getComponent = () => {
    let component;
    switch (pickedNavigation) {
      case 'Home':
        component = <Profile {...user} />;
        break;
      case 'Playlists':
        component = <Announcements />;
        break;
      case 'Tuitions':
        component = <Announcements />;
        break;
      default:
        component = <Profile {...user} />;
        break;
    }
    return component;
  };
  const [profComponent, setProfComponent] = useState(getComponent());
  useEffect(() => {
    setProfComponent(getComponent());
  }, [pickedNavigation]);
  return (
    <>
      <UserHeroPage {...user} />
      {renderNavigation}
      {profComponent}
    </>
  );
};

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
