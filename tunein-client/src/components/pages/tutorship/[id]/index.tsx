import { GetStaticProps, NextPage } from "next";
import React from "react";
import Tutorship from "@components/organisms/Tutorship";

import { ENDPOINTS, createDBEndpoint } from "../../../../api/endpoint";

import { Props, TuitionType } from "./types";

const TuitionPage: NextPage<Props> = ({ tuition }: Props) => (
  <Tutorship {...{ tuition }} />
);

export default TuitionPage;

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const { params } = context;
  const pickedTuition: TuitionType = await createDBEndpoint(
    ENDPOINTS.tutorship.gettutorships
  )
    .post({ pageSize: 100, pageNumber: 1 })
    .then((res: any) => {
      const { tutorships } = res.data;
      const t = tutorships.find(
        (x: TuitionType) => x.id.toString() === params?.id
      );

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
    .then((res: any) => res.data.tutorships);

  return {
    paths: tutorships.map((t: TuitionType) => ({
      params: { id: t.id.toString() },
    })),
    fallback: true,
  };
};
