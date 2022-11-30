import { Inner } from "@components/styles/inners";
import { Typography } from "@components/styles/typography";
import Image from "next/image";
import React from "react";
import * as Styled from "./styles";

const Profile: React.FC = () => (
    <Styled.Wrapper>
        <Styled.LibraryName variant="profileName">Library</Styled.LibraryName>
        <Styled.SectionsWrap>
        </Styled.SectionsWrap>
        <Styled.AboutCat>
            <Typography variant="profileTitleS">Wszystkie kategorie</Typography>
        </Styled.AboutCat>
        <Styled.AboutSearch>
            <Typography variant="profileTitleS">Enter artist name or a song title</Typography>
        </Styled.AboutSearch>
        <Styled.SongSection>
            <Styled.ImageSection>
                <Image
                    src="/assets/images/nuta.jpg"
                    alt="profile"
                    height="1"
                    width="1"
                    layout="responsive"
                />
            </Styled.ImageSection>
            <Styled.ArtistName variant="profileName">Artist name: song title</Styled.ArtistName>
        </Styled.SongSection>
        <Styled.SongSection2>
            <Styled.ImageSection>
                <Image
                    src="/assets/images/nuta.jpg"
                    alt="profile"
                    height="1"
                    width="1"
                    layout="responsive"
                />
            </Styled.ImageSection>
            <Styled.ArtistName variant="profileName">Artist name: song title</Styled.ArtistName>
        </Styled.SongSection2>
        <Styled.AddSection>
            <Styled.ImageSection2>
                <Image
                    src="/assets/images/plus.jpg"
                    alt="profile"
                    height="1"
                    width="1"
                    layout="responsive"
                />
            </Styled.ImageSection2>
            <Styled.ArtistName2 variant="profileName">ADD NEW TITLE</Styled.ArtistName2>
        </Styled.AddSection>


            
    </Styled.Wrapper>
)

export default Profile;