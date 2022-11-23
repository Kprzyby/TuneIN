import { Typography } from "@components/styles/typography";
import styled from "styled-components";
export const Wrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.darkMainL};
    width: 120vw;
    height: 32rem;
`;
export const LibraryName = styled(Typography)`
    position: absolute;
    left: 1.5rem;
    top: 5rem;
    color: black;
    background-position: -

`;
export const ArtistName = styled(Typography)`
    position: absolute;
    left: 16rem;
    top: 3rem;

`;
export const SectionsWrap = styled.div`
    position: absolute;
    top: 35%;
    height: 65%;
    width: 120%;
    background-color: ${({ theme }) => theme.colors.darkMain};
`;
export const CategorySection = styled.div`
    margin: 0.35rem 0.3rem;
    padding: 1rem;
    background-color: ${({ theme }) => theme.colors.darkMainD};
`;
export const AboutCat = styled(CategorySection)`
    position: absolute;
    height: 6rem;
    width: 19%;
    top: 12rem;
    left: 5.5rem;
`;
export const SearchSection = styled.div`
    margin: 0.35rem 0.3rem;
    padding: 1rem;
    background-color: green;
`;
export const AboutSearch = styled(SearchSection)`
    position: absolute;
    height: 6rem;
    width: 46%;
    top: 12rem;
    left: 22%;
`;
export const SongSection = styled.div`
    position: absolute;
    height: 18rem;
    width: 98%;
    top: 22rem;
    left: 1.5rem;
    background-color: ${({ theme }) => theme.colors.darkMainD};
    border-radius: 25px;
`;
export const ImageSection = styled.div`
    height: 18rem !important;
    width: 8.35%;
    background-position: -349px 0px;

`;
export const SongSection2 = styled.div`
    position: absolute;
    height: 18rem;
    width: 98%;
    top: 44rem;
    left: 1.5rem;
    background-color: ${({ theme }) => theme.colors.darkMainD};
    border-radius: 25px;
`;

export const AddSection = styled.div`
    position: absolute;
    height: 18rem;
    width: 98%;
    top: 66rem;
    left: 1.5rem;
    background-color: ${({ theme }) => theme.colors.darkMainD};
    border-radius: 25px;
`;
export const ImageSection2= styled.div`
    height: 18rem !important;
    width: 10.1%;

`;
export const ArtistName2 = styled(Typography)`
    position: absolute;
    left: 19rem;
    top: 3rem;

`;