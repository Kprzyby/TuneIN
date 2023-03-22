import { Typography } from "@components/styles/typography";
import styled, { keyframes } from "styled-components";
import { StyledProps } from "./types";

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
export const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
`;
export const Title = styled(Typography)`
    text-align: center;
    font-weight: 700;
    padding: 3rem;
    @media (min-width: 0px) { font-size: 1.6rem; }
    @media (min-width: 400px) { font-size: 2rem; }
    @media (min-width: 600px) { font-size: 2.5rem; }
    @media (min-width: 800px) { font-size: 4rem; }
    @media (min-width: 1200px) { font-size: 6rem; }
    @media (min-width: 1500px) { font-size: 7rem; }
`;
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
export const Success = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
`;
export const SuccesText = styled(Typography)`
    @media (min-width: 0px) { font-size: 1.6rem; }
    @media (min-width: 400px) { font-size: 2rem; }
    @media (min-width: 600px) { font-size: 2.5rem; }
    @media (min-width: 800px) { font-size: 4rem; }
    @media (min-width: 1200px) { font-size: 6rem; }
    @media (min-width: 1500px) { font-size: 7rem; }
`;
export const Input = styled.input<StyledProps>`
    box-shadow: inset 0 0 1rem rgb(0 0 0 / 30%);
    background-color: ${({ theme }) => theme.colors.darkMain};
    color: ${({theme}) => theme.colors.white};
    font-family: ${({theme}) => theme.fonts.body};
    border: unset;
    border-radius: 0.2rem;
    padding: 0.3rem;
    /* Input security */
    ${({isSecure}) => isSecure ? `-webkit-text-security: disc;` : `` }
    /* Fix for background color change */
    &:-internal-autofill-selected,
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active{
        transition: background-color 600000s 0s, color 600000s 0s;
    }
    @media (min-width: 0px) { font-size: 0.7rem; }
    @media (min-width: 400px) { font-size: 1rem; }
    @media (min-width: 600px) { font-size: 1.3rem; }
    @media (min-width: 800px) { font-size: 2rem; }
    @media (min-width: 1200px) { font-size: 2.6rem; }
    @media (min-width: 1500px) { font-size: 3rem; }
`;
export const Error = styled.p`
  /* Animation */
  animation-name: ${errorAnim};
  animation-duration: 1s;
  animation-iteration-count: infinite;
  /* Color */
  background-image: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
  background-size: 100%;
  background-repeat: repeat;
  background-clip: initial;/*idk, error doesn't show up this way*/
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; 
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
  text-shadow: rgba(151, 65, 252, 0.2) 0.063rem 0.063rem 0.063rem;
  padding-bottom: 0.5rem;
  @media (min-width: 0px) { font-size: 0.8rem; }
  @media (min-width: 800px) { font-size: 1.2rem; }
  @media (min-width: 1200px) { font-size: 1.6rem; }
  @media (min-width: 1500px) { font-size: 2rem; }
`;
export const InputTitle = styled(Typography)`
    width: 100%;
    color: ${({ theme }) => theme.colors.darkMainD};
    font-weight: 700;
    @media (min-width: 0px) { font-size: 0.6rem; }
    @media (min-width: 400px) { font-size: 0.8rem; }
    @media (min-width: 800px) { font-size: 1.2rem; }
    @media (min-width: 1200px) { font-size: 1.6rem; }
    @media (min-width: 1500px) { font-size: 2rem; }
`;
export const Button = styled.button`
    background-color: transparent;
    border: unset;
    padding: 0.5rem 2rem;
`;
export const ConfirmWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
`;
export const ConfirmContent = styled.div`
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
export const ConfirmTitle = styled(Typography)`
    @media (min-width: 0px) { font-size: 1rem; }
    @media (min-width: 350px) { font-size: 1.7rem; }
    @media (min-width: 800px) { font-size: 2rem; }
    @media (min-width: 1150px) { font-size: 2.5rem; }
    @media (min-width: 1500px) { font-size: 4rem; }
`;
export const ConfirmDesc = styled(Typography)`
    @media (min-width: 0px) { font-size: 0.7rem; }
    @media (min-width: 350px) { font-size: 1.2rem; }
    @media (min-width: 800px) { font-size: 1.5rem; }
    @media (min-width: 1150px) { font-size: 1.9rem; }
    @media (min-width: 1500px) { font-size: 2rem; }
`;
