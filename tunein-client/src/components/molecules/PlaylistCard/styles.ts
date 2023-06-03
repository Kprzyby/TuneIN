import { Typography } from "@components/styles/typography";
import styled from "styled-components";

import { StyledProps } from "./types";

export const Wrapper = styled.div<StyledProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 0.2rem;
  border-bottom: ${({ theme }) => theme.colors.darkMain} 0.1rem;
  border-bottom-style: ${({ isLast }) => (isLast ? "unset" : "solid")};
`;
export const ImgWrap = styled.div`
  position: relative;
  @media (min-width: 0px) {
    width: 2.2rem;
    height: 2.2rem;
  }
  @media (min-width: 360px) {
    width: 3rem;
    height: 3rem;
  }
  @media (min-width: 550px) {
    width: 3.5rem;
    height: 3.5rem;
  }
  @media (min-width: 750px) {
    width: 4rem;
    height: 4rem;
  }
`;
export const Name = styled(Typography)`
  height: 100%;
  padding: 0.5rem 0 0 0.4rem;
  @media (min-width: 0px) {
    font-size: 1rem;
  }
  @media (min-width: 360px) {
    font-size: 1.2rem;
  }
  @media (min-width: 550px) {
    font-size: 1.5rem;
  }
  @media (min-width: 650px) {
    font-size: 2rem;
  }
`;
export const Count = styled(Typography)`
  margin-left: auto;
  margin-right: 1rem;
  @media (min-width: 0px) {
    font-size: 0.4rem;
  }
  @media (min-width: 360px) {
    font-size: 0.6rem;
  }
  @media (min-width: 550px) {
    font-size: 1rem;
  }
  @media (min-width: 650px) {
    font-size: 1.4rem;
  }
`;
