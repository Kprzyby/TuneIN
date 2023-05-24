import styled from 'styled-components';
import { StyledProps } from './types';

export const Wrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    height: 100%;
`;
export const ToolBox = styled.div`
    @media (min-width: 0px) { padding-top: 0.1rem; }
    @media (min-width: 600px) { padding-top: 0.5rem; }
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;
export const UpRow = styled.div` flex: 1; `;
export const DownRow = styled.div`
    flex: 1;
    display: flex;
    flex-flow: row wrap;
`;
export const DownRowSide = styled.div`
    flex: 1;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    font-size: 0.7rem;
`;
export const List = styled.div`
    padding: 1rem;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
`;
export const ItemWrapper = styled.div<StyledProps>`
    border-bottom: ${({ theme }) => theme.colors.darkMainL} 0.1rem;
    border-bottom-style: ${({ isLast }) => (isLast ? 'unset' : 'solid')};
    cursor: pointer;
`;
