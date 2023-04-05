import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
`;
export const Content = styled.div`
    display: flex;
    justify-content: flex-start;
    background-color: ${({ theme }) => theme.colors.darkMainD};
    color: ${({ theme }) => theme.colors.white};
    @media (min-width: 0px) {  min-width: 100%; }
    @media (min-width: 1500px) { min-width: 1500px; }
    @media (min-width: 1800px) { min-width: 1800px; }
`;
