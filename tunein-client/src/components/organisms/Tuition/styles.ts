import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
export const Content = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.darkMainL};
  @media (min-width: 0px) {
    max-width: 100%;
  }
  @media (min-width: 1500px) {
    max-width: 1200px;
  }
  @media (min-width: 1800px) {
    max-width: 1500px;
  }
`;
export const TopBarWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  width: 100%;
`;
export const TopBarRight = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-flow: row wrap;
`;
export const TopBarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;
