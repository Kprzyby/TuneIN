import styled from "styled-components";
import { StyledHeaderProps } from "./types";

export const Wrapper = styled.div<StyledHeaderProps>`
    ${({ isLight, theme }) =>
        isLight
        ? ` position: fixed;
            color: ${theme.colors.darkMainD};
            background-color: transparent;`
        : ` position: sticky;
            color: ${theme.colors.darkMainL};
            background-color: ${theme.colors.darkMain};`
    };
    top: 0;
    height: auto;
    width: 100%;
    display: flex;
    align-items: center;
    z-index: 2;
    padding-top: 1rem;
    padding-bottom: 0.5rem;
`; 
export const ItemsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const ListItem = styled.li`
    display: table;
    float: left;
    padding: 0 0.6rem;
`;
