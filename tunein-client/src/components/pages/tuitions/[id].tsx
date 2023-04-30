import { GetStaticProps, NextPage } from 'next';
import React from 'react';
import { ENDPOINTS, createDBEndpoint } from '../../../api/endpoint';
import { Props, Tuition } from './types';

const TuitionPage: NextPage<Props> = ({ tuition }: Props) => (
  <div>
    {tuition?.id}
    {tuition?.title}
    {tuition?.author.username}
  </div>
);

export default TuitionPage;

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const pickedTuition: Tuition = await createDBEndpoint(ENDPOINTS.tutorship.gettutorships)
    .post({ pageSize: 100, pageNumber: 1 })
    .then((res) => {
      const { tutorships } = res.data;
      const t = tutorships.find((x: Tuition) => x.id.toString() === context.params?.id);
      return t;
    })
    .catch(() => undefined);

  if (pickedTuition === undefined) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      tuition: pickedTuition || {},
    },
    revalidate: 20,
  };
};

export const getStaticPaths = async () => {
  const tutorships = await createDBEndpoint(ENDPOINTS.tutorship.gettutorships)
    .post({ pageSize: 100, pageNumber: 1 })
    .then((res) => res.data.tutorships);
  return {
    paths: tutorships.map((t: Tuition) => ({
      params: { id: t.id.toString() },
    })),
    fallback: true,
  };
};
