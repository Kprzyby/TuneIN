import styled, { keyframes } from "styled-components";
import { SongInfoBlockProps } from "./types";

export const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: auto;
  margin: 0 8%;
  background-color: ${({ theme }) => theme.colors.darkMain};
  /* background: linear-gradient(0deg, ${({ theme }) =>
    theme.colors.darkMain} 50%, black 100%); */
`;

export const SongInfoBlock = styled.div<SongInfoBlockProps>`
  position: relative;
  width: 100%;
  height: 40vh;
  z-index: 1;

  &:before {
    content: "";
    background: ${({ img }) =>
      img ? `url(${img}) no-repeat center/cover` : "#ccc"};
    mask-image: linear-gradient(rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%);
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 0.6;
    z-index: -1;
  }
`;

const fadein = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 100%;
  animation: fadein 1s;
  animation-name: ${fadein};
`;

export const SongImage = styled.div<SongInfoBlockProps>`
  aspect-ratio: 1/1;
  height: 10rem;
  background: ${({ img }) =>
    img ? `url(${img}) no-repeat center/cover` : "#ccc"};

  box-shadow: 0px 0px 15px 8px black;
  border-radius: 15%;
  margin: auto 0 auto 5rem;
`;

export const SongDescription = styled.div`
  margin: auto 0 auto 2rem;
  color: ${({ theme }) => theme.colors.white};
  font-family: Helvetica;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
`;

export const Text = styled.p`
  font-size: 1.2rem;
`;
