import styled from "styled-components";

export const InnerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
export const Inner = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.darkMainL};
  opacity: 0.97;
  max-height: 1100px;
  @media (min-width: 0px) {
    min-width: 100%;
  }
  @media (min-width: 1500px) {
    min-width: 1500px;
  }
  @media (min-width: 1800px) {
    min-width: 1800px;
  }
`;
export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;
export const TopPanelWrapper = styled.div`
  min-height: 30rem;
  width: 100%;
  position: relative;
`;
export const TopPanelBG = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: black;
  opacity: 70%;
`;
export const TopPanel = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;
export const WaitingScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
  gap: 1rem;
`;
