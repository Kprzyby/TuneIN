import React, { useState } from 'react';
import * as Styled from "./styles";

const useSearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    setSearchInput(event.target.value);
  }
  return {
    searchInput,
    renderSearchBar: (
      <Styled.Wrapper>
        <Styled.Input onChange={handleChange}></Styled.Input>
        <Styled.Icon/>
      </Styled.Wrapper>
    )
  }
}

export default useSearchBar;
