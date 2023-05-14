import styled from 'styled-components';

export const InnerWrapper = styled.div`
    display: flex;
    justify-content: center;
`;
export const Inner = styled.div`
    display: flex;
    background-color: ${({ theme }) => theme.colors.darkMainL};
    opacity: 0.97;
    max-height: 1100px;
    @media (min-width: 0px) {  min-width: 100%; }
    @media (min-width: 1500px) { min-width: 1500px; }
    @media (min-width: 1800px) { min-width: 1800px; }
`;
export const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
`;
export const EnterWrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
`;
export const CreateWrapper = styled.div`
position: absolute;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    bottom: 8vh;
`;
export const Button = styled.button`
    background: transparent;
    border: unset;
    padding: 0.5rem;
    cursor: pointer;
`;
