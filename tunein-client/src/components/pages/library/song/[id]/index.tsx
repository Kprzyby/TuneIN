import React from 'react';
import { NextPage, GetStaticProps } from 'next';
import Song from '../../../../organisms/Song';
import withAuth from '../../../../../api/pageAuth';
import { Props } from './types';
import { useRouter } from 'next/router';

// const router = useRouter();
// const id  = parseInt(router.query.id as string);

const SongPage: NextPage<Props> = ({ id }: Props) => (
  <Song id={ id }/>
);

export default SongPage;

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  
  const thisId = context.params?.id;
  return {
    props: {
      user: { id: thisId } || { id: 0 },
    }
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