import styled from "styled-components";
import { Typography } from "@components/styles/typography";

export const Wrapper = styled.div`
    position: relative;
    display: block;
    height: 100vh;
    scroll-margin-top: 0;
`;
export const Content = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
export const Title = styled(Typography)`
    font-size: 10rem;
    color: ${({theme})=> theme.colors.darkMain};
`;
export const Description = styled(Typography)`
    font-size: 3rem;
    margin: 2rem;
`;
