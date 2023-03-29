import styled from 'styled-components';

export const CameraRoom = styled.div`
    display: flex;
    justify-content: center;
    background: rgb(39, 39, 61);
    padding-bottom: 5em;
    margin: 0 10%;
    flex-direction: column;
`;

export const RemoteCameras = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1em;
    margin: 2em 1em;
`;

export const TestItem = styled.div`
    background: black;
    width: 100%;
    aspect-ratio: 16 / 9;
`;
