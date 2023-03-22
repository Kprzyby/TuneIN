import styled from "styled-components";
import { Props } from "./types";

export const Button = styled.button<Pick<Props, 'borderSize'>>`
    align-items: center;
    background-image: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
    border: 0;
    border-radius: 0.938rem;
    box-shadow: rgba(151, 65, 252, 0.2) 0 0.938rem 1.875rem -0.313rem;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    padding: ${props => props.borderSize}rem;
    text-decoration: none;
    user-select: none;
    white-space: nowrap;
    cursor: pointer;
`;
export const Text = styled.span<Pick<Props, 'boxSize' | 'textSize'>>`
    background-color: ${({ theme }) => theme.colors.darkMain};
    padding: ${props => props.boxSize}rem ${props => props.boxSize * 1.3}rem;
    font-size: ${props => props.textSize}rem;
    border-radius: 0.765rem;
    color: lightgray;
    width: 100%;
    height: 100%;
    transition: 300ms;
    ${Button}:hover & {
        background-color: ${({ theme }) => theme.colors.darkMainD};
        color: white;
    }
`;