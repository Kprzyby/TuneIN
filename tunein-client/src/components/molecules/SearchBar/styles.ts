import styled from "styled-components";
import { MagnifyingGlass } from "../../../../public/assets/svg";

export const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;
export const Input = styled.input`
    border-radius: 1rem;
    margin-right: 1rem;
    padding: 0 0.6rem;
    border: unset;
    @media (min-width: 0px) { max-width: 4rem; }
    @media (min-width: 220px) { max-width: 8rem; }
    @media (min-width: 350px) {
        max-width: 10rem;
        font-size: 1.4rem;
    }
    @media (min-width: 460px) {
        max-width: 12rem;
        font-size: 1.5rem;
    }
    @media (min-width: 600px) {
        max-width: 14rem;
        font-size: 1.7rem;
    }
    @media (min-width: 800px) {
        max-width: 16rem;
        font-size: 1.7rem;
    }
    @media (min-width: 950px) {
        max-width: 18rem;
        font-size: 1.7rem;
    }
    @media (min-width: 1100px) {
        max-width: 22rem;
        font-size: 1.7rem;
    }
`;
export const Icon = styled(MagnifyingGlass)`
    @media (min-width: 0px) { max-width: 1.4rem; }
    @media (min-width: 220px) { max-width: 1.8rem; }
    @media (min-width: 350px) {  max-width: 2rem; }
    @media (min-width: 460px) { max-width: 2.4rem; }
    @media (min-width: 900px) { max-width: 3rem; }
`;
