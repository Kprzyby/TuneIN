import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`;
export const Content = styled.div`
    display: flex;
    justify-content: center;
    padding: 2rem;
    background-color: ${({ theme }) => theme.colors.darkMain};
    color: ${({ theme }) => theme.colors.white};
    @media (min-width: 0px) {  min-width: 100%; }
    @media (min-width: 1500px) { min-width: 1500px; }
    @media (min-width: 1800px) { min-width: 1800px; }
    `;
export const List = styled.li`
    width: 100%;
    display: flex;
    gap: 1rem;
    align-content: space-between;
    justify-content: center;
    flex-flow: row wrap;
`;
