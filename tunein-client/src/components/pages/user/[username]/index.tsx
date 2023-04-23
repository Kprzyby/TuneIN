import React, { useEffect, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import UserHeroPage from '@components/organisms/UserHeroPage';
import useNavigation from '@components/organisms/UserHeroPageNavigation';
import Announcements from '@components/organisms/Announcements';
import { Props } from './types';
import { ENDPOINTS, createDBEndpoint } from '../../../../api/endpoint';

const ProfilePage: NextPage<Props> = ({ user }: Props) => {
  const nitems = [{ label: 'Home' }, { label: 'Playlists' }, { label: 'Tuitions' }];
  const { pickedNavigation, renderNavigation } = useNavigation({ items: nitems });
  const getComponent = () => {
    let component;
    switch (pickedNavigation) {
      case 'Home':
        component = '';
        break;
      case 'Playlists':
        component = '';
        break;
      case 'Tuitions':
        component = <Announcements id={user.id} />;
        break;
      default:
        component = '';
        break;
    }
    return component;
  };
  const [profComponent, setProfComponent] = useState(getComponent());
  useEffect(() => {
    setProfComponent(getComponent());
  }, [pickedNavigation]);
  return (
    <div>
      <UserHeroPage {...user} />
      {renderNavigation}
      {profComponent}
    </div>
  );
};

export default ProfilePage;

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const pickedUser = await createDBEndpoint(ENDPOINTS.user.getusers)
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
        userName: '', id: 0, email: '', userRole: '', avatarId: 0,
      },
    },
    revalidate: 20,
  };
};

export const getStaticPaths = async () => {
  const usernames = await createDBEndpoint(ENDPOINTS.user.getusernames)
    .get()
    .then((res) => res.data);
  return {
    paths: usernames.map((u: string) => ({
      params: { username: u },
    })),
    fallback: false,
  };
};
