import { Typography } from '@components/styles/typography';
import styled from 'styled-components';
import { StyledProps } from './types';

export const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
`;
export const Header = styled.div`
    border-bottom: solid 0.1rem ${({ theme }) => theme.colors.white};
    display: flex;
    padding: 0.3rem 0;
`;
export const List = styled.ul`
    width: 100%;
`;
export const IBtn = styled.button`
    width: 100%;
    border: unset;
    background-color: transparent;
    cursor: pointer;
    display: flex;
`;
export const Item = styled(Typography)<StyledProps>`
    display: flex;
    flex: ${({ flexPart }) => flexPart};
`;
