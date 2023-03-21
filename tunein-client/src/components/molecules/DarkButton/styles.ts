import { Typography } from '@components/styles/typography';
import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const Box = styled.div`
    width: auto;
    background-color: ${({ theme }) => theme.colors.darkMainL};
    opacity: 0.8;
    border: unset;
    border-radius: 1rem;
    &:hover {
        background-color: ${({ theme }) => theme.colors.darkMain};
    }
    &:active {
        background-color: ${({ theme }) => theme.colors.darkMainD};
    }
    @media (min-width: 0px) { padding: 0.25rem 0.7rem; }
`;
export const Text = styled(Typography)`
    @media (min-width: 0px) { font-size: 1rem; };
    @media (min-width: 460px) { font-size: 1.3rem; };
    @media (min-width: 800px) { font-size: 1.4rem; };
    @media (min-width: 1000px) { font-size: 1.6rem; };
    @media (min-width: 1150px) { font-size: 1.8rem; };
    @media (min-width: 1300px) { font-size: 2.5rem; };
`;
