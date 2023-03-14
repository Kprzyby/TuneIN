import styled from "styled-components";

export const LocalCamera = styled.video`
    display: block;
    aspect-ratio: 16 / 9;
    width: inherit;
    height: inherit;
`;

export const CameraWrapper = styled.div`
    display: block;
    background: black;
    width: 500px;
    height: auto;
    margin: auto;
`;

export const CameraWithButtons = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    margin: auto;
`;