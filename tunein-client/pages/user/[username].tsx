import React from 'react';
import { GetServerSideProps } from 'next';

const index: React.FC<{username: string}> = ({username}) => {
  return (
    <div>{username}</div>
  )
}
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const username = await params?.username;
  return {
    props: { username }
  }
}

export default index;
