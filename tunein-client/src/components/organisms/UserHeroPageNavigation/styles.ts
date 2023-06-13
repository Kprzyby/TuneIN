// there is no god
import { Typography } from "@components/styles/typography";
import styled from "styled-components";

import { StyledProps } from "./types";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
export const Content = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 1.5rem 3rem;
  background-color: ${({ theme }) => theme.colors.darkMainD};
  color: ${({ theme }) => theme.colors.white};
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
export const List = styled.ul`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: 5rem;
`;
export const Item = styled(Typography)<StyledProps>`
  &:hover {
    color: ${({ isHighlighted, theme }) =>
      isHighlighted || theme.colors.darkMain};
  }
  color: ${({ isHighlighted, theme }) => isHighlighted && theme.colors.white};
`;
