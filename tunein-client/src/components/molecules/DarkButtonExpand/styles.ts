import styled from "styled-components";
import {StyleProps} from "./types";

export const Wrapper = styled.div<Pick<StyleProps, 'isCollapsed'>>`
    position: relative;
    width: auto;
    ${({ isCollapsed, theme }) =>
        isCollapsed
        ? ` border-top-left-radius: 1rem;
            border-top-right-radius: 1rem;
            background-color: ${theme.colors.darkMainL};`
        : ` border-radius: 1rem;`};
`;
export const Button = styled.button`
    background-color: transparent;
    border: unset;
    padding: 0;
`;
export const ListWrapper = styled.div`
    position: absolute;
    z-index: 3;
    width: -webkit-fill-available;
    background-color: ${({ theme }) => theme.colors.darkMainL};
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
`;
export const Item = styled.button<Pick<StyleProps, 'ishighlighted'>>`
    background-color: ${({ theme }) => theme.colors.darkMainL};
    width: 100%;
    border-radius: 0.3rem;
    border: unset;
    font-size: 1rem;
    ${({ishighlighted, theme}) => 
        ishighlighted 
        ? `color: ${theme.colors.darkMainD};`
        : `color: ${theme.colors.darkMain};`};
`;
