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
export const Input = styled.input<StyledProps>`
    box-shadow: inset 0 0 1rem rgb(0 0 0 / 30%);
    background-color: ${({ theme }) => theme.colors.darkMain};
    color: white;
    font-size: 2rem;
    font-family: ${({theme}) => theme.fonts.body};
    border: none;
    border-radius: 0.2rem;
    padding-left: 0.5rem;
    /* Input security */
    ${({isSecure}) => 
        isSecure
        ? `-webkit-text-security: disc;`
        : ``
    }
    /* Fix for background color change */
    &:-internal-autofill-selected,
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active{
        transition: background-color 600000s 0s, color 600000s 0s;
    }
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
`;
export const TileTitle = styled(Typography)`
    width: 100%;
    margin-left: 3rem;
`;
