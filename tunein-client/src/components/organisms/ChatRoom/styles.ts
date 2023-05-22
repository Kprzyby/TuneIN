import DarkButton from '@components/molecules/DarkButton';
import styled from 'styled-components';
import { StyledProps } from './types';

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`;
export const Content = styled.div`
    display: flex;
    justify-content: flex-start;
    background-color: ${({ theme }) => theme.colors.darkMainL};
    opacity: 0.97;
    @media (min-width: 0px) {  min-width: 100%; }
    @media (min-width: 1500px) { min-width: 1500px; }
    @media (min-width: 1800px) { min-width: 1800px; }
`;
export const UsersList = styled.ul`
    padding: 0.3rem 0.1rem;
    border-right: 0.2rem solid ${({ theme }) => theme.colors.white};
`;
export const UserItemWrapper = styled(DarkButton)`
    width: 100%;
    display: flex;
    padding: 0rem 2rem;
`;
export const UserItemButton = styled.button<StyledProps>`
    width: 100%;
    background: transparent;
    cursor: pointer;
    display: flex;
    border: unset;
    ${({ isHighlighted }) => (isHighlighted
    ? 'opacity: 1;'
    : 'opacity: 0.5;')};
`;
export const UserItemRight = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
`;
