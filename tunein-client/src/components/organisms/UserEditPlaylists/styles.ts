import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    max-height: 80vh;
    display: flex;
    flex-flow: column nowrap;
`;
export const Header = styled.div`
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding: 1rem 0 0 50%;
`;
export const ClearBtn = styled.button`
    width: 100%;
    border: unset;
    background: transparent;
    display: flex;
    cursor: pointer;
`;
