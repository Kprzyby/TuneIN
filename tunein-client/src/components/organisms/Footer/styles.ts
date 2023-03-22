import { Inner } from '@components/styles/inners';
import { Typography } from '@components/styles/typography';
import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.darkMainL};
    padding: 1rem;
    height: auto;
`;
export const Center = styled(Inner)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
export const CopyRight = styled(Typography)`
    padding-top: 1rem;
    @media (min-width: 0px) { font-size: 1rem; }
    @media (min-width: 600px) { font-size: 1.3rem; }
    @media (min-width: 1100px) { font-size: 1.6rem; }
`;
export const Icons = styled.div`
    display: flex;
    gap: 0.7rem;
    @media (min-width: 0px) { font-size: 1.2rem; }
    @media (min-width: 600px) { font-size: 1.5rem; gap: 2rem;}
    @media (min-width: 800px) { font-size: 1.7rem; gap: 3rem;}
    @media (min-width: 1100px) { font-size: 2rem; gap: 4rem;}
`;
