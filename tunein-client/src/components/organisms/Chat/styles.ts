import styled from 'styled-components';
import { StyledProps } from './types';

export const Wrapper = styled.div`
    width: 100%; 
    height: 100%;
    position: relative;
`;
export const LoaderWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center; 
    align-items: center;
`;
export const List = styled.ul`
    width: 100%;
    height: 100%;
    padding: 0 0.4rem 0.1rem 0.4rem;
    position: absolute;
    overflow: hidden;
    overflow-y: scroll;

    &::-webkit-scrollbar { 
        display: none;  /* Safari and Chrome */
    }
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
`;
export const Item = styled.li<StyledProps>`
    display: flex;
    flex-flow: column nowrap;
    ${({ userIsSender }) => (userIsSender
    ? 'align-items: flex-end;'
    : 'align-items: flex-start;')};
`;
export const Message = styled.div`
    width: auto;
    background-color: ${({ theme }) => theme.colors.inputHint};
    opacity: 0.5;
    border-radius: 0.2rem;
    padding: 0.3rem;
    margin-top: 0.1rem;
`;
