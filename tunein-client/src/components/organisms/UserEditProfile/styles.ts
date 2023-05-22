import { Typography } from '@components/styles/typography';
import styled from 'styled-components';
import { StyledProps } from './types';

export const Wrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
`;

export const Title = styled(Typography)`
    display: flex;
    justify-content: center;
    border-bottom: solid ${({ theme }) => theme.colors.white} 0.05rem;
    margin-bottom: 1rem;
`;

export const PPButton = styled.button<StyledProps>`
    border: unset;
    border-bottom: ${({ isCurr, theme }) => (isCurr && `solid ${theme.colors.white} 0.1rem`)};
    border: ${({ isLast, theme }) => (isLast && `solid ${theme.colors.white} 0.1rem`)};
    border-radius: 0.3rem;
    background-color: transparent;
    cursor: pointer;
`;

export const PPList = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-flow: row wrap;
`;

export const FormWrapper = styled.div`
    display: flex; 
    justify-content: center; 
    flex-flow: column wrap;
    align-content: center;
`;

export const ButtonWrapper = styled.div`
    width: 100%; 
    display: flex; 
    justify-content: center;
`;

export const ClearBtn = styled.button`
    width: max-content;
    border: unset; 
    cursor: pointer; 
    background: transparent;
`;
