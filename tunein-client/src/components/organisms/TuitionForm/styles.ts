import { Typography } from '@components/styles/typography';
import Select from 'react-select';
import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const InputTitle = styled(Typography)`
    margin-top: 1rem;
    width: 100%;
    color: ${({ theme }) => theme.colors.darkMainD};
    font-weight: 700;
    @media (min-width: 0px) { font-size: 0.6rem; }
    @media (min-width: 400px) { font-size: 0.8rem; }
    @media (min-width: 800px) { font-size: 1.2rem; }
    @media (min-width: 1200px) { font-size: 1.6rem; }
    @media (min-width: 1500px) { font-size: 2rem; }
`;

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
`;
export const Error = styled(Typography)`
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

export const Input = styled.input`
    box-shadow: inset 0 0 1rem rgb(0 0 0 / 30%);
    background-color: ${({ theme }) => theme.colors.darkMain};
    color: white;
    font-size: 2rem;
    font-family: ${({ theme }) => theme.fonts.body};
    border: unset;
    border-radius: 0.2rem;
    padding-left: 0.5rem;
    resize: none;
    box-sizing: border-box;
    display: flex;
    overflow: hidden;
    min-height: 100%;
    width: 100%;
    padding: 0.4rem;
    /* Fix for background color change */
    &:-internal-autofill-selected,
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active{
        transition: background-color 600000s 0s, color 600000s 0s;
    }
`;
export const Button = styled.button`
    background-color: transparent;
    border: unset;
    padding: 0.5rem 2rem;
`;
export const Category = styled(Select)`
    width: 100%;
    //TODO: fix it
    .css-13cymwt-control {
        box-shadow: inset 0 0 1rem rgb(0 0 0 / 30%);
        background-color: ${({ theme }) => theme.colors.darkMain};
        font-family: ${({ theme }) => theme.fonts.body};
        font-size: 2rem;
        border: unset;
    }
    .css-t3ipsp-control {
        box-shadow: inset 0 0 1rem rgb(0 0 0 / 30%);
        background-color: ${({ theme }) => theme.colors.darkMain};
        font-family: ${({ theme }) => theme.fonts.body};
        font-size: 2rem;
        border-color: unset;
    }
    .css-1nmdiq5-menu {
        box-shadow: inset 0 0 1rem rgb(0 0 0 / 30%);
        background-color: ${({ theme }) => theme.colors.darkMain};
        font-family: ${({ theme }) => theme.fonts.body};
        color: white;
    }
    .css-1dimb5e-singleValue {
        color: white;
        font-size: 2rem;
    }
`;
