import React, { useEffect, useRef, useState } from 'react';
import * as Styled from './styles';
import { Props } from './types';
import { BarTypes } from './consts';

const useInputBar = ({ type } :Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [barInput, setBarInput] = useState('');
  const [enterEvent, setEnterEvent] = useState(false);
  const [reset, setReset] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBarInput(event.target.value);
  };
  const handleKey = (event: any) => {
    if (event.key === 'Enter' && !enterEvent) {
      setEnterEvent(true);
    }
  };
  useEffect(() => {
    if (reset === true) {
      setReset(false);
      setEnterEvent(false);
      setBarInput('');
      if (inputRef.current === null) return;
      inputRef.current.value = '';
    }
  }, [reset]);
  return {
    barInput,
    enterEvent,
    setReset,
    renderInputBar: (
      <Styled.Wrapper>
        <Styled.Input
          onChange={handleChange}
          onKeyUp={(event) => handleKey(event)}
          ref={inputRef}
        />
        {type === BarTypes[0] && <Styled.Icon />}
      </Styled.Wrapper>
    ),
  };
};

export default useInputBar;
