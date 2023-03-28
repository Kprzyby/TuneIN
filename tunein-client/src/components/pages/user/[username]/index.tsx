import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import Profile from '@components/organisms/Profile';
import { UserType, Props } from './types';

const ProfilePage: NextPage<Props> = ({ user }: Props) => (
  <Profile {...user} />
);

export default ProfilePage;

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  // TODO: get all users from the db
  const users: UserType[] = [
    { username: 'milos', id: 7 },
    { username: 'accuse', id: 6 },
    { username: 'string', id: 5 },
    { username: 'string', id: 3 },
    { username: 'string', id: 1 }];
  const thisuser = users.find((x) => x.username === context.params?.username);
  return {
    props: {
      user: thisuser || { username: '', id: 0 },
    },
    revalidate: 20,
  };
};

export const getStaticPaths = async () => {
  // TODO: unique usernames, get all usernames form db
  const users = [
    { username: 'milos' },
    { username: 'accuse' },
    { username: 'string' },
    { username: 'string' },
    { username: 'string' }];
  return {
    paths: users.map((u) => ({
      params: { username: u.username },
    })),
    fallback: false,
  };
};
