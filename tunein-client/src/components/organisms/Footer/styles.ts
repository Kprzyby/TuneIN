import { Inner } from "@components/styles/inners";
import { Typography } from "@components/styles/typography";
import styled from "styled-components";

export const Wrapper = styled.div`
    height: 10rem;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.darkMainL}
`;
export const Center = styled(Inner)`
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
export const copyRight = styled(Typography)`
    padding-top: 1rem;
`;
export const Icons = styled.div`
    display: flex;
    gap: 0.7rem;
`;
