import { Typography } from "@components/styles/typography";
import styled from "styled-components";
export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
`;
export const Content = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    height: 100%;
    background-color: ${({theme})=>theme.colors.darkMain};
    @media (min-width: 0px) {  min-width: 100%; }
    @media (min-width: 1500px) { min-width: 1500px; }
    @media (min-width: 1800px) { min-width: 1800px; }
    @media (min-width: 0px) { row-gap: 1rem; }
    @media (min-width: 1500px) { row-gap: 3rem; }
`;
export const Title = styled(Typography)`
    @media (min-width: 0px) { font-size: 1rem; }
    @media (min-width: 350px) { font-size: 1.7rem; }
    @media (min-width: 800px) { font-size: 2rem; }
    @media (min-width: 1150px) { font-size: 2.5rem; }
    @media (min-width: 1500px) { font-size: 4rem; }
`;
export const Desc = styled(Typography)`
    @media (min-width: 0px) { font-size: 0.7rem; }
    @media (min-width: 350px) { font-size: 1.2rem; }
    @media (min-width: 800px) { font-size: 1.5rem; }
    @media (min-width: 1150px) { font-size: 1.9rem; }
    @media (min-width: 1500px) { font-size: 2rem; }
`;
