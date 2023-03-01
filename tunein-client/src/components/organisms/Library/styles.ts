import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
    height: auto;
`;
export const Content = styled.div`
    @media (min-width: 0px) {  min-width: 100%; }
    @media (min-width: 1300px) { min-width: 1300px; }
`;
export const ToolBox = styled.div`
    @media (min-width: 0px) { padding-top: 0.1rem; }
    @media (min-width: 600px) { padding-top: 0.5rem; }
    background: transparent;
    display: flex;
    flex-direction: column;
`; 
export const UpRow = styled.div` flex: 1; `;
export const DownRow = styled.div`
    flex: 1;
    display: flex;
    flex-flow: row wrap;
`;
export const DownRowSide = styled.div`
    flex: 1;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    font-size: 0.7rem;
`;
export const List = styled.div`
    background-color: ${({theme})=>theme.colors.darkMain};
`;
