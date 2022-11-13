import { Inner } from "@components/styles/inners";
import { Typography } from "@components/styles/typography";
import Image from "next/image";
import React from "react";
import * as Styled from "./styles";

const Profile: React.FC = () => (
    <Styled.Wrapper>
        <Styled.UserName variant="profileName">Name Surname</Styled.UserName>
        <Inner variant="wide">
            <Styled.Profile>
                <Image
                    src="/assets/images/profile.png"
                    alt="profile"
                    height="1"
                    width="1"
                    layout="responsive"
                />
                <Styled.About>
                    <Typography variant="profileTitleS">About: </Typography>
                </Styled.About>
                <Styled.ProfileSection>
                    <Typography variant="profileTitleS">Followers: </Typography>
                </Styled.ProfileSection>
                <Styled.ProfileSection>
                    <Typography variant="profileTitleS">Last live: </Typography>
                </Styled.ProfileSection>
                <Styled.ProfileSection>
                    <Typography variant="profileTitleS">Monthly views: </Typography>
                </Styled.ProfileSection>
            </Styled.Profile>
            <Styled.SectionsWrap>
                <Styled.Sections>
                    <Styled.Section>
                        <Typography variant="profileTitleB">Live</Typography>
                        <Styled.LiveSection>
                            <Styled.StaticStatus variant="profileTitleB">Offline</Styled.StaticStatus>
                        </Styled.LiveSection>
                    </Styled.Section>
                    <Styled.Section>
                        <Typography variant="profileTitleB">Lessons</Typography>
                        <Styled.LessonsSection></Styled.LessonsSection>
                    </Styled.Section>
                </Styled.Sections>
            </Styled.SectionsWrap>
        </Inner>
    </Styled.Wrapper>
)

export default Profile;