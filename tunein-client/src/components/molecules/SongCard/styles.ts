import { Typography } from '@components/styles/typography';
import styled from 'styled-components';
import { MusicNote } from '../../../../public/assets/svg';

export const Wrapper = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
`;
export const DefaultImg = styled(MusicNote)`
    fill: ${({ theme }) => theme.colors.darkMainL};
    width: 100%;
    height: 100%;
`;
export const ImgWrap = styled.div`
    position: relative;
    @media (min-width: 0px) { width: 2.2rem; height: 2.2rem; }
    @media (min-width: 360px) { width: 3rem; height: 3rem; }
    @media (min-width: 550px) { width: 3.5rem; height: 3.5rem; }
    @media (min-width: 750px) { width: 4rem; height: 4rem; }
`;
export const TitleWrap = styled.div`
    display: flex;
    flex-flow: column nowrap;
    @media (min-width: 0px) { padding-left: 0.5rem; }
`;
export const Name = styled(Typography)`
    color: white;
    @media (min-width: 0px) { font-size: 0.7rem; }
    @media (min-width: 360px) { font-size: 0.9rem; }
    @media (min-width: 550px) { font-size: 1.1rem; }
    @media (min-width: 650px) { font-size: 1.4rem; }
`;
export const Band = styled(Typography)`
    padding-left: 0.3rem;
    color: ${({ theme }) => theme.colors.darkMainL};
    @media (min-width: 0px) { font-size: 0.5rem; }
    @media (min-width: 360px) { font-size: 0.6rem; }
    @media (min-width: 550px) { font-size: 0.8rem; }
    @media (min-width: 650px) { font-size: 1.0rem; }
`;
export const Genre = styled(Typography)`
    display: block;
    margin-left: auto;
    margin-right: 1rem;
    color: ${({ theme }) => theme.colors.darkMainL};
    @media (min-width: 0px) { font-size: 0.4rem; }
    @media (min-width: 360px) { font-size: 0.6rem; }
    @media (min-width: 650px) { font-size: 0.9rem; }
`;
