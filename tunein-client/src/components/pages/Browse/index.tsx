import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

const Browser: NextPage = () => (
  <div style={{
    width: '100%', display: 'flex', justifyContent: 'center', gap: '5rem', fontSize: '3rem',
  }}
  >
    <Link href="browse/tuitions">Tuitions</Link>
    <Link href="browse/playlists">Playlists</Link>
  </div>
);

export default Browser;
