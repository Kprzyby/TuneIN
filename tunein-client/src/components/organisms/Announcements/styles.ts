import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`;
export const Content = styled.div`
    display: flex;
    justify-content: flex-start;
    padding: 1.5rem 3rem;
    background-color: ${({ theme }) => theme.colors.darkMain};
    color: ${({ theme }) => theme.colors.white};
    @media (min-width: 0px) {  min-width: 100%; }
    @media (min-width: 1500px) { min-width: 1500px; }
    @media (min-width: 1800px) { min-width: 1800px; }

    padding: 2rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: space-between;
    gap: 1rem;
`;
