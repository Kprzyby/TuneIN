// @ts-nocheck
import styled from 'styled-components';
import { Typography } from '@components/styles/typography';
import { StyledProps } from './types';

export const LWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
`;
export const LContent = styled.div`
    display: flex;
    justify-content: flex-start;
    background-color: ${({ theme }) => theme.colors.darkMainL};
    opacity: 0.95;
    @media (min-width: 0px) {  min-width: 100%; }
    @media (min-width: 1500px) { min-width: 1500px; }
    @media (min-width: 1800px) { min-width: 1800px; }
`;
export const Wrapper = styled.div`
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
`;
export const NList = styled.ul`
    width: auto;
    padding: 0.5rem;
    border-right: 0.2rem solid ${({ theme }) => theme.colors.white};
`;
export const NItem = styled(Typography)<StyledProps>`
    &:hover {
        color: ${({ isHighlighted, theme }) => isHighlighted || theme.colors.darkMainD};
    }
    color: ${({ isHighlighted, theme }) => (isHighlighted ? theme.colors.white : theme.colors.darkMain)};
`;
export const CWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    padding: 0.5rem;
`;
