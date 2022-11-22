import styled from "styled-components";

export const Button = styled.button`
    align-items: center;
    background-image: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
    border: 0;
    border-radius: 0.938rem;
    box-shadow: rgba(151, 65, 252, 0.2) 0 0.938rem 1.875rem -0.313rem;
    box-sizing: border-box;
    display: flex;
    font-size: 1.25rem;
    justify-content: center;
    max-width: 100%;
    min-width: 10rem;
    padding: 0.188rem;
    text-decoration: none;
    user-select: none;
    white-space: nowrap;
    cursor: pointer;
`;
export const Text = styled.span`
    background-color: ${({ theme }) => theme.colors.darkMain};
    padding: 1rem 1.5rem;
    border-radius: 0.375rem;
    color: lightgray;
    width: 100%;
    height: 100%;
    transition: 300ms;
    ${Button}:hover & {
        background-color: ${({ theme }) => theme.colors.darkMainD};
        color: white;
    }
`;