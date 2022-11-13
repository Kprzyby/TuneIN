import { Typography } from "@components/styles/typography";
import styled from "styled-components";
export const Wrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.darkMainL};
    width: 100vw;
    height: 100%;
`;
// TODO: change it to be more resizeable
export const UserName = styled(Typography)`
    float: right;
    position: fixed;
    left: 31rem;
    top: 10rem;
`;
// left side
// TODO: change it to be more resizeable
export const Profile = styled.div`
    position: fixed;
    padding: 2rem 1rem 0 1rem;
    width: 20rem;
    bottom: 0;
    z-index: 1;
`;
export const ProfileSection = styled.div`
    margin: 0.35rem 0.3rem;
    padding: 1rem;
    background-color: ${({ theme }) => theme.colors.darkMainD};
`;
export const About = styled(ProfileSection)`
    height: 10rem;
`;
// right side
// TODO: this is dog shit for now but I will figure it out later on
export const SectionsWrap = styled.div`
    position: relative;
    top: 20vh;
    height: 150vh;
    width: 200vw;
    background-color: ${({ theme }) => theme.colors.darkMain};
    left: -10rem;
`;
// TODO: change it to be more resizeable
export const Sections = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 2rem 5rem;
    padding-top: 2rem;
    height: 100%;
    width: 50rem;
    left: 30vw;
    background-color: ${({ theme }) => theme.colors.darkMain};
`;
export const Section = styled.div`
    flex: 2;
`;
// TODO: insert live video
export const LiveSection = styled.div`
    position: absolute;
    flex: 1;
    margin-top: 2rem;
    width: 100%;
    height: 25rem;
    background-color: ${({ theme }) => theme.colors.darkMainD};
`;
export const StaticStatus = styled(Typography)`
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 1rem;
`;
export const LessonsSection = styled.div`
    position: absolute;
    flex: 1;
    margin-top: 2rem;
    width: 100%;
    height: 25rem;
    background-color: ${({ theme }) => theme.colors.darkMainD};
`;
