import styled from 'styled-components';

export const Wrapper = styled.div`
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.1rem solid ${({ theme }) => theme.colors.darkMainL};
    background-color: ${({ theme }) => theme.colors.darkMainD};
`;
