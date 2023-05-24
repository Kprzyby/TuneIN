import { Typography } from '@components/styles/typography';
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
export const PlaylistList = styled.ul`
    padding: 0.3rem 0.1rem;
    min-width: 10rem;
    border-right: 0.2rem solid ${({ theme }) => theme.colors.white};
    display: flex;
    flex-flow: column nowrap;
`;
export const NavigationItem = styled(Typography)<StyledProps>`
    &:hover {
        color: ${({ theme, isHighlighted }) => !isHighlighted && theme.colors.darkMainD};
    }
    color: ${({ isHighlighted, theme }) => (isHighlighted ? theme.colors.white : theme.colors.darkMain)};
`;
