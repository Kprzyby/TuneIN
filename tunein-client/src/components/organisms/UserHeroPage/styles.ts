import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
`;
export const Content = styled.div`
    display: flex;
    justify-content: flex-start;
    padding: 7rem 0 1rem 1rem;
    background-color: ${({ theme }) => theme.colors.darkMain};
    @media (min-width: 0px) {  min-width: 100%; }
    @media (min-width: 1500px) { min-width: 1500px; }
    @media (min-width: 1800px) { min-width: 1800px; }
`;
