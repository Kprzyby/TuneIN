import styled from "styled-components";
import { Typography } from "@components/styles/typography";
import CountUp from "react-countup";
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
    align-items: center;
    background-color: ${({theme})=>theme.colors.darkMain};
    @media (min-width: 0px) {  min-width: 100%; }
    @media (min-width: 1300px) { min-width: 1300px; }
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
export const CounterWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    color: white;
    @media (min-width: 0px) { grid-gap: 0.2rem; }
    @media (min-width: 230px) { grid-gap: 0.25rem; }
    @media (min-width: 530px) { grid-gap: 0.7rem; }
    @media (min-width: 650px) { grid-gap: 2rem; }
    @media (min-width: 1000px) { grid-gap: 3rem; }
`;
export const CounterItem = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;
export const CounterNumber = styled.span`
    @media (min-width: 0px) { font-size: 0.6rem; }
    @media (min-width: 230px) { font-size: 0.85rem; }
    @media (min-width: 300px) { font-size: 1rem; }
    @media (min-width: 360px) { font-size: 1.5rem; }
    @media (min-width: 600px) { font-size: 2rem; }
    @media (min-width: 750px) { font-size: 3rem; }
    @media (min-width: 1100px) { font-size: 4rem; }
`;
export const CounterLabel = styled(Typography)`
    text-align: center;
    @media (min-width: 0px) { font-size: 0.22rem; }
    @media (min-width: 230px) { font-size: 0.3rem; }
    @media (min-width: 300px) { font-size: 0.4rem; }
    @media (min-width: 360px) { font-size: 0.5rem; }
    @media (min-width: 600px) { font-size: 0.7rem; }
    @media (min-width: 750px) { font-size: 1rem; }
    @media (min-width: 1100px) { font-size: 1.4rem; }
`;
