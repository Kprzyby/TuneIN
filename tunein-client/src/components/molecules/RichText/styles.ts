import styled from "styled-components";

export const Wrapper = styled.div`
  background: #fff;
  border: 0.2rem solid ${({ theme }) => theme.colors.darkMainD};
  font-family: "Georgia", serif;
  font-size: 1rem;
  padding: 1rem;
  max-width: 25rem;
  min-width: 20rem;
  border-radius: 0.2rem;
  .DraftEditor-root {
    border-top: 0.1rem solid ${({ theme }) => theme.colors.darkMainD};
    font-size: 1rem;
    margin-top: 0.8rem;
    min-height: 15rem;
  }
`;
