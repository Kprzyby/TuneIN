import styled from 'styled-components';
import { Typography } from '@components/styles/typography';

export const Wrapper = styled.div`
    position: relative;
    display: block;
    height: 100vh;
    scroll-margin-top: 0;
`;
export const Content = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
export const Title = styled(Typography)`
    font-size: 10rem;
    color: ${({ theme }) => theme.colors.darkMain};
    @media (min-width: 0px) {
        font-size: 1rem;
    }
    @media (min-width: 200px) {
        font-size: 2rem;
    }
    @media (min-width: 400px) {
        font-size: 5rem;
    }
    @media (min-width: 1400px) {
        font-size: 7rem;
    }
    @media (min-width: 1900px) {
        font-size: 12rem;
    }
`;
export const Description = styled(Typography)`
    text-align: center;
    margin: 2rem;
    @media (min-width: 0px) {
        font-size: 0.5rem;
    }
    @media (min-width: 200px) {
        font-size: 1rem;
    }
    @media (min-width: 400px) {
        font-size: 2rem;
    }
    @media (min-width: 1400px) {
        font-size: 3.5rem;
    }
`;
