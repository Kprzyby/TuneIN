import { Typography } from '@components/styles/typography';
import styled from 'styled-components';
import { StyledHeaderProps } from './types';

export const Wrapper = styled.div<StyledHeaderProps>`
    ${({ isLight, theme }) => (isLight
    ? ` position: sticky;
            color: ${theme.colors.darkMainD};
            background-color: transparent;`
    : ` position: sticky;
            color: ${theme.colors.darkMainL};
            background-color: ${theme.colors.darkMain};`)
};
    top: 0;
    height: auto;
    width: 100%;
    display: flex;
    align-items: center;
    z-index: 2;
    padding-top: 1rem;
    padding-bottom: 0.5rem;
    transition: all 0.15s linear;
`;
export const ItemsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const ListItem = styled.li`
    display: table;
    float: right;
    @media (min-width: 0) {
        font-size: 0.3rem;
        padding: 0 0.1rem;
    }
    @media (min-width: 260px) {
        font-size: 0.6rem;
        padding: 0 0.3rem;
    }
    @media (min-width: 800px) {
        font-size: 1rem;
    }
    @media (min-width: 1800px) {
        font-size: 1.5rem;
    }
`;
export const Logo = styled(Typography)`
    @media (min-width: 0) {
        font-size: 0.8rem;
    }
    @media (min-width: 260px) {
        font-size: 2rem;
    }
    @media (min-width: 800px) {
        font-size: 3rem;
    }
    @media (min-width: 1800px) {
        font-size: 4rem;
    }
`;
