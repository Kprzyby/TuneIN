import React from 'react';
import { NextPage } from 'next';
import Library from '../../organisms/Library';
import withAuth from '../../../api/pageAuth';

const Homepage: NextPage = () => (
  <Library />
);

export default withAuth(Homepage, true);
