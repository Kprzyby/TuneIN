import { Typography } from "@components/styles/typography";
import styled, { keyframes } from "styled-components";

const errorAnim = keyframes`
    0% { opacity: 1; }
    10% { opacity: 0.9; }
    20% { opacity: 0.7; }
    30% { opacity: 0.5 }
    40% { opacity: 0.4; }
    50% { opacity: 0.3; }
    60% { opacity: 0.3; }
    70% { opacity: 0.4; }
    80% { opacity: 0.5; }
    90% { opacity: 0.9; }
    100% { opacity: 1; }
`
export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5rem;
    padding: 4rem;
`;
export const Title = styled(Typography)`
    text-align: center;
`;
export const Form = styled.form`
    min-width: 30rem;
    min-height: 27rem;
    background-color: ${({ theme }) => theme.colors.darkMainD};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 2rem;
    border-radius: 0.2rem;
    box-shadow: 0.1rem 0.1rem;
`;
export const Success = styled.div`
    min-width: 30rem;
    min-height: 27rem;
    background-color: ${({ theme }) => theme.colors.darkMainD};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 0.2rem;
    box-shadow: 0.1rem 0.1rem;
`;
export const SuccesText = styled(Typography)`
    line-height: default;
`;
export const Input = styled.input`
    background-color: ${({ theme }) => theme.colors.darkMain};
    color: white;
    font-size: 2rem;
    border-radius: 0.2rem;
    box-shadow: 0.05rem 0.05rem;
    padding-left: 0.5rem;
`;
export const Error = styled.p`
    color: red;
    animation-name: ${errorAnim};
    animation-duration: 1s;
    animation-iteration-count: infinite;
`;
