import styled from 'styled-components';

export const Wrapper = styled.div`
    width: fit-content;
    height: fit-content;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${({ theme }) => theme.colors.darkMainL};
    background-color: ${({ theme }) => theme.colors.darkMainD};
`;
