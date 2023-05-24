import { NextPage } from 'next';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { ENDPOINTS, createDBEndpoint } from '../../../api/endpoint';
import ObjectListing from '@components/organisms/ObjectListing';
import * as Styled from './styles';

const Browser: NextPage = () => {
  const [data, setData] = useState<Array<any>>([])
  const [option, setOption] = useState('')
  const [sortedData, setSortedData] = useState<Array<any>>([])

  useEffect(() => {
    let endpoint = ''
    switch (option) {
      case 'tuitions': endpoint = ENDPOINTS.tutorship.gettutorships; break;
      case 'playlists': endpoint = ENDPOINTS.library; break;
      default: endpoint = ENDPOINTS.tutorship.gettutorships; break;
    }

    createDBEndpoint(endpoint)
        .post({ pageSize: 50, pageNumber: 1 })
        .then((res) => {
          setData(res.data.tutorships);
        });
  }, [option])
  
  const handleOptionChange = (option: string) => {
    setOption(option)
  }

  const SampleData = [
    { id: 1, name: 'Product A', price: 10.99, category: 'Electronics' },
    { id: 2, name: 'Product B', price: 19.99, category: 'Clothing' },
    { id: 3, name: 'Product C', price: 7.99, category: 'Home & Kitchen' },
    { id: 4, name: 'Product D', price: 5.49, category: 'Electronics' },
    { id: 5, name: 'Product E', price: 14.99, category: 'Clothing' },
    { id: 6, name: 'Product F', price: 9.99, category: 'Home & Kitchen' },
    { id: 7, name: 'Product G', price: 8.49, category: 'Electronics' },
    { id: 8, name: 'Product H', price: 24.99, category: 'Clothing' },
    { id: 9, name: 'Product I', price: 12.99, category: 'Home & Kitchen' },
    { id: 10, name: 'Product J', price: 6.99, category: 'Electronics' }
  ];

  const handleSorying = (option: string) => {
    setData(SampleData)
    const sortedData = data.sort((a, b) => {
      if (a[option] < b[option]) {
        return -1;
      }
      if (a[option] > b[option]) {
        return 1;
      }
      return 0;
    });
    console.log(data)
    console.log(sortedData)
    setSortedData(sortedData);
  }

  return (
  <Styled.Wrapper>
    <Styled.OptionsWrapper>
      <a onClick={() => handleOptionChange('tuitions')}>Tuitions</a>
      <a onClick={() => handleOptionChange('playlists')}>Playlists</a>
      <a onClick={() => handleSorying('price')}>Name</a>
    </Styled.OptionsWrapper>

    <ObjectListing objects={sortedData} />

  </Styled.Wrapper>
);
}

export default Browser;
