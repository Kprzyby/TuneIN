import styled from "styled-components";
import { Typography } from "@components/styles/typography";
import { Musician3 } from "../../../../public/assets/svg";
export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
    @media (min-width: 0) { height: 5rem; }
    @media (min-width: 220px) { height: 6rem; }
    @media (min-width: 290px) { height: 7rem; }
    @media (min-width: 360px) { height: 8rem; }
    @media (min-width: 440px) { height: 9.5rem; }
    @media (min-width: 520px) { height: 12rem; }
    @media (min-width: 600px) { height: 15rem; }
    @media (min-width: 700px) { height: 18rem; }
    @media (min-width: 800px) { height: 20rem; }
    @media (min-width: 900px) { height: 22rem; }
    @media (min-width: 1100px) { height: 29rem; }
`;
export const Content = styled.div`
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
    align-items: stretch;
    background-color: ${({theme})=>theme.colors.darkMain};
    @media (min-width: 0px) {  min-width: 100%; }
    @media (min-width: 1300px) { min-width: 1300px; }
`;
export const RightSide = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;
export const Text = styled(Typography)`
    color: ${({theme})=> theme.colors.darkMainL};
    text-align: center;
    @media (min-width: 0) { 
        font-size: 0.6rem;
        max-width: 6rem;
    }
    @media (min-width: 220px) {
        font-size: 0.7rem;
        max-width: 7rem;
    }
    @media (min-width: 290px) { 
        font-size: 0.8rem; 
        max-width: 8rem;
    }
    @media (min-width: 360px) { 
        font-size: 1rem; 
        max-width: 9rem;
    }
    @media (min-width: 450px) { 
        font-size: 1.1rem;
        max-width: 12rem;
    }
    @media (min-width: 520px) { 
        font-size: 1.3rem;
        max-width: 13rem;
    }
    @media (min-width: 600px) { 
        font-size: 1.7rem;
        max-width: 16rem; 
    }
    @media (min-width: 900px) { 
        font-size: 2.5rem;
        max-width: 25rem;
    }
    @media (min-width: 1100px) { 
        font-size: 3rem;
        max-width: 30rem;
    }
`;
export const Icon = styled(Musician3)`
    min-height: 100%;
    @media (min-width: 0px) { 
        max-width: 2rem; 
    }
    @media (min-width: 220px) {
        max-width: 2.5rem;
    }
    @media (min-width: 290px) {
        max-width: 3rem;
    }
    @media (min-width: 360px) {
        max-width: 3.5rem;
    }
    @media (min-width: 450px) {
        max-width: 4rem;
    }
    @media (min-width: 520px) {
        max-width: 5rem;
    }
    @media (min-width: 600px) {
        max-width: 6rem;
    }
    @media (min-width: 720px) {
        max-width: 8rem;
    }
    @media (min-width: 1100px) {
        max-width: 13.5rem;
    }
`;
