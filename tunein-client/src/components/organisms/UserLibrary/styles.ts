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
  background: ${({ theme }) => `${theme.colors.darkMainL}f3`};
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
export const PlaylistList = styled.ul`
  padding: 0.3rem 0.1rem 0.3rem 0.6rem;
  min-width: 10rem;
  border-right: 0.2rem solid ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: start;
  flex-flow: column nowrap;
  gap: 0.5rem;
`;
export const NavigationItem = styled(Typography)<StyledProps>`
  &:hover {
    color: ${({ theme, isHighlighted }) =>
      !isHighlighted && theme.colors.darkMainD};
  }
  color: ${({ isHighlighted, theme }) =>
    isHighlighted ? theme.colors.white : theme.colors.darkMain};
`;
export const PlaylistWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => `${theme.colors.darkMain}ae`};
`;
