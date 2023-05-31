import { NextPage } from 'next';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { ENDPOINTS, createDBEndpoint } from '../../../api/endpoint';
import ObjectListing from '@components/organisms/ObjectListing';
import * as Styled from './styles';

const Browser: NextPage = () => {
  const [data, setData] = useState<Array<any>>([])
  const [sortedData, setSortedData] = useState<Array<any>>([])
  const [finalData, setFinalData] = useState<Array<any>>([])
  const [option, setOption] = useState('')
  const [sortedBy, setSortedBy] = useState({ text: '', order: false })

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

  useEffect(() => {
    setSortedData(data)
    setFinalData(data)
  }, [data])
  
  const handleOptionChange = (option: string) => {
    setOption(option)
    const nameSearchInput = document.getElementById('nameSearch') as HTMLInputElement
    nameSearchInput.value = ''
    setData(SampleData) // ! To be removed
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

  const handleSorting = (option: string) => {
    var order = sortedBy.order
    if (sortedBy.text === option) {
      order = !order
    }
    setSortedBy({ text: option, order: order })

    const sortedData = data.sort((a, b) => {
      if (a[option] < b[option]) {
        return -1;
      }
      if (a[option] > b[option]) {
        return 1;
      }
      return 0;
    });
    if (order) {
      sortedData.reverse()
    }
    setSortedData(sortedData);
  }

  const handleClick = (text: string) => {
    handleSorting(text)
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFinalData(sortedData.filter((item) => item.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
  <Styled.Wrapper>
    <Styled.OptionsWrapper>
      <a onClick={() => handleOptionChange('tuitions')}>Tuitions</a>
      <a onClick={() => handleOptionChange('playlists')}>Playlists</a>
    </Styled.OptionsWrapper>

    <input id="nameSearch" onChange={handleChange} />

    <ObjectListing objects={finalData} handleTextClick={handleClick}/>

  </Styled.Wrapper>
);
}

export default Browser;
