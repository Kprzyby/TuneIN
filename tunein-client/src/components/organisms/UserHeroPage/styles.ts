import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
`;
export const Content = styled.div`
    display: flex;
    justify-content: flex-start;
    padding: 10rem 3rem 1rem 3rem;
    background-color: ${({ theme }) => theme.colors.darkMain};
    @media (min-width: 0px) {  min-width: 100%; }
    @media (min-width: 1500px) { min-width: 1500px; }
    @media (min-width: 1800px) { min-width: 1800px; }
`;
export const AvatarWrapper = styled.div`
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.1rem solid ${({ theme }) => theme.colors.darkMainL};
    background-color: ${({ theme }) => theme.colors.darkMainD};
`;
