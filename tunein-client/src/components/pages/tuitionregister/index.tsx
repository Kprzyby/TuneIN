import TuitionForm from '@components/organisms/TuitionForm';
import { type NextPage } from 'next';
import React from 'react';
import { Typography } from '@components/styles/typography';
import styled from 'styled-components';
import withAuth from '../../../api/pageAuth';

const Title = styled(Typography)`
    text-align: center;
    font-weight: 700;
    padding: 3rem;
    @media (min-width: 0px) { font-size: 1.6rem; }
    @media (min-width: 400px) { font-size: 2rem; }
    @media (min-width: 600px) { font-size: 2.5rem; }
    @media (min-width: 800px) { font-size: 4rem; }
    @media (min-width: 1200px) { font-size: 6rem; }
    @media (min-width: 1500px) { font-size: 7rem; }
`;

const TuitionRegisterPage: NextPage = () => (
  <div>
    <Title variant="RegisterTitile">Create Tuition</Title>
    <TuitionForm />
  </div>
);

export default withAuth(TuitionRegisterPage, true);
