import styled from "styled-components";

export const AnnouncementsPage = styled.div`
    height: 100%;
    width: auto;
    margin: 0 8%;
    padding: 2rem;
    background-color: ${({theme})=>theme.colors.darkMain};
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: space-between;
    gap: 10px;
`;