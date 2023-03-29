import styled from "styled-components";
import { AnnouncementProperties } from "./types";

export const Announcement = styled.div<AnnouncementProperties>`
  position: relative;
  aspect-ratio: 1 / 1;
  height: 12rem;
  background: ${({ img }) => img ? `url(${img}) no-repeat center/cover` : '#ccc'};
  border-radius: 0.5rem;
  overflow: hidden;
  border-radius: 1rem;
  font-family: Helvetica;
`;

export const SeeTrough = styled.div`
  position: absolute;
  bottom: 0;
  background-color: black;
  opacity: 0.7;
  width: 100%;
  height: 40%;
  opacity: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 0 0 1rem 1rem;

  p {
    color: white;
    padding: 0.6rem;
    text-align: center;
  }
`;

export const Title = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`;

export const Interested = styled.p`
  font-size: 0.8rem;
`;
