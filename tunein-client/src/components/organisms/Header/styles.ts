import styled from "styled-components";

export const Wrapper = styled.div`
    position: fixed;
    top: 0;
    height: auto;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.darkMain};
    display: flex;
    align-items: center;
    z-index: 2;
    padding-top: 1rem;
    padding-bottom: 0.5rem;
`; 
export const ItemsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const ListItem = styled.li`
    color: ${({ theme }) => theme.colors.darkMainL};
    display: table;
    float: left;
    padding: 0 0.6rem;
`;
